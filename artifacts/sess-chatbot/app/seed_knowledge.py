"""Seed the ChromaDB knowledge base with mock SESS data."""

from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path

import chromadb
from chromadb.config import Settings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from app.knowledge import KNOWLEDGE

CHROMA_DIR = Path(__file__).resolve().parent.parent / "chroma_db"
COLLECTION_NAME = "sess_knowledge"


def seed(reset: bool = True) -> None:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("ERROR: GEMINI_API_KEY environment variable is required.", file=sys.stderr)
        sys.exit(1)

    if reset and CHROMA_DIR.exists():
        print(f"Clearing existing knowledge base at {CHROMA_DIR}")
        shutil.rmtree(CHROMA_DIR)
    CHROMA_DIR.mkdir(parents=True, exist_ok=True)

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=api_key,
    )

    client = chromadb.PersistentClient(
        path=str(CHROMA_DIR),
        settings=Settings(anonymized_telemetry=False),
    )

    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass

    collection = client.create_collection(name=COLLECTION_NAME)

    texts = [text for (_, _, text, _) in KNOWLEDGE]
    print(f"Embedding {len(texts)} knowledge chunks with Gemini text-embedding-004...")
    vectors = embeddings.embed_documents(texts)

    collection.add(
        ids=[doc_id for (_, doc_id, _, _) in KNOWLEDGE],
        documents=texts,
        embeddings=vectors,
        metadatas=[meta for (_, _, _, meta) in KNOWLEDGE],
    )

    print(f"Seeded {len(KNOWLEDGE)} documents into '{COLLECTION_NAME}' at {CHROMA_DIR}.")


if __name__ == "__main__":
    seed()
