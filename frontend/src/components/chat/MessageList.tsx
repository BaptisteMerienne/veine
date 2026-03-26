type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
            message.role === "user"
              ? "self-end bg-neutral-900 text-white"
              : "self-start bg-neutral-100 text-neutral-900"
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  )
}