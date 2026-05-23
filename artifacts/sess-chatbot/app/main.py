"""FastAPI entrypoint for the SESS Advisor chatbot service."""

from __future__ import annotations

import logging
import os
import sys
import threading
import time
import uuid
from pathlib import Path
from typing import Optional

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.rag import generate_reply
from app.seed_knowledge import CHROMA_DIR, seed

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger("sess-chatbot")

SESSION_TTL_SECONDS = 60 * 60  # 1h
MAX_HISTORY_PER_SESSION = 40
MAX_MESSAGE_CHARS = 1000

_sessions: dict[str, dict] = {}
_sessions_lock = threading.Lock()


def ensure_seeded() -> None:
    chroma_sqlite = CHROMA_DIR / "chroma.sqlite3"
    if chroma_sqlite.exists():
        log.info("ChromaDB knowledge base already seeded at %s", CHROMA_DIR)
        return
    log.info("ChromaDB not found, seeding knowledge base...")
    seed(reset=True)


app = FastAPI(title="SESS Advisor Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: Optional[str] = Field(default=None)
    message: str = Field(min_length=1)


class ChatResponse(BaseModel):
    session_id: str
    reply: str


def _gc_sessions() -> None:
    now = time.time()
    expired = [sid for sid, s in _sessions.items() if now - s["last"] > SESSION_TTL_SECONDS]
    for sid in expired:
        _sessions.pop(sid, None)


def _get_or_create_session(session_id: Optional[str]) -> tuple[str, list[dict]]:
    with _sessions_lock:
        _gc_sessions()
        if session_id and session_id in _sessions:
            session = _sessions[session_id]
            session["last"] = time.time()
            return session_id, session["history"]
        new_id = session_id or uuid.uuid4().hex
        _sessions[new_id] = {"history": [], "last": time.time()}
        return new_id, _sessions[new_id]["history"]


@app.get("/api/chat/healthz")
def healthz() -> dict:
    return {"ok": True, "service": "sess-chatbot"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    message = req.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message is empty")
    if len(message) > MAX_MESSAGE_CHARS:
        raise HTTPException(status_code=400, detail="message too long")

    session_id, history = _get_or_create_session(req.session_id)

    try:
        reply = generate_reply(message, history)
    except Exception as exc:  # noqa: BLE001
        log.exception("Failed to generate reply: %s", exc)
        raise HTTPException(status_code=502, detail="LLM call failed") from exc

    with _sessions_lock:
        history.append({"role": "user", "content": message})
        history.append({"role": "assistant", "content": reply})
        # Trim history to last N turns
        if len(history) > MAX_HISTORY_PER_SESSION:
            del history[: len(history) - MAX_HISTORY_PER_SESSION]

    return ChatResponse(session_id=session_id, reply=reply)


def main() -> None:
    raw_port = os.environ.get("PORT")
    if not raw_port:
        print("PORT environment variable is required", file=sys.stderr)
        sys.exit(1)
    port = int(raw_port)
    ensure_seeded()
    log.info("Starting SESS Advisor on 0.0.0.0:%s", port)
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")


if __name__ == "__main__":
    main()
