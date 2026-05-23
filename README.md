# SESS Landing Page — Smart Energy & Saving System

Landing page untuk produk **Smart Energy & Saving System**, sebuah solusi manajemen energi rumah pintar yang membantu pemilik rumah memantau dan mengontrol penggunaan listrik secara real-time melalui aplikasi smartphone.

Repositori ini juga memuat **SESS Advisor**, chatbot konsultan pra-penjualan berbasis AI yang tertanam di landing page.

---

## Tentang Produk

Smart Energy & Saving System memungkinkan pengguna untuk:

- Memantau konsumsi daya seluruh rumah secara real-time melalui *Whole House Energy Meter*
- Mengontrol perangkat di setiap ruangan dari jarak jauh
- Melacak otonomi energi bagi pengguna panel surya (Generate / Consume / From Grid)
- Menekan tagihan listrik bulanan tanpa repot

---

## Struktur Landing Page

| Section | Judul |
|---|---|
| 1 | Hero — Kendali Penuh Tagihan Listrik di Tangan Anda |
| 2 | Problem — Mengapa Membayar Lebih untuk Listrik yang Tidak Anda Gunakan? |
| 3 | Solution — Satu Aplikasi. Seluruh Rumah. Penghematan Maksimal. |
| 4 | Features — Lebih Pintar, Lebih Hemat |
| 5 | How It Works — Tiga Langkah Menuju Rumah Pintar |
| 6 | Final CTA — Siap Memangkas Tagihan Listrik Anda Bulan Depan? |

---

## SESS Advisor — Chatbot Kalkulator Penghematan & Konsultan Pra-Penjualan

### Title
**SESS Advisor** — chatbot AI berbahasa Indonesia yang tertanam di landing page sebagai *floating widget* di pojok kanan bawah. Memandu calon pelanggan dari rasa penasaran menjadi *lead* yang berkualitas untuk tim sales.

### Audience

| Segmen | Deskripsi |
|--------|-----------|
| **Pemilik Rumah Tangga** | Individu atau kepala keluarga yang membayar tagihan listrik sendiri dan ingin mengurangi pengeluaran energi bulanan. |
| **Pengguna Daya Menengah–Tinggi** | Rumah tangga dengan tagihan listrik di atas Rp 500.000/bulan yang berpotensi mendapat penghematan signifikan. |
| **Calon Pembeli yang Belum Yakin** | Pengunjung landing page yang tertarik tetapi belum yakin apakah produk ini sepadan dengan investasinya. |
| **Pemilik Panel Surya** | Pengguna yang sudah memiliki panel surya sebagian atau penuh dan ingin tahu bagaimana SESS melengkapi sistem mereka. |

Karakteristik pengguna: usia 25–55 tahun, tinggal di Indonesia, familiar dengan aplikasi chat (WhatsApp), lebih nyaman berkomunikasi dalam Bahasa Indonesia, dan membuat keputusan pembelian berdasarkan ROI yang jelas.

### How It Helps

Calon pembeli menghadapi tiga hambatan utama: **ketidakpastian nilai**, **kurangnya personalisasi**, dan **hambatan untuk bertanya**. SESS Advisor mengatasi ketiganya secara langsung:

| Kebutuhan Pengguna | Cara Chatbot Membantu |
|--------------------|----------------------|
| Ingin tahu potensi penghematan nyata | Menghitung estimasi penghematan bulanan (Rupiah) berdasarkan tagihan listrik, ukuran rumah, jumlah kamar, dan status panel surya. |
| Ingin rekomendasi yang relevan | Merekomendasikan produk SESS yang paling sesuai dengan profil rumah tangga, disertai alasannya. |
| Ingin proses yang cepat & mudah | Hanya 4–5 jawaban singkat, lalu langsung memberikan hasil — tanpa formulir panjang atau menunggu email. |
| Ingin bicara dengan tim ahli | Mengakhiri percakapan dengan tombol WhatsApp yang langsung terhubung ke tim SESS, ringkasan rekomendasi sudah otomatis terisi. |
| Punya pertanyaan tambahan | Setelah kalkulasi, pengguna bebas bertanya — chatbot menjawab berdasarkan basis pengetahuan SESS. |

