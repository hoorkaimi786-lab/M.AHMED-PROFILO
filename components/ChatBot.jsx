"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Assalam-o-Alaikum! 👋 Main Ahmed ka AI assistant hoon. Ahmed ke skills, projects ya contact ke baare mein kuch poochein!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Connection problem! Dobara koshish karein." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 shadow-lg shadow-cyan-500/40 flex items-center justify-center text-2xl btn-glow hover:scale-110 active:scale-95 transition"
        aria-label="Chat with AI assistant"
      >
        {open ? "✕" : "💬"}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[90] w-[350px] max-w-[calc(100vw-3rem)] transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#0b0b20]/95 backdrop-blur-xl flex flex-col h-[480px] max-h-[70vh]">
          <div className="px-5 py-4 bg-gradient-to-r from-indigo-600/80 to-cyan-600/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <p className="font-bold text-sm">Ahmed AI Assistant</p>
                <p className="text-xs text-cyan-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-xl leading-none transition"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-md"
                      : "bg-white/10 text-gray-200 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    ></span>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Apna sawal likhein..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 placeholder:text-gray-500"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center disabled:opacity-50 hover:opacity-90 active:scale-95 transition"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
