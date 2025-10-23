"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatApi } from "@/utils/api";
import type { ECEPracticalResponse } from "@/types/chat";
import { Loader2, Download, Code, BookOpen, Zap, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ECEPracticalInterface() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ECEPracticalResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await chatApi.processECEPractical(topic.trim());
      setResult(response);
    } catch (error) {
      console.error("Error processing practical:", error);
      setResult({
        status: "error",
        topic: topic,
        error_message: "Failed to process the practical. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLatex = () => {
    if (!result?.latex_report) return;

    const blob = new Blob([result.latex_report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.topic.replace(/\s+/g, "_")}_report.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          ECE MATLAB Practical Helper
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Get complete practical solutions: Theory, Code (Brute-Force & Optimized), Explanations, and LaTeX Reports
        </p>
      </div>

      {/* Input Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Your Practical Topic</CardTitle>
          <CardDescription>
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
                className="flex-1"
              />
              <Button type="submit" disabled={!topic.trim() || isLoading}>
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
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Results for: {result.topic}</CardTitle>
                <CardDescription>
                  {result.optimization_applicable
                    ? "Both brute-force and optimized solutions generated"
                    : "Brute-force solution generated"}
                </CardDescription>
              </div>
              {result.latex_report && (
                <Button onClick={downloadLatex} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download LaTeX Report
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="theory" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="theory">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Theory
                </TabsTrigger>
                <TabsTrigger value="brute-force">
                  <Code className="mr-2 h-4 w-4" />
                  Basic Code
                </TabsTrigger>
                {result.optimization_applicable && (
                  <TabsTrigger value="efficient">
                    <Zap className="mr-2 h-4 w-4" />
                    Optimized Code
                  </TabsTrigger>
                )}
                <TabsTrigger value="explanation">
                  <FileText className="mr-2 h-4 w-4" />
                  Explanation
                </TabsTrigger>
                <TabsTrigger value="latex">
                  <FileText className="mr-2 h-4 w-4" />
                  LaTeX Report
                </TabsTrigger>
              </TabsList>

              {/* Theory Tab */}
              <TabsContent value="theory">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result.theory || "No theory available"}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Brute Force Code Tab */}
              <TabsContent value="brute-force">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Brute-Force MATLAB Code</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Simple, easy-to-understand implementation
                    </p>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <code>{result.brute_force_code || "% No code available"}</code>
                  </pre>
                  
                  {result.brute_force_explanation && (
                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-2">Code Explanation</h4>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result.brute_force_explanation}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              {/* Efficient Code Tab */}
              {result.optimization_applicable && result.efficient_code && (
                <TabsContent value="efficient">
                  <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Optimized MATLAB Code</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Efficient implementation with vectorization and built-in functions
                      </p>
                    </div>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <code>{result.efficient_code}</code>
                    </pre>
                    
                    {result.efficient_explanation && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold mb-2">Optimization Details</h4>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.efficient_explanation}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              )}

              {/* Explanation Tab */}
              <TabsContent value="explanation">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {result.brute_force_explanation && (
                      <div className="mb-6">
                        <h3>Brute-Force Code Explanation</h3>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result.brute_force_explanation}
                        </ReactMarkdown>
                      </div>
                    )}
                    
                    {result.efficient_explanation && (
                      <div>
                        <h3>Optimization Analysis</h3>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result.efficient_explanation}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* LaTeX Report Tab */}
              <TabsContent value="latex">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Complete LaTeX Report</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Ready to use in Overleaf
                      </p>
                    </div>
                    <Button onClick={downloadLatex} size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download .tex File
                    </Button>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{result.latex_report || "% No LaTeX report available"}</code>
                  </pre>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {result && result.status === "error" && (
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Error</CardTitle>
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
