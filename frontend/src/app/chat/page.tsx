"use client"

import { useState, useEffect } from "react"
import MessageList from "@/components/chat/MessageList"
import ChatInput from "@/components/chat/ChatInput"
import { createConversation, sendMessage } from "@/lib/api/chat"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis Veine, votre assistant documentaire. Comment puis-je vous aider ?"
    }
  ])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    createConversation().then((conv) => {
      setConversationId(conv.id)
    })
  }, [])

  const handleSend = async (content: string) => {
    if (!conversationId) return

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2),
      role: "user",
      content
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await sendMessage(conversationId, content)
      const assistantMessage: Message = {
        id: response.id,
        role: "assistant",
        content: response.content
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error)
    } finally {
      setIsLoading(false)
    }
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