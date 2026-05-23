# PRD: Savings Calculator & Pre-Sales Advisor Chatbot

---

## Project Title
**SESS Advisor** — Chatbot Kalkulator Penghematan & Konsultan Pra-Penjualan

---

## Target Audience

### Segmen Utama
| Segmen | Deskripsi |
|--------|-----------|
| **Pemilik Rumah Tangga** | Individu atau kepala keluarga yang membayar tagihan listrik sendiri dan ingin mengurangi pengeluaran energi bulanan. |
| **Pengguna Daya Menengah–Tinggi** | Rumah tangga dengan tagihan listrik PLN di atas Rp 500.000/bulan yang berpotensi mendapat penghematan signifikan dari SESS. |
| **Calon Pembeli yang Belum Yakin** | Pengunjung landing page yang tertarik dengan SESS tetapi belum memahami apakah produk ini sepadan dengan investasinya untuk situasi mereka. |
| **Pemilik Panel Surya** | Pengguna yang sudah memiliki panel surya sebagian atau penuh dan ingin mengetahui bagaimana SESS melengkapi sistem yang sudah ada. |

### Karakteristik Pengguna
- Usia 25–55 tahun, tinggal di Indonesia.
- Familiar dengan aplikasi chat (WhatsApp, dll.) — tidak perlu keahlian teknis.
- Membuat keputusan pembelian berdasarkan nilai nyata dan ROI yang jelas.
- Lebih nyaman berkomunikasi dalam Bahasa Indonesia.

---

## Bagaimana Chatbot Membantu Pengguna

### Masalah yang Dihadapi Pengguna
Calon pembeli yang mengunjungi landing page SESS menghadapi tiga hambatan utama:
1. **Ketidakpastian nilai** — "Apakah SESS benar-benar menghemat tagihan saya?"
2. **Kurangnya personalisasi** — Halaman web menampilkan angka umum, bukan estimasi untuk situasi mereka.
3. **Hambatan untuk bertanya** — Mengisi formulir kontak atau menelepon terasa berat hanya untuk mendapat gambaran awal.

### Solusi yang Diberikan Chatbot

| Kebutuhan Pengguna | Cara Chatbot Membantu |
|--------------------|----------------------|
| **Ingin tahu potensi penghematan nyata** | Chatbot menghitung estimasi penghematan bulanan (dalam Rupiah) berdasarkan tagihan listrik, ukuran rumah, jumlah kamar, dan status panel surya pengguna. |
| **Ingin rekomendasi yang relevan** | Chatbot merekomendasikan produk SESS yang paling sesuai dengan profil rumah tangga pengguna, disertai penjelasan alasannya. |
| **Ingin proses yang cepat dan mudah** | Chatbot hanya membutuhkan 4–5 jawaban singkat, lalu langsung memberikan hasil — tanpa formulir panjang atau tunggu balasan email. |
| **Ingin bicara dengan tim ahli** | Chatbot mengakhiri percakapan dengan tombol WhatsApp yang langsung terhubung ke tim SESS, dengan ringkasan rekomendasi sudah terisi otomatis. |
| **Punya pertanyaan tambahan** | Setelah kalkulasi, pengguna dapat mengajukan pertanyaan lanjutan secara bebas — chatbot menjawab berdasarkan basis pengetahuan SESS. |

### Alur Nilai (Value Flow)
```
Pengunjung tidak yakin
    ↓
Chatbot tanya 4 hal sederhana (< 2 menit)
    ↓
Estimasi penghematan personal + rekomendasi produk
    ↓
Pengguna paham nilai SESS untuk situasinya
    ↓
Klik WhatsApp → Tim SESS terima lead yang sudah hangat
```

---

## 1. Overview

### Product Summary
A conversational AI chatbot embedded on the SESS (Smart Energy & Saving System) landing page. It guides prospective customers through a short intake flow in **Bahasa Indonesia**, calculates their estimated monthly savings with SESS, recommends relevant products, and hands the lead off to the sales team via WhatsApp — with the chatbot's recommendation as the pre-filled message.

### Problem Statement
Visitors on the SESS landing page do not know whether the product is worth the investment for their specific situation. This friction causes drop-off before any sales contact occurs. The chatbot personalises the value proposition instantly, qualifying and warming up leads before human follow-up.

### Goals
- Reduce top-of-funnel drop-off by showing visitors a personalised savings estimate immediately.
- Collect structured lead data (electricity spend, home profile, solar status) before WhatsApp handoff.
- Provide product recommendations grounded in SESS domain knowledge.
- Maintain a conversational, expert-but-approachable tone in Bahasa Indonesia.

---

## 2. Scope

