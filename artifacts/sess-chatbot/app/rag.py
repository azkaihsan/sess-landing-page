"""RAG retriever and Gemini chat chain for SESS Advisor."""

from __future__ import annotations

import os
import threading
from pathlib import Path
from typing import Optional

import chromadb
from chromadb.config import Settings
from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
)
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage

from app.system_prompt import SYSTEM_PROMPT

CHROMA_DIR = Path(__file__).resolve().parent.parent / "chroma_db"
COLLECTION_NAME = "sess_knowledge"

_lock = threading.Lock()
_embeddings: Optional[GoogleGenerativeAIEmbeddings] = None
_llm: Optional[ChatGoogleGenerativeAI] = None
_collection = None


def _api_key() -> str:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set.")
    return key


def get_embeddings() -> GoogleGenerativeAIEmbeddings:
    global _embeddings
    if _embeddings is None:
        with _lock:
            if _embeddings is None:
                _embeddings = GoogleGenerativeAIEmbeddings(
                    model="models/gemini-embedding-001",
                    google_api_key=_api_key(),
                )
    return _embeddings


def get_llm() -> ChatGoogleGenerativeAI:
    global _llm
    if _llm is None:
        with _lock:
            if _llm is None:
                _llm = ChatGoogleGenerativeAI(
                    model="gemini-2.5-flash",
                    google_api_key=_api_key(),
                    temperature=0.4,
                )
    return _llm


def get_collection():
    global _collection
    if _collection is None:
        with _lock:
            if _collection is None:
                client = chromadb.PersistentClient(
                    path=str(CHROMA_DIR),
                    settings=Settings(anonymized_telemetry=False),
                )
                _collection = client.get_collection(name=COLLECTION_NAME)
    return _collection


def retrieve(query: str, k: int = 10) -> list[str]:
    embedded = get_embeddings().embed_query(query)
    res = get_collection().query(query_embeddings=[embedded], n_results=k)
    docs = res.get("documents", [[]])[0]
    return [d for d in docs if d]


def build_retrieval_query(user_message: str, history: list[dict]) -> str:
    """Combine recent user turns so retrieval reflects the full household profile,
    not just the latest short reply (e.g. 'belum punya panel surya')."""
    recent_user = [t["content"] for t in history if t.get("role") == "user"][-4:]
    parts = recent_user + [user_message]
    return " | ".join(parts)


def build_messages(
    user_message: str,
    history: list[dict],
    context_chunks: list[str],
) -> list[BaseMessage]:
    context_block = "\n\n".join(f"- {c}" for c in context_chunks) if context_chunks else "(tidak ada konteks relevan ditemukan)"
    system_with_context = (
        SYSTEM_PROMPT
        + "\n\n[KONTEKS BASIS PENGETAHUAN SESS]\n"
        + context_block
        + "\n[AKHIR KONTEKS]\n"
    )

    msgs: list[BaseMessage] = [SystemMessage(content=system_with_context)]
    for turn in history:
        role = turn.get("role")
        content = turn.get("content", "")
        if role == "user":
            msgs.append(HumanMessage(content=content))
        elif role == "assistant":
            msgs.append(AIMessage(content=content))
    msgs.append(HumanMessage(content=user_message))
    return msgs


def generate_reply(user_message: str, history: list[dict]) -> str:
    retrieval_query = build_retrieval_query(user_message, history)
    chunks = retrieve(retrieval_query)
    msgs = build_messages(user_message, history, chunks)
    response = get_llm().invoke(msgs)
    content = response.content if isinstance(response.content, str) else str(response.content)
    return content.strip()
