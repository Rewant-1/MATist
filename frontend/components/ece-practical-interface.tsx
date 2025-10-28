"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { chatApi } from "@/utils/api";
import type { ECEPracticalResponse } from "@/types/chat";
import { Loader2, Sparkles } from "lucide-react";
import { PracticalTabs } from "@/components/practical-tabs";
import { cn } from "@/lib/utils";

export function ECEPracticalInterface() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ECEPracticalResponse | null>(null);
  const hasTopic = topic.trim().length > 0;

  // Load topic from URL query parameter
  useEffect(() => {
    const urlTopic = searchParams.get("topic");
    if (urlTopic) {
      setTopic(urlTopic);
      // Auto-submit if topic is from URL
      handleSubmitWithTopic(urlTopic);
    }
  }, [searchParams]);

  const handleSubmitWithTopic = async (topicToSubmit: string) => {
    if (!topicToSubmit.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await chatApi.processECEPractical(topicToSubmit.trim());
      setResult(response);
    } catch (error) {
      console.error("Error processing practical:", error);
      setResult({
        status: "error",
        topic: topicToSubmit,
        error_message: "Failed to process the practical. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmitWithTopic(topic);
  };

  const suggestedTopics = [
    "Convolution of two signals",
    "Fast Fourier Transform (FFT)",
    "FIR Filter Design",
    "Amplitude Modulation and Demodulation",
    "Sampling and Aliasing",
    "Discrete Fourier Transform (DFT)",
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-20 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-linear-to-br from-white/90 via-white/75 to-cyan-100/40 p-10 shadow-2xl dark:border-white/10 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-cyan-900/30">
  <div className="absolute left-1/2 top-1/2 -z-10 h-lg w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-tertiary),transparent_65%)] opacity-40 blur-[120px]" />
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 drop-shadow-sm dark:text-slate-50 sm:text-5xl">
          Build premium-ready MATLAB practicals in minutes
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Generate polished ECE practicals with theory, dual MATLAB implementations, deep explanations, and exportable LaTeX reports — all tuned for lab submissions and viva prep.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm dark:bg-slate-900/70 dark:ring-slate-700/70">
            <Sparkles className="h-4 w-4 text-teal-500" />
            Theory + Code + Explanations + LaTeX
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm dark:bg-slate-900/70 dark:ring-slate-700/70">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
            20-40 seconds per practical
          </span>
        </div>
      </div>

      {/* Input Form */}
      <Card className="glass-surface border border-white/30 shadow-2xl dark:border-white/10">
        <CardHeader className="flex flex-col gap-1 rounded-t-3xl border-b border-white/20 bg-white/65 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Describe your next practical
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            Be specific about signals, filters, modulation, datasets, or performance goals for a tailored output.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <Input
                type="text"
                placeholder="e.g., Vectorized convolution of band-limited signals with FFT verification"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isLoading}
                className="h-14 flex-1 rounded-2xl border-2 border-white/50 bg-white/80 text-base shadow-inner placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200 dark:border-white/10 dark:bg-slate-900/70 dark:placeholder:text-slate-500 dark:focus:border-teal-500 dark:focus:ring-teal-800"
              />
              <Button
                type="submit"
                disabled={!hasTopic || isLoading}
                className={cn(
                  "group inline-flex h-14 min-w-36 items-center justify-center rounded-2xl px-6 text-base font-semibold transition-all duration-200",
                  hasTopic
                    ? "bg-linear-to-r from-teal-500 via-cyan-500 to-sky-500 text-white shadow-lg hover:from-teal-500/90 hover:via-cyan-500/90 hover:to-sky-500/90 hover:shadow-xl"
                    : "bg-slate-200/70 text-slate-500 shadow-inner hover:bg-slate-200/90 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/80",
                  "disabled:cursor-not-allowed disabled:opacity-100"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Generate
                  </span>
                )}
              </Button>
            </div>

            {/* Suggested Topics */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Popular quick starts:</span>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((suggested) => (
                  <Button
                    key={suggested}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTopic(suggested)}
                    disabled={isLoading}
                    className="rounded-full border-white/40 bg-white/80 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-teal-300/80 hover:text-teal-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-teal-500/70 dark:hover:text-teal-300"
                  >
                    {suggested}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && result.status === "success" && (
        <div className="space-y-4">
          <div className="glass-surface border border-teal-200/60 bg-linear-to-r from-teal-50/90 to-cyan-50/70 p-5 dark:border-teal-800/70 dark:from-teal-950/40 dark:to-cyan-950/35">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">
                ✨ Complete ECE MATLAB Practical Generated for: {result.topic}
              </h3>
            </div>
            <p className="mt-2 text-sm text-teal-700 dark:text-teal-300">
              {result.optimization_applicable
                ? "Both basic and optimized implementations are ready!"
                : "Basic implementation is ready to use!"}
            </p>
          </div>
          
          <PracticalTabs eceData={result} />
        </div>
      )}

      {/* Error Display */}
      {result && result.status === "error" && (
        <Card className="glass-surface border border-red-300/70 shadow-2xl dark:border-red-900/70">
          <CardHeader className="rounded-t-3xl bg-red-50/80 dark:bg-red-950/40">
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-300">
              <span>❌</span> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-300">
              {result.error_message || "An error occurred while processing your request."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