### In Scope
- Multi-turn conversational intake (electricity bill, home size, number of rooms, solar panel status).
- RAG-powered savings calculation and explanation using a curated knowledge base (mock data in v1).
- Product recommendation after calculation.
- WhatsApp handoff CTA — pre-filled with the chatbot's recommendation summary.
- System prompt defining Bahasa Indonesia language style, persona, and domain expertise.
- Session-scoped conversation memory (within a single chat session).
- Chat widget embedded on the landing page, styled to match the Futuristic Dark Tech design language.

### Out of Scope (v1)
- Persistent cross-session memory (remembering a returning user's prior answers).
- Real-time external electricity tariff API (rates stored statically in knowledge base).
- User authentication or account creation.
- Multi-language support (Bahasa Indonesia only in v1).
- Backend CRM or lead database integration.
- Loading real product/tariff documents (mock data used in v1; real data in v2).

---

## 3. User Stories

| # | As a… | I want to… | So that… |
|---|--------|------------|----------|
| 1 | Visitor | be asked simple questions about my home and energy usage in Bahasa Indonesia | I don't have to research anything myself |
| 2 | Visitor | see a personalised monthly savings estimate | I can decide whether SESS is worth it for me |
| 3 | Visitor | receive a product recommendation | I know which SESS product fits my situation |
| 4 | Visitor | be connected to the sales team via WhatsApp | I can get expert advice without friction |
| 5 | Sales team | receive a pre-qualified lead with the chatbot's recommendation already in the message | I can start the conversation with useful context |

---

## 4. Functional Requirements

### 4.1 Conversation Flow

```
Step 1 — Greeting & context setting (Bahasa Indonesia)
  ↓
Step 2 — Monthly electricity bill (IDR)
  ↓
Step 3 — Home size (m² or number of floors)
  ↓
Step 4 — Number of rooms
  ↓
Step 5 — Solar panel status (sudah punya / belum / sebagian)
  ↓
Step 6 — Savings calculation + explanation (RAG-powered, Bahasa Indonesia)
  ↓
Step 7 — Product recommendation (RAG-powered, Bahasa Indonesia)
  ↓
Step 8 — WhatsApp handoff CTA (pre-filled with recommendation summary)
  ↓
Step 9 — Open Q&A (user can ask follow-up questions)
```

The chatbot must gracefully handle out-of-order questions, clarification requests, and partial answers at any step.

### 4.2 Savings Calculation Logic

The chatbot derives an estimated monthly saving by combining:
- User-provided inputs (bill amount, home size, rooms, solar status).
- SESS-specific performance benchmarks retrieved from the knowledge base (average reduction percentages by home profile, device efficiency ratings).
- Indonesian electricity tariff data (PLN tariff tiers) stored in the knowledge base.

The LLM interprets and synthesises retrieved knowledge to produce a personalised estimate explained in plain Bahasa Indonesia.

**v1 Mock Data**: Savings benchmarks, product specs, and PLN tariff schedules will be seeded as mock data. Real documents to be loaded in v2.

### 4.3 Product Recommendation

After calculating savings, the chatbot:
- Retrieves relevant SESS products from the knowledge base.
- Recommends one or two products best suited to the user's profile.
- Briefly explains why each product fits their situation (in Bahasa Indonesia).
- Does not recommend products outside the SESS catalogue.

### 4.4 WhatsApp Handoff

At the end of the flow the chatbot:
- Presents a WhatsApp CTA button with the SESS sales number.
- Pre-fills the WhatsApp message with the chatbot's recommendation summary, e.g.:

```
Halo Tim SESS, saya tertarik dengan produk [Nama Produk].
Berdasarkan tagihan listrik saya sebesar Rp X/bulan, rumah [Y kamar, Z m²],
estimasi penghematan saya sekitar Rp A/bulan.
Boleh saya konsultasi lebih lanjut?
```

- The WhatsApp number is configurable via environment variable.

### 4.5 Conversation Memory (Session-Scoped)

- All messages within a session are retained in memory for the duration of that session.
- Memory is cleared when the user closes or refreshes the page (no persistence).
- LangChain `ConversationBufferMemory` is used.
- Memory feeds into the LLM prompt so previous answers are always available for calculation.

### 4.6 System Prompt & Persona

The chatbot operates under a system prompt that defines:
- **Persona**: Konsultan energi yang ramah dan berpengetahuan untuk SESS. Percaya diri tetapi tidak memaksa.
- **Tone**: Profesional namun santai. Menggunakan bahasa sederhana, menghindari jargon teknis.
- **Language**: Bahasa Indonesia exclusively.
- **Constraints**: Only discusses SESS products and energy saving. Politely redirects off-topic questions.
- **Boundaries**: Never fabricates savings figures not supported by the knowledge base. States uncertainty honestly.
- **Hallucination guard**: Must not answer savings-related questions without retrieved context.

---

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Response latency | < 4 seconds per chatbot turn |
| Availability | Matches landing page uptime |
| Knowledge base accuracy | All mock data reviewed before indexing; real data in v2 |
| Security | No sensitive user data stored server-side in v1; session data is transient |

---

## 6. Technical Architecture

### 6.1 Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| LLM | Google Gemini (`gemini-1.5-flash` or `gemini-2.0-flash`) | Via `google-generativeai` Python SDK |
| Orchestration | LangChain (Python) | Chains, memory, retrieval |
| Embeddings | `models/text-embedding-004` (Gemini) | Same API key as LLM |
| Vector Store | **ChromaDB** | Uses **SQLite** as default backend storage — no separate DB needed |
| Backend API | **FastAPI** (Python) | New Python artifact/service |
| Frontend widget | React + Tailwind (embedded in Smart Energy artifact) | Styled to match landing page |
| Memory | `ConversationBufferMemory` (LangChain) | Session-scoped, in-memory |

> **SQLite via ChromaDB**: ChromaDB stores its embeddings and metadata in SQLite by default. This means no external vector database is required — ChromaDB manages the SQLite files automatically. The knowledge base is persisted to a local directory (e.g., `./chroma_db`).

### 6.2 RAG Pipeline

```
User message
    ↓
Embed query (Gemini text-embedding-004)
    ↓
ChromaDB similarity search → Retrieve top-K knowledge chunks
    ↓
Assemble prompt:
  [System Prompt (BI persona)]
  + [Retrieved Context chunks]
  + [Conversation History (session memory)]
  + [User Message]
    ↓
Gemini LLM → Bahasa Indonesia response
    ↓
Append to session memory → Return to frontend widget
```

### 6.3 Knowledge Base Contents (v1 Mock Data)

| Collection | Mock Data Description |
|------------|----------------------|
| `sess_products` | 3–5 mock SESS product entries (name, specs, target use case, price range) |
| `savings_benchmarks` | Savings % by home size bracket and electricity bill tier |
| `solar_adjustments` | How partial/full solar ownership modifies the savings estimate |
| `pln_tariffs` | PLN household tariff tiers (Golongan R-1, R-2, R-3) — static mock |
| `faqs` | 10–15 common pre-sales Q&As in Bahasa Indonesia |
| `calculation_methodology` | Step-by-step explanation of how SESS calculates savings |

### 6.4 External API Calls

| API | Purpose | Required? |
|-----|---------|-----------|
| Gemini API (Google AI) | LLM inference + embeddings | **Yes — required** |
| PLN tariff API | Real-time tariff lookup | **No (v1) — static mock in knowledge base** |
| WhatsApp | Lead handoff | **No — standard `wa.me` deep link with pre-filled message** |

### 6.5 Service Architecture

```
Browser (React widget on Smart Energy artifact)
    ↓ POST /api/chat  { session_id, message }
        ↓
    FastAPI Python service (new artifact)
        → LangChain chain
            → ChromaDB (SQLite) retrieval
            → Gemini API
        ← { reply, session_id }
    ↑
Browser displays reply in chat widget
```

The Python service will be registered as a new workspace artifact with its own workflow, routed under `/api/chat` via the shared reverse proxy.

---

## 7. Chat Widget Design

### Design Language
The widget inherits the landing page's **Futuristic Dark Tech** aesthetic:
- Background: `hsl(240 10% 4%)` — deep near-black
- Primary accent: Electric Cyan `hsl(190 100% 50%)` / `#00F0FF`
- Secondary accent: Electric Green `hsl(144 100% 50%)` / `#00FF7F`
- Glassmorphism panels: `backdrop-blur-md`, `bg-white/5` borders
- Glow effects on active elements
- Typography: `Space Grotesk` headings, `Inter` body
- Icons: Lucide React

### Widget Layout

```
┌─────────────────────────────────────────────┐  ← Fixed bottom-right FAB
│  💬  (Zap icon, glowing cyan)               │     (collapsed state)
└─────────────────────────────────────────────┘

When opened (expanded state):
┌──────────────────────────────────────────────────────┐
│  ⚡ SESS Advisor          [minimize] [close]          │  ← Header, cyan glow
│  ─────────────────────────────────────────────────── │
│                                                        │  ← Message area
│   [Bot bubble] Halo! Saya SESS Advisor. Saya         │     Bot: dark glass card
│   akan bantu hitung estimasi penghematan             │     with cyan left border
│   listrik Anda. Berapa tagihan listrik               │
│   bulanan Anda? (dalam Rupiah)                       │
│                                                        │
│                    [User bubble] Rp 800.000          │  ← User: cyan-tinted right
│                                                        │
│   [Bot bubble] Baik! Rumah Anda berapa kamar?        │
│                                                        │
│  ────────────────────────────────────────────────── │
│  [ Ketik pesan Anda...                    ] [Send ▶] │  ← Input bar
│                                         cyan glow    │
└──────────────────────────────────────────────────────┘
```

### Visual Specifications

| Element | Style |
|---------|-------|
| Widget container | `w-96`, `rounded-2xl`, `backdrop-blur-2xl`, `bg-[hsl(240_10%_6%)]`, `border border-white/10`, `shadow-[0_0_40px_rgba(0,240,255,0.15)]` |
| Header | `bg-gradient-to-r from-cyan-500/20 to-green-500/10`, SESS logo + "SESS Advisor" label |
| Bot message bubble | `bg-white/5`, `border-l-2 border-cyan-400`, rounded, subtle glow |
| User message bubble | `bg-cyan-500/10`, `border border-cyan-500/30`, right-aligned |
| Input field | `bg-white/5`, `border border-white/10`, focus ring in cyan |
| Send button | Cyan background with glow: `shadow-[0_0_15px_rgba(0,240,255,0.4)]` |
| FAB (floating button) | `Zap` icon, pulsing cyan ring animation, bottom-right fixed |
| Savings result card | Special card with green glow, bold savings figure, product chips |
| WhatsApp CTA button | Green (#25D366) with WhatsApp icon, appears after recommendation |

### Animation & Interaction
- FAB has a subtle pulse animation (matching landing page's glow style).
- Widget opens with a scale + fade-in (Framer Motion, matching page transitions).
- Bot messages appear with a typing indicator (three pulsing dots) before each reply.
- Savings result card animates in with a scale-up reveal.

---

## 8. Data Flow

```
Browser (React widget)
    → POST /api/chat  { session_id, message }
        → FastAPI (Python)
            → Load session memory (in-memory dict keyed by session_id)
            → Embed query → ChromaDB (SQLite) search
            → Build prompt: system + context + history + message
            → Gemini API call
            → Append to session memory
        ← { reply, metadata: { step, savings_estimate?, product? } }
    ← Display reply + render special cards if metadata present
```

---

## 9. Knowledge Base Governance

- v1: Mock data seeded via a Python seed script (`seed_knowledge.py`).
- v2: Replace mock data with real SESS documents (product specs, savings methodology, PLN tariff docs).
- Re-seeding clears and rebuilds the ChromaDB collections.
- The chatbot must not fabricate savings figures (hallucination guard enforced in system prompt).

---

## 10. Open Questions — Resolved

| # | Question | Decision |
|---|----------|----------|
| 1 | Vector store | **ChromaDB with SQLite backend** |
| 2 | Primary language | **Bahasa Indonesia** |
| 3 | WhatsApp pre-fill | **Chatbot's recommendation summary** |
| 4 | Chat widget style | **Futuristic Dark Tech matching landing page** (see Section 7) |
| 5 | Knowledge base data | **Mock data in v1; real data in v2** |

### Remaining Open Items
| # | Item | Status |
|---|------|--------|
| 1 | WhatsApp sales number | **Confirmed: `6282116140638`** |
| 2 | Gemini API key | **Do not share in chat.** To be entered securely via Replit environment secrets during implementation — stored as `GEMINI_API_KEY`. |

---

## 11. Success Metrics (v1)

| Metric | Definition |
|--------|-----------|
| Completion rate | % of visitors who reach the WhatsApp CTA |
| WhatsApp click-through rate | % of users who tap the WhatsApp handoff button |
| Average turns to calculation | How many messages before savings are shown |
| Lead quality (qualitative) | Sales team feedback on lead context quality |

---

## 12. Out of Scope for v1 (Future Roadmap)

- Real SESS product/tariff documents in knowledge base (v2).
- Persistent cross-session memory and returning user recognition.
- CRM integration (HubSpot, Salesforce, etc.).
- Live PLN tariff API.
- Multi-language support.
- Admin dashboard to update knowledge base without re-seeding.

---

## 13. Relevant Files (Existing Codebase)

- `artifacts/smart-energy/src/index.css` — Design tokens and CSS variables (colors, fonts, glow effects)
- `artifacts/smart-energy/src/pages/home.tsx` — Landing page layout (widget will be embedded here)
- `artifacts/smart-energy/src/App.tsx` — App wrapper
- `artifacts/api-server/` — Existing API server (Python chatbot will be a **separate** new artifact)
