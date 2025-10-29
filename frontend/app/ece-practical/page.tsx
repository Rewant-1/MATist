import { Suspense } from "react";
import { ECEPracticalInterface } from "@/components/ece-practical-interface";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ECEPracticalPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0f0f0f] relative text-gray-800 dark:text-white">
      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none pattern-circuit-light dark:pattern-circuit-dark" />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-transparent">
        <div className="glass-surface mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/20 dark:border-white/10 px-4 py-4 shadow-2xl backdrop-blur-xl">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
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
                className="border-2 border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-100 hover:border-teal-300 dark:hover:border-teal-500 hover:bg-white/90 dark:hover:bg-slate-900/90 transition-all duration-200"
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
        <Suspense fallback={<div className="p-6 text-center text-gray-800 dark:text-white">Loading practical interface...</div>}>
          <ECEPracticalInterface />
        </Suspense>
      </div>
    </div>
  );
}
