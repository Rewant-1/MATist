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

export function ECEPracticalInterface() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ECEPracticalResponse | null>(null);

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
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          ECE MATLAB Practical Helper
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Get complete practical solutions: Theory, Code (Brute-Force & Optimized), Explanations, and LaTeX Reports
        </p>
      </div>

      {/* Input Form */}
      <Card className="mb-6 shadow-xl border-2 border-slate-200 dark:border-slate-700">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30">
          <CardTitle className="text-xl">Enter Your Practical Topic</CardTitle>
          <CardDescription className="text-base">
            Describe the ECE practical you want to implement in MATLAB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., Convolution of two signals"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isLoading}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 transition-all duration-200"
              />
              <Button 
                type="submit" 
                disabled={!topic.trim() || isLoading}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>

            {/* Suggested Topics */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Quick topics:</span>
              {suggestedTopics.map((suggested) => (
                <Button
                  key={suggested}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTopic(suggested)}
                  disabled={isLoading}
                >
                  {suggested}
                </Button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && result.status === "success" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 p-4 rounded-xl border border-teal-200 dark:border-teal-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <h3 className="font-semibold text-teal-900 dark:text-teal-100">
                ✨ Complete ECE MATLAB Practical Generated for: {result.topic}
              </h3>
            </div>
            <p className="text-sm text-teal-700 dark:text-teal-300 mt-2">
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
        <Card className="border-2 border-red-200 dark:border-red-800 shadow-xl dark:shadow-red-950/50">
          <CardHeader className="bg-red-50 dark:bg-red-950/30">
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <span>❌</span> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400">
              {result.error_message || "An error occurred while processing your request."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
