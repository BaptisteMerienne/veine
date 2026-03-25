"use client"

import { useState } from "react"
import MessageList from "@/components/chat/MessageList"
import ChatInput from "@/components/chat/ChatInput"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Bonjour ! Je suis Veine, votre assistant documentaire. Comment puis-je vous aider ?"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Réponse simulée pour l'instant
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "Je recherche dans vos documents... (réponse simulée)"
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="p-4 border-b border-neutral-200">
        <h1 className="text-lg font-medium">Veine</h1>
        <p className="text-sm text-neutral-500">Assistant documentaire</p>
      </div>
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}