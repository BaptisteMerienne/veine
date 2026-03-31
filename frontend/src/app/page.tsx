import Link from "next/link"
import LuckyBackground from "@/components/ui/LuckyBackground"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#F4F9EE" }}>
      <LuckyBackground />

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: "#C8DDB8", background: "#F4F9EE" }}>
        <span className="text-xl font-black tracking-tight" style={{ color: "#1A2E1C", letterSpacing: "-0.04em" }}>
          <span style={{ color: "#4A7C40" }}>v</span>eine
        </span>
        <div className="flex gap-2">
          <Link
            href="/chat"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
          >
            Chat
          </Link>
          <Link
            href="/admin"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
          >
            Admin
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-8 py-20 text-center">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6"
          style={{ color: "#4A7C40", background: "#E0F0D4", border: "0.5px solid #B8D8A0" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4A7C40" }} />
          Assistant documentaire IA
        </div>

        <h1
          className="font-serif text-5xl font-black leading-tight mb-4"
          style={{ color: "#1A2E1C", letterSpacing: "-0.04em", maxWidth: 560 }}
        >
          Vous avez de la{" "}
          <span style={{ color: "#2E6828" }}>veine</span>
          <br />
          vos documents{" "}
          <span
            style={{ color: "#B07D1A " }}
          >
            parlent enfin
          </span>
        </h1>

        <p
          className="font-sans text-base mb-10 leading-relaxed"
          style={{ color: "#6B8A5E", maxWidth: 400 }}
        >
          Posez vos questions en langage naturel. Veine trouve les réponses
          dans vos PDF et votre base de connaissances.
        </p>

        <div className="flex gap-3">
          <Link
            href="/chat"
            className="text-sm font-bold px-6 py-3 rounded-2xl transition-transform hover:scale-105"
            style={{ background: "#2E6828", color: "#F0F9E8" }}
          >
            Démarrer le chat →
          </Link>
          <Link
            href="/admin"
            className="text-sm font-bold px-6 py-3 rounded-2xl transition-transform hover:scale-105"
            style={{ background: "#F0C030", color: "#3A2808" }}
          >
            Gérer les docs 🍀
          </Link>
        </div>
      </main>

      <section className="relative z-10 grid grid-cols-3 gap-3 px-8 pb-16 max-w-2xl mx-auto w-full">
        {[
          {
            label: "RAG",
            title: "Recherche sémantique",
            desc: "Trouve le sens, pas juste les mots",
            bg: "#E0F0D4",
            border: "#B0D090",
          },
          {
            label: "PDF",
            title: "Upload & indexation",
            desc: "Vos documents en quelques secondes",
            bg: "#D8EED0",
            border: "#A8CC98",
          },
          {
            label: "IA",
            title: "Mistral powered",
            desc: "Réponses précises avec sources",
            bg: "#EAF4E0",
            border: "#C0DCA8",
          },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-2xl p-4 transition-transform hover:-translate-y-1"
            style={{ background: f.bg, border: `0.5px solid ${f.border}` }}
          >
            <div className="text-2xl font-black mb-2" style={{ color: "#2E6828" }}>
              {f.label}
            </div>
            <div className="text-xs font-bold mb-1" style={{ color: "#1A2E1C" }}>
              {f.title}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#5A7A4E" }}>
              {f.desc}
            </div>
          </div>
        ))}
      </section>

      <footer className="relative z-10 text-center pb-8">
        <p className="text-xs" style={{ color: "#8AB878" }}>
          Construit avec Next.js · FastAPI · Mistral · pgvector
        </p>
      </footer>
    </div>
  )
}