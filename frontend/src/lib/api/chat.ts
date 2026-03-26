const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function createConversation() {
  const res = await fetch(`${API_URL}/api/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Nouvelle conversation" })
  })
  return res.json()
}

export async function sendMessage(conversationId: string, content: string) {
  const res = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: "user", content })
  })
  return res.json()
}

export async function getConversation(conversationId: string) {
  const res = await fetch(`${API_URL}/api/conversations/${conversationId}`)
  return res.json()
}