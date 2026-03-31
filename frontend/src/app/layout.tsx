import type { Metadata } from "next"
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "700", "800", "900"],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Veine — Assistant documentaire IA",
  description: "Vous avez de la veine — vos documents parlent enfin.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
       <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}