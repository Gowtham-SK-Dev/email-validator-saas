import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/auth-provider"
import { PageLoader } from "@/components/page-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Email Validation API - Professional Email Verification Service",
  description:
    "Professional email validation API with real-time verification, syntax checking, domain validation, and SMTP verification. Get accurate results instantly.",
  keywords: "email validation, email verification, API, SMTP verification, domain validation, email checker",
  authors: [{ name: "Email Validation API" }],
  creator: "Email Validation API",
  publisher: "Email Validation API",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emailvalidation.com",
    title: "Email Validation API - Professional Email Verification",
    description: "Professional email validation API with real-time verification and comprehensive checking.",
    siteName: "Email Validation API",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Validation API - Professional Email Verification",
    description: "Professional email validation API with real-time verification and comprehensive checking.",
    creator: "@emailvalidationapi",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <PageLoader />
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
