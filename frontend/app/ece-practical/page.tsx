import { Suspense } from "react";
import { ECEPracticalInterface } from "@/components/ece-practical-interface";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ECEPracticalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/chat">
            <Button 
              variant="outline" 
              className="border-2 border-slate-200 dark:border-slate-700 hover:bg-white hover:border-teal-300 dark:hover:bg-slate-800 dark:hover:border-teal-600 backdrop-blur-sm transition-all duration-200"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Q&A Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content: wrap client component in Suspense so useSearchParams is allowed */}
      <Suspense fallback={<div className="p-6 text-center">Loading practical interface...</div>}>
        <ECEPracticalInterface />
      </Suspense>
    </div>
  );
}
