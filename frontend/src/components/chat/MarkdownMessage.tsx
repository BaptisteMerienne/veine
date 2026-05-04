import ReactMarkdown from "react-markdown"

type Props = {
  content: string
}

export default function MarkdownMessage({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="font-serif text-xl font-black mb-3 mt-4" style={{ color: "#1A2E1C", letterSpacing: "-0.02em" }}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-serif text-lg font-black mb-2 mt-4" style={{ color: "#1A2E1C" }}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-serif text-base font-bold mb-2 mt-3" style={{ color: "#2E6828" }}>
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: "#1A2E1C" }}>
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-bold" style={{ color: "#2E6828" }}>
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic" style={{ color: "#6B8A5E" }}>
            {children}
          </em>
        ),
        ul: ({ children }) => (
          <ul className="font-sans text-sm mb-3 flex flex-col gap-1.5" style={{ paddingLeft: "1.2rem" }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="font-sans text-sm mb-3 flex flex-col gap-1.5" style={{ paddingLeft: "1.2rem", listStyleType: "decimal" }}>
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed" style={{ color: "#1A2E1C", listStyleType: "disc" }}>
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className="my-3 px-4 py-2 rounded-xl font-sans text-sm italic"
            style={{ background: "#EAF4E0", borderLeft: "3px solid #4A7C40", color: "#4A7C40" }}
          >
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code
            className="text-xs px-2 py-0.5 rounded-lg font-mono"
            style={{ background: "#E0F0D4", color: "#2E6828" }}
          >
            {children}
          </code>
        ),
        hr: () => (
          <hr className="my-3" style={{ borderColor: "#C8DDB8" }} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}