"use client"

import { useState, useEffect } from "react"

type Document = {
  id: string
  filename: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export default function AdminPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")

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
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        method: "POST",
        body: formData
      })

      if (res.ok) {
        setMessage("Document uploadé et indexé avec succès.")
        fetchDocuments()
      } else {
        setMessage("Erreur lors de l'upload.")
      }
    } catch {
      setMessage("Erreur réseau.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/api/documents/${id}`, { method: "DELETE" })
    fetchDocuments()
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-neutral-200 px-8 py-4">
        <h1 className="text-lg font-medium">Veine — Admin</h1>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-medium mb-2">Gestion des documents</h2>
        <p className="text-neutral-500 text-sm mb-8">
          Uploadez vos PDF pour enrichir la base de connaissances de Veine.
        </p>

        <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center mb-8">
          <p className="text-neutral-500 text-sm mb-4">
            Glissez un PDF ou cliquez pour sélectionner
          </p>
          <label className="cursor-pointer rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-700 transition-colors">
            {isUploading ? "Traitement en cours..." : "Choisir un PDF"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
          {message && (
            <p className="mt-4 text-sm text-neutral-600">{message}</p>
          )}
        </div>

        <h3 className="text-lg font-medium mb-4">
          Documents indexés ({documents.length})
        </h3>

        {documents.length === 0 ? (
          <p className="text-neutral-400 text-sm">Aucun document indexé.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between border border-neutral-200 rounded-xl px-4 py-3"
              >
                <span className="text-sm text-neutral-700">{doc.filename}</span>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}