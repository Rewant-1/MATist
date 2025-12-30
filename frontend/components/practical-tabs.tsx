"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Zap, FileText, Copy, Check, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PracticalTabsProps {
  eceData: {
    topic: string;
    theory?: string;
    brute_force_code?: string;
    brute_force_explanation?: string;
    efficient_code?: string | null;
    efficient_explanation?: string | null;
    optimization_applicable?: boolean;
    latex_report?: string;
  };
}

export function PracticalTabs({ eceData }: PracticalTabsProps) {
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);

  const copyToClipboard = async (content: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedTab(tabName);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const downloadLatex = () => {
    if (!eceData.latex_report) return;
    const blob = new Blob([eceData.latex_report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eceData.topic.replace(/\s+/g, "_")}_report.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    if (!eceData.latex_report || isGeneratingPdf) return;
    
    setIsGeneratingPdf(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latex: eceData.latex_report }),
      });
      
      if (response.ok && response.headers.get('content-type') === 'application/pdf') {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${eceData.topic.replace(/\s+/g, '_')}_report.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        console.error('PDF generation failed:', error);
        alert('PDF generation failed. Try downloading LaTeX and using Overleaf.');
      }
    } catch (error) {
      console.error('PDF download error:', error);
      alert('PDF service unavailable. Try downloading LaTeX and using Overleaf.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl gap-1">
          <TabsTrigger 
            value="theory" 
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
          >
            <BookOpen className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 truncate">Theory</span>
          </TabsTrigger>
          <TabsTrigger 
            value="basic" 
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
          >
            <Code className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 truncate">Basic</span>
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!eceData.optimization_applicable}
          >
            <Zap className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 truncate">Advanced</span>
          </TabsTrigger>
          <TabsTrigger 
            value="latex" 
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 truncate">LaTeX</span>
          </TabsTrigger>
        </TabsList>

        {/* Theory Tab */}
        <TabsContent value="theory" className="mt-4">
          <Card className="border-teal-200 dark:border-teal-800">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    Theory Explanation
                  </CardTitle>
                  <CardDescription>Understand the fundamental concepts</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.theory && copyToClipboard(eceData.theory, "theory")}
                  className="border-teal-300 hover:bg-teal-100 dark:border-teal-700 dark:hover:bg-teal-900"
                >
                  {copiedTab === "theory" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="prose prose-base max-w-none dark:prose-invert prose-headings:text-teal-800 dark:prose-headings:text-teal-300 prose-strong:text-teal-900 dark:prose-strong:text-teal-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {eceData.theory || "No theory available"}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Basic Code Tab */}
        <TabsContent value="basic" className="mt-4">
          <Card className="border-cyan-200 dark:border-cyan-800">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-950 dark:to-sky-950">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-cyan-900 dark:text-cyan-100">
                    <Code className="h-5 w-5 text-cyan-600" />
                    Basic Implementation
                  </CardTitle>
                  <CardDescription>Well-commented MATLAB code for beginners</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.brute_force_code && copyToClipboard(eceData.brute_force_code, "basic")}
                  className="border-cyan-300 hover:bg-cyan-100 dark:border-cyan-700 dark:hover:bg-cyan-900"
                >
                  {copiedTab === "basic" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Enhanced styling ke saath Code Block */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-cyan-800 dark:text-cyan-200 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    MATLAB Code
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => eceData.brute_force_code && copyToClipboard(eceData.brute_force_code, "basic-code")}
                    className="text-xs"
                  >
                    {copiedTab === "basic-code" ? (
                      <>
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative group">
                  <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-5 rounded-xl overflow-x-auto overflow-y-auto max-h-[400px] text-sm border border-slate-700 shadow-lg">
                    <code className="font-mono leading-relaxed whitespace-pre-wrap break-words">{eceData.brute_force_code || "% No code available"}</code>
                  </pre>
                </div>
              </div>

              {/* Better spacing ke saath Explanation */}
              {eceData.brute_force_explanation && (
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Step-by-Step Explanation
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[500px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-emerald-700 dark:prose-headings:text-emerald-300 prose-p:leading-7 prose-p:mb-4 prose-li:mb-2 prose-code:text-xs prose-code:bg-slate-200 dark:prose-code:bg-slate-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {eceData.brute_force_explanation}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Code Tab */}
        <TabsContent value="advanced" className="mt-4">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                    <Zap className="h-5 w-5 text-amber-600" />
                    Optimized Implementation
                  </CardTitle>
                  <CardDescription>Performance-optimized version with improvements</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.efficient_code && copyToClipboard(eceData.efficient_code, "advanced")}
                  className="border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900"
                >
                  {copiedTab === "advanced" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {eceData.optimization_applicable ? (
                <>
                  {/* Optimized Code Block */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Optimized MATLAB Code
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => eceData.efficient_code && copyToClipboard(eceData.efficient_code, "advanced-code")}
                        className="text-xs"
                      >
                        {copiedTab === "advanced-code" ? (
                          <>
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="relative group">
                      <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-5 rounded-xl overflow-x-auto overflow-y-auto max-h-[400px] text-sm border border-slate-700 shadow-lg">
                        <code className="font-mono leading-relaxed whitespace-pre-wrap break-words">{eceData.efficient_code || "% No optimized code available"}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Optimization Explanation */}
                  {eceData.efficient_explanation && (
                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <h4 className="text-base font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Optimization Details
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[500px] overflow-y-auto">
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-rose-700 dark:prose-headings:text-rose-300 prose-p:leading-7 prose-p:mb-4 prose-li:mb-2 prose-code:text-xs prose-code:bg-slate-200 dark:prose-code:bg-slate-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {eceData.efficient_explanation}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Zap className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-semibold">No optimization applicable for this practical</p>
                  <p className="text-sm mt-2">The basic implementation is already optimal</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LaTeX Tab */}
        <TabsContent value="latex" className="mt-4">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    LaTeX Report
                  </CardTitle>
                  <CardDescription>Complete academic report ready for Overleaf</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eceData.latex_report && copyToClipboard(eceData.latex_report, "latex")}
                    className="border-indigo-300 hover:bg-indigo-100 dark:border-indigo-700 dark:hover:bg-indigo-900"
                  >
                    {copiedTab === "latex" ? (
                      <>
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={downloadPdf}
                    disabled={isGeneratingPdf}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadLatex}
                    className="border-indigo-300 hover:bg-indigo-100 dark:border-indigo-700 dark:hover:bg-indigo-900"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download .tex
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-5 shadow-sm">
                <p className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 text-base flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  📄 How to use this LaTeX report:
                </p>
                <ol className="list-decimal ml-6 space-y-2 text-indigo-800 dark:text-indigo-200">
                  <li className="pl-2">Click <strong>"Copy"</strong> or <strong>"Download"</strong> button above</li>
                  <li className="pl-2">Go to <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-indigo-600">Overleaf.com</a></li>
                  <li className="pl-2">Create a <strong>new blank project</strong></li>
                  <li className="pl-2">Paste or upload the LaTeX code</li>
                  <li className="pl-2">Click <strong>"Recompile"</strong> to generate your PDF</li>
                </ol>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    LaTeX Source Code
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => eceData.latex_report && copyToClipboard(eceData.latex_report, "latex-code")}
                    className="text-xs"
                  >
                    {copiedTab === "latex-code" ? (
                      <>
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative group">
                  <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-5 rounded-xl overflow-x-auto text-xs max-h-[500px] border border-slate-700 shadow-lg scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500">
                    <code className="font-mono leading-relaxed">{eceData.latex_report || "% No LaTeX report available"}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
