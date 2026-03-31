"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import LuckyBackground from "@/components/ui/LuckyBackground"

type Document = {
  id: string
  filename: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export default function AdminPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const fetchDocuments = async () => {
    const res = await fetch(`${API_URL}/api/documents`)
    const data = await res.json()
    setDocuments(data)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setMessage({ text: "Document uploadé et indexé avec succès 🍀", type: "success" })
        fetchDocuments()
      } else {
        setMessage({ text: "Erreur lors de l'upload.", type: "error" })
      }
    } catch {
      setMessage({ text: "Erreur réseau.", type: "error" })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/api/documents/${id}`, { method: "DELETE" })
    fetchDocuments()
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#F4F9EE" }}>
      <LuckyBackground />

      <nav
        className="relative z-10 flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "#C8DDB8", background: "#F4F9EE" }}
      >
        <span
          className="font-serif text-xl font-black tracking-tight"
          style={{ color: "#1A2E1C", letterSpacing: "-0.04em" }}
        >
          <span style={{ color: "#4A7C40" }}>v</span>eine
        </span>
        <div className="flex gap-2">
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
          >
            Accueil
          </Link>
          <Link
            href="/chat"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
          >
            Chat
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4"
            style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#4A7C40" }} />
            Espace admin
          </div>
          <h1
            className="font-serif text-4xl font-black mb-3"
            style={{ color: "#1A2E1C", letterSpacing: "-0.03em" }}
          >
            Gérez vos <span style={{ color: "#2E6828" }}>documents</span>
          </h1>
          <p className="font-sans text-sm" style={{ color: "#6B8A5E", lineHeight: 1.65 }}>
            Uploadez vos PDF pour enrichir la base de connaissances de Veine. Chaque document est automatiquement découpé et indexé.
          </p>
        </div>

        <div
          className="rounded-3xl p-8 mb-8 text-center"
          style={{ background: "#EAF4E0", border: "0.5px solid #C8DDB8" }}
        >
          <div className="text-4xl mb-3">🍀</div>
          <p className="font-sans text-sm mb-5" style={{ color: "#6B8A5E" }}>
            Glissez un PDF ou cliquez pour sélectionner
          </p>
          <label
            className="inline-block text-sm font-bold px-6 py-3 rounded-2xl cursor-pointer transition-transform hover:scale-105"
            style={{
              background: isUploading ? "#A8CC98" : "#2E6828",
              color: "#F0F9E8",
              opacity: isUploading ? 0.8 : 1,
            }}
          >
            {isUploading ? "Indexation en cours... ✦" : "Choisir un PDF →"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {message && (
            <div
              className="mt-4 text-sm font-medium px-4 py-3 rounded-xl"
              style={{
                background: message.type === "success" ? "#E0F0D4" : "#FEE2E2",
                color: message.type === "success" ? "#2E6828" : "#991B1B",
                border: `0.5px solid ${message.type === "success" ? "#B8D8A0" : "#FECACA"}`,
              }}
            >
              {message.text}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-serif text-xl font-black"
              style={{ color: "#1A2E1C", letterSpacing: "-0.02em" }}
            >
              Documents indexés
            </h2>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "#E0F0D4", color: "#2E6828", border: "0.5px solid #B8D8A0" }}
            >
              {documents.length} document{documents.length !== 1 ? "s" : ""}
            </span>
          </div>

          {documents.length === 0 ? (
            <div
              className="text-center py-12 rounded-2xl"
              style={{ background: "#EAF4E0", border: "0.5px solid #C8DDB8" }}
            >
              <div className="text-3xl mb-3">✦</div>
              <p className="font-sans text-sm" style={{ color: "#8AB878" }}>
                Aucun document indexé pour l`&apos;`instant.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl transition-transform hover:-translate-y-0.5"
                  style={{ background: "#FDFFFE", border: "0.5px solid #C8DDB8" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                      style={{ background: "#E0F0D4", color: "#2E6828" }}
                    >
                      PDF
                    </div>
                    <span className="font-sans text-sm font-medium" style={{ color: "#1A2E1C" }}>
                      {doc.filename}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors hover:scale-105"
                    style={{ background: "#FEE2E2", color: "#991B1B", border: "0.5px solid #FECACA" }}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 text-center pb-8">
        <p className="text-xs" style={{ color: "#8AB878" }}>
          Construit avec Next.js · FastAPI · Mistral · pgvector
        </p>
      </footer>
    </div>
  )
}