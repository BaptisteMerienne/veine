import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-medium">Veine</h1>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            Chat
          </Link>
          <Link
            href="/admin"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            Admin
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-4xl font-medium text-neutral-900 mb-4">
          Extrayez la connaissance
          <br />
          de vos documents
        </h2>
        <p className="text-lg text-neutral-500 max-w-lg mb-8">
          Veine est un assistant documentaire intelligent. Posez vos questions
          en langage naturel et obtenez des réponses précises issues de vos PDF
          et de votre base de connaissances.
        </p>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="rounded-xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
          >
            Démarrer le chat
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-neutral-300 text-neutral-900 px-6 py-3 text-sm hover:bg-neutral-50 transition-colors"
          >
            Gérer les documents
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-200 px-8 py-4 text-center">
        <p className="text-sm text-neutral-400">
          Construit avec Next.js · FastAPI · Mistral · pgvector
        </p>
      </footer>
    </div>
  )
}