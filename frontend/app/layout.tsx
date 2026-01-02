import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://matist.vercel.app'),
  title: {
    default: "MATist - AI-Powered ECE MATLAB Practical Assistant",
    template: "%s | MATist",
  },
  description: "Transform your ECE MATLAB practicals with AI. Get theory, dual code implementations, explanations, and publication-ready LaTeX reports in minutes.",
  keywords: ["ECE", "MATLAB", "Signal Processing", "LaTeX", "AI Tutor", "ECE Practicals", "MATist", "Electronics", "Communication Engineering", "FFT", "DFT", "Filter Design"],
  authors: [{ name: "MATist Team" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://matist.vercel.app',
    siteName: 'MATist',
    title: 'MATist - AI-Powered ECE MATLAB Practical Assistant',
    description: 'Transform your ECE MATLAB practicals with AI. Get theory, dual code implementations, explanations, and publication-ready LaTeX reports.',
    images: [
      {
        url: '/logo-main.svg',
        width: 1200,
        height: 630,
        alt: 'MATist - MATLAB Practical Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MATist - AI-Powered ECE MATLAB Practical Assistant',
    description: 'Transform your ECE MATLAB practicals with AI. Get theory, dual code implementations, explanations, and publication-ready LaTeX reports.',
  },
  icons: {
    icon: [
      { url: '/logo-main.svg', sizes: 'any' },
      { url: '/logo-main.svg', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/logo-main.svg',
    apple: '/logo-main.svg',
  },
  verification: {
    // Add your verification codes when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo-main.svg" type="image/png" sizes="any" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background text-foreground antialiased",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              {/* Transparent floating header with auth */}
              <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
                <Link href="/" className="flex items-center">
                  <img src="/logo-main.svg" alt="MATist" className="h-16 w-16 rounded-full object-cover bg-white/5 border-2 border-white/10 scale-75" style={{ objectPosition: 'center 60%' }} />
                </Link>
                <div className="flex items-center gap-3">
                  <SignedOut>
                    <Link href="/ece-practical">
                      <button className="group relative overflow-hidden rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Start Generating
                        </span>
                      </button>
                    </Link>
                    <SignInButton mode="modal">
                      <button className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/ece-practical">
                      <button className="group relative overflow-hidden rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Start Generating
                        </span>
                      </button>
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </header>
               <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                 <div className="absolute -left-40 -top-32 h-112 w-md rounded-full bg-[radial-gradient(circle_at_center,var(--glow-primary),transparent_70%)] blur-3xl opacity-60" />
                 <div className="absolute -right-48 top-[20%] h-136 w-136 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-secondary),transparent_70%)] blur-[120px] opacity-70" />
               </div>

              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