**Alur Nilai (Value Flow):**

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

### Architecture & Flow

SESS Advisor adalah layanan Python FastAPI terpisah (artifact `sess-chatbot`) yang dipanggil oleh widget React di landing page melalui *shared reverse proxy* pada path `/api/chat`.

**Service Architecture:**

```
Browser (React widget di artifact smart-energy)
    │
    │  POST /api/chat  { session_id, message }
    ▼
FastAPI service (artifact sess-chatbot, port 8090)
    │
    ├── Load session memory (in-memory, TTL 1 jam)
    ├── Embed query (Gemini gemini-embedding-001)
    ├── ChromaDB (SQLite) similarity search → top-K chunks
    ├── Assemble prompt: system + context + history + message
    └── Gemini LLM (gemini-2.5-flash) → balasan Bahasa Indonesia
    │
    ▼
Browser menampilkan balasan + tombol WhatsApp bila sudah ada rekomendasi
```

**Conversation Flow:**

```
1. Greeting & context setting (Bahasa Indonesia)
2. Tagihan listrik bulanan (IDR)
3. Ukuran rumah (m² / jumlah lantai)
4. Jumlah kamar
5. Status panel surya (sudah / belum / sebagian)
6. Kalkulasi penghematan + penjelasan (RAG)
7. Rekomendasi produk SESS (RAG)
8. WhatsApp handoff CTA (pre-filled dengan ringkasan rekomendasi)
9. Open Q&A — pengguna boleh tanya bebas
```

**RAG Knowledge Base** (ChromaDB, di-seed otomatis saat *first start*):

| Collection | Isi |
|---|---|
| `sess_products` | Spesifikasi produk SESS, target penggunaan, kisaran harga |
| `savings_benchmarks` | Persentase penghematan per profil rumah & tier tagihan |
| `solar_adjustments` | Penyesuaian estimasi untuk pengguna panel surya |
| `pln_tariffs` | Tier tarif rumah tangga PLN (R-1, R-2, R-3) |
| `calculation_methodology` | Metodologi perhitungan langkah demi langkah |
| `faqs` | Tanya-jawab pra-penjualan dalam Bahasa Indonesia |

### Tech Stack

**Landing Page (`artifacts/smart-energy`):**

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React

**SESS Advisor Chatbot (`artifacts/sess-chatbot`):**

- **Backend**: Python 3.11 + FastAPI (port 8090, route `/api/chat`)
- **LLM**: Google Gemini `gemini-2.5-flash`
- **Embeddings**: Google `gemini-embedding-001`
- **Orchestration**: LangChain (Python)
- **Vector Store**: ChromaDB (SQLite backend, persisted ke `chroma_db/`)
- **Session Memory**: in-memory dict, TTL 1 jam, max 40 turn/sesi
- **Secrets**: `GEMINI_API_KEY` via Replit environment secrets
- **Widget**: React component (`SessAdvisorChat.tsx`) — glassmorphism, mengikuti *Futuristic Dark Tech* design tokens landing page

**Shared:**

- **Package Manager**: pnpm (monorepo workspace)
- **Reverse Proxy**: routing antar-artifact berbasis path (`/` → landing page, `/api/chat` → chatbot)
- **Handoff**: WhatsApp deep-link `wa.me/6282116140638` dengan pesan ringkasan otomatis

---

## Menjalankan Secara Lokal

### Prasyarat

- Node.js 20+
- Python 3.11+
- pnpm
- `GEMINI_API_KEY` (Google AI Studio) — set sebagai Replit secret

### Instalasi

```bash
pnpm install
```

### Development

Jalankan landing page:

```bash
pnpm --filter @workspace/smart-energy run dev
```

Jalankan chatbot service:

```bash
pnpm --filter @workspace/sess-chatbot run dev
```

Di Replit, kedua service ini sudah dikonfigurasi sebagai *workflow* dan jalan otomatis.

### Build Production

```bash
pnpm --filter @workspace/smart-energy run build
```

---

## Kontak

Untuk konsultasi instalasi, hubungi kami melalui WhatsApp:
**[wa.me/6282116140638](https://wa.me/6282116140638)**
