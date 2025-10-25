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
    efficient_code?: string;
    efficient_explanation?: string;
    optimization_applicable?: boolean;
    latex_report?: string;
  };
}

export function PracticalTabs({ eceData }: PracticalTabsProps) {
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null);

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

  return (
    <div className="w-full mt-4">
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger 
            value="theory" 
            className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Theory</span>
          </TabsTrigger>
          <TabsTrigger 
            value="basic" 
            className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Basic Code</span>
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            disabled={!eceData.optimization_applicable}
          >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
          <TabsTrigger 
            value="latex" 
            className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">LaTeX</span>
          </TabsTrigger>
        </TabsList>

        {/* Theory Tab */}
        <TabsContent value="theory" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    Theory Explanation
                  </CardTitle>
                  <CardDescription>Understand the fundamental concepts</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.theory && copyToClipboard(eceData.theory, "theory")}
                >
                  {copiedTab === "theory" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {eceData.theory || "No theory available"}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Basic Code Tab */}
        <TabsContent value="basic" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-teal-600" />
                    Basic Implementation
                  </CardTitle>
                  <CardDescription>Well-commented MATLAB code for beginners</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.brute_force_code && copyToClipboard(eceData.brute_force_code, "basic")}
                >
                  {copiedTab === "basic" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Code */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  MATLAB Code:
                </h4>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{eceData.brute_force_code || "No code available"}</code>
                </pre>
              </div>

              {/* Explanation */}
              {eceData.brute_force_explanation && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Step-by-Step Explanation:
                  </h4>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {eceData.brute_force_explanation}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Code Tab */}
        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-teal-600" />
                    Optimized Implementation
                  </CardTitle>
                  <CardDescription>Performance-optimized version with improvements</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => eceData.efficient_code && copyToClipboard(eceData.efficient_code, "advanced")}
                >
                  {copiedTab === "advanced" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {eceData.optimization_applicable ? (
                <>
                  {/* Optimized Code */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                      Optimized MATLAB Code:
                    </h4>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{eceData.efficient_code || "No optimized code available"}</code>
                    </pre>
                  </div>

                  {/* Optimization Explanation */}
                  {eceData.efficient_explanation && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                        Optimization Details:
                      </h4>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {eceData.efficient_explanation}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Zap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No optimization applicable for this practical</p>
                  <p className="text-sm mt-1">The basic implementation is already optimal</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LaTeX Tab */}
        <TabsContent value="latex" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                    LaTeX Report
                  </CardTitle>
                  <CardDescription>Complete academic report ready for Overleaf</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eceData.latex_report && copyToClipboard(eceData.latex_report, "latex")}
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
                    onClick={downloadLatex}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                    📄 How to use this LaTeX report:
                  </p>
                  <ol className="list-decimal ml-5 space-y-1 text-teal-800 dark:text-teal-200">
                    <li>Click "Copy" or "Download" button above</li>
                    <li>Go to <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Overleaf.com</a></li>
                    <li>Create a new blank project</li>
                    <li>Paste or upload the LaTeX code</li>
                    <li>Click "Recompile" to generate your PDF</li>
                  </ol>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    LaTeX Source Code:
                  </h4>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs max-h-96">
                    <code>{eceData.latex_report || "No LaTeX report available"}</code>
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
