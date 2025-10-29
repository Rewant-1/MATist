import { Suspense } from "react";
import { ECEPracticalInterface } from "@/components/ece-practical-interface";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ECEPracticalPage() {
  return (
    <>
      {/* Light Mode Background */}
      <div className="min-h-screen w-full bg-white relative text-gray-800 dark:hidden">
        {/* Circuit Board - Light Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
              radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
              radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-transparent">
          <div className="glass-surface mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/20 px-4 py-4 shadow-2xl backdrop-blur-xl">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/70 transition-colors"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="border-2 border-slate-200/70 bg-white/60 text-slate-700 hover:border-teal-300 hover:bg-white/90 transition-all duration-200"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Q&A Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content: wrap client component in Suspense so useSearchParams is allowed */}
        <div className="pb-16 pt-10">
          <Suspense fallback={<div className="p-6 text-center">Loading practical interface...</div>}>
            <ECEPracticalInterface />
          </Suspense>
        </div>
      </div>

      {/* Dark Mode Background */}
      <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white hidden dark:block">
        {/* Circuit Board - Dark Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
              radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
              radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-transparent">
          <div className="glass-surface mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 px-4 py-4 shadow-2xl backdrop-blur-xl">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 transition-colors"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="border-2 border-slate-700/70 bg-slate-900/60 text-slate-100 hover:border-teal-500 hover:bg-slate-900/90 transition-all duration-200"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Q&A Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content: wrap client component in Suspense so useSearchParams is allowed */}
        <div className="pb-16 pt-10">
          <Suspense fallback={<div className="p-6 text-center">Loading practical interface...</div>}>
            <ECEPracticalInterface />
          </Suspense>
        </div>
      </div>
    </>
  );
}
