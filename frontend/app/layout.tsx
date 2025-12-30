import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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
  creator: "MATist",
  publisher: "MATist",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MATist',
    title: 'MATist - AI-Powered ECE MATLAB Practical Assistant',
    description: 'Transform your ECE MATLAB practicals with AI. Get theory, dual code implementations, explanations, and publication-ready LaTeX reports in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MATist - AI-Powered ECE MATLAB Practical Assistant',
    description: 'Transform your ECE MATLAB practicals with AI. Get theory, dual code implementations, explanations, and publication-ready LaTeX reports.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
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
              <header className="flex justify-end p-4 gap-4 z-10">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-40 -top-32 h-112 w-md rounded-full bg-[radial-gradient(circle_at_center,var(--glow-primary),transparent_70%)] blur-3xl opacity-60" />
                <div className="absolute -right-48 top-[20%] h-136 w-136 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-secondary),transparent_70%)] blur-[120px] opacity-70" />
                <div className="absolute left-[25%] -bottom-72 h-128 w-lg rounded-full bg-[radial-gradient(circle_at_center,var(--glow-tertiary),transparent_70%)] blur-[120px] opacity-40" />
              </div>
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
