import { useState } from "react"

type Props = {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: Props) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value)
    setValue("")
  }

  return (
    <div className="flex gap-2 p-4 border-t border-neutral-200">
      <input
        className="flex-1 rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500"
        placeholder="Posez votre question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm disabled:opacity-50"
      >
        {isLoading ? "..." : "Envoyer"}
      </button>
    </div>
  )
}