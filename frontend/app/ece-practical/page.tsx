"use client";

import { ECEPracticalInterface } from "@/components/ece-practical-interface";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function ECEPracticalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Back to Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <ECEPracticalInterface />
    </div>
  );
}
