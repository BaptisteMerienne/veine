type Source = {
  filename: string
  excerpt: string
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: Source[]
}

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col gap-2">
          <div
            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
              message.role === "user"
                ? "self-end bg-neutral-900 text-white"
                : "self-start bg-neutral-100 text-neutral-900"
            }`}
          >
            {message.content}
          </div>

          {message.sources && message.sources.length > 0 && (
            <div className="self-start max-w-[75%] flex flex-col gap-1">
              {message.sources.map((source, i) => (
                <div
                  key={i}
                  className="text-xs text-neutral-400 border border-neutral-200 rounded-lg px-3 py-2"
                >
                  <span className="font-medium text-neutral-500">
                    {source.filename}
                  </span>
                  <p className="mt-1 line-clamp-2">{source.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}