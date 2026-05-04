"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LuckyBackground from "@/components/ui/LuckyBackground";
import { createConversation, sendMessage } from "@/lib/api/chat";
import MarkdownMessage from "@/components/chat/MarkdownMessage";

type Source = { filename: string; excerpt: string };
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Je suis Veine. Posez-moi une question sur vos documents.",
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createConversation().then((conv) => setConversationId(conv.id));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!value.trim() || !conversationId) return;
    const content = value;
    setValue("");

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage(conversationId, content);
      setMessages((prev) => [
        ...prev,
        {
          id: response.id,
          role: "assistant",
          content: response.content,
          sources: response.sources || [],
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen relative overflow-hidden"
      style={{ background: "#F4F9EE" }}
    >
      <LuckyBackground />

      <nav
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#C8DDB8", background: "#EAF4E0" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: "#2E6828", color: "#F0F9E8" }}
          >
            V
          </div>
          <div>
            <div
              className="font-serif text-sm font-black"
              style={{ color: "#1A2E1C" }}
            >
              Veine
            </div>
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: "#7A9A6A" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#5AAF4A" }}
              />
              En ligne
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{
              color: "#4A7C40",
              background: "#E0F0D4",
              border: "0.5px solid #B8D8A0",
            }}
          >
            Accueil
          </Link>
          <Link
            href="/admin"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{
              color: "#4A7C40",
              background: "#E0F0D4",
              border: "0.5px solid #B8D8A0",
            }}
          >
            Admin
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2 items-start"}`}
          >
            {msg.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-black mt-0.5"
                style={{ background: "#2E6828", color: "#F0F9E8" }}
              >
                V
              </div>
            )}
            <div>
              <div
                className="text-sm leading-relaxed px-4 py-2.5"
                style={{
                  borderRadius:
                    msg.role === "user"
                      ? "16px 4px 16px 16px"
                      : "4px 16px 16px 16px",
                  background: msg.role === "user" ? "#2E6828" : "#FDFFFE",
                  color: msg.role === "user" ? "#F0F9E8" : "#1A2E1C",
                  border:
                    msg.role === "assistant" ? "0.5px solid #C0D8A8" : "none",
                  fontWeight: msg.role === "user" ? 500 : 400,
                  maxWidth: "72%",
                }}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <MarkdownMessage content={msg.content} />
                )}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-col gap-1 mt-2">
                  {msg.sources.map((s, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: "#FEF0B0",
                        border: "0.5px solid #E8D060",
                        color: "#8A6010",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="#8A6010"
                        strokeWidth="1.5"
                      >
                        <path d="M2 2h12v12H2z" />
                        <path d="M5 6h6M5 9h4" />
                      </svg>
                      <span className="font-semibold">{s.filename}</span> ·
                      extrait {i + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: "#2E6828", color: "#F0F9E8" }}
            >
              V
            </div>
            <div
              className="flex gap-1 px-4 py-3 rounded-2xl"
              style={{ background: "#FDFFFE", border: "0.5px solid #C0D8A8" }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "#4A7C40",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div
        className="relative z-10 px-4 py-3 border-t max-w-2xl mx-auto w-full"
        style={{ borderColor: "#C8DDB8", background: "#F4F9EE" }}
      >
        <div className="flex gap-2 items-center">
          <input
            className="flex-1 text-sm px-4 py-2.5 rounded-xl outline-none"
            style={{
              background: "#FDFFFE",
              border: "0.5px solid #B8D0A0",
              color: "#1A2E1C",
            }}
            placeholder="Posez votre question..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110 hover:rotate-6 disabled:opacity-40"
            style={{ background: "#F0C030", border: "none" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#3A2808"
              strokeWidth="2"
            >
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
