import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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
