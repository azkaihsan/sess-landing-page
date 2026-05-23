import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, X, Send, MessageCircle, Minus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type ChatMessage = { role: "user" | "assistant"; content: string };

const WA_NUMBER = "6282116140638";
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Halo! Saya **SESS Advisor**. Saya bantu hitung estimasi penghematan listrik bulanan Anda dengan SESS dalam < 2 menit. Boleh saya tanya beberapa hal singkat? \n\nBerapa rata-rata tagihan listrik bulanan Anda? (dalam Rupiah)",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(text: string): string {
  // tiny renderer: escapes ALL HTML first, then applies a tiny allow-list:
  // **bold**, line breaks, and "> " block quotes.
  return text
    .split("\n")
    .map((line) => {
      const isQuote = line.startsWith("> ");
      const raw = isQuote ? line.slice(2) : line;
      const escaped = escapeHtml(raw);
      const bolded = escaped.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-primary">$1</strong>',
      );
      if (isQuote) {
        return `<div class="my-1 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-secondary">${bolded}</div>`;
      }
      return bolded;
    })
    .join("<br/>");
}

function buildWhatsAppLink(history: ChatMessage[]): string {
  const lastBot = [...history].reverse().find((m) => m.role === "assistant");
  let summary =
    "Halo Tim SESS, saya baru berkonsultasi dengan SESS Advisor di website dan ingin lanjut konsultasi.";
  if (lastBot) {
    // strip markdown for WhatsApp
    const cleaned = lastBot.content
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/^>\s?/gm, "")
      .trim();
    summary = `Halo Tim SESS, saya baru konsultasi dengan SESS Advisor. Ringkasan terakhirnya:\n\n"${cleaned}"\n\nBoleh saya konsultasi lebih lanjut?`;
  }
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(summary)}`;
}

const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2">
    <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" style={{ animationDelay: "0ms" }} />
    <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" style={{ animationDelay: "150ms" }} />
    <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" style={{ animationDelay: "300ms" }} />
  </div>
);

export default function SessAdvisorChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [readyForHandoff, setReadyForHandoff] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open, minimized]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  // Detect when the bot has produced a savings estimate or product recommendation
  useEffect(() => {
    if (readyForHandoff) return;
    const recent = messages.slice(-4).map((m) => m.content.toLowerCase()).join(" ");
    if (
      recent.includes("estimasi penghematan") ||
      recent.includes("rekomendasi:") ||
      recent.includes("rekomendasi produk")
    ) {
      setReadyForHandoff(true);
    }
  }, [messages, readyForHandoff]);

  const waLink = useMemo(() => buildWhatsAppLink(messages), [messages]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setError(null);
    setSending(true);
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { session_id: string; reply: string };
      setSessionId(data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(
        "Maaf, ada gangguan koneksi ke SESS Advisor. Coba lagi sebentar, atau langsung hubungi tim SESS lewat WhatsApp.",
      );
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {(!open || minimized) && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => {
              setOpen(true);
              setMinimized(false);
            }}
            aria-label="Buka SESS Advisor"
            className="fixed bottom-6 right-6 z-50 group"
          >
            <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse" />
            <span className="absolute inset-0 rounded-full border-2 border-primary/60 animate-ping" />
            <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_0_30px_rgba(0,240,255,0.55)] group-hover:scale-105 transition-transform">
              <Zap className="w-7 h-7" />
            </span>
            <span className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-background/90 border border-primary/30 px-4 py-2 text-sm font-medium text-primary shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              Hitung penghematan Anda
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-2xl border border-white/10 bg-[hsl(240_10%_6%)]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.18)] overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-primary/20 via-primary/5 to-secondary/10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="absolute inset-0 rounded-xl bg-primary/30 blur-md -z-10" />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-sm tracking-tight text-white">SESS Advisor</div>
                  <div className="text-[11px] text-secondary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Online — Bahasa Indonesia
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(true)}
                  aria-label="Minimize"
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Tutup"
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border-l-2 border-primary bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/90 shadow-[0_0_18px_rgba(0,240,255,0.08)]">
                      <div
                        // safe: bot output is constrained Bahasa Indonesia from our own service; we render a tiny
                        // markdown subset (bold + line breaks + quotes)
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                      />
                    </div>
                  ) : (
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm leading-relaxed text-white shadow-[0_0_15px_rgba(0,240,255,0.12)]">
                      {m.content}
                    </div>
                  )}
                </motion.div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm border-l-2 border-primary bg-white/[0.04]">
                    <TypingDots />
                  </div>
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
                  {error}
                </div>
              )}
            </div>

            {/* WhatsApp CTA (appears after recommendation) */}
            {readyForHandoff && (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 mb-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold py-3 transition-colors shadow-[0_0_25px_rgba(37,211,102,0.4)]"
              >
                <FaWhatsapp className="w-5 h-5" />
                Lanjut Konsultasi via WhatsApp
              </motion.a>
            )}

            {/* Input */}
            <div className="border-t border-white/10 bg-black/30 px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={sending}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30 py-2"
                />
                <button
                  onClick={send}
                  disabled={sending || !input.trim()}
                  aria-label="Kirim"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-white/40">
                <MessageCircle className="w-3 h-3" />
                Didukung oleh Gemini · Estimasi indikatif, bukan kesepakatan harga
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
