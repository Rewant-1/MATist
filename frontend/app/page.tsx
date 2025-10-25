"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Zap, BookOpen, FileText, Download, Sparkles, ArrowRight, CheckCircle2, Lightbulb, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Theory",
      description: "Detailed theoretical explanations for every ECE topic with formulas, diagrams, and concepts.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Code,
      title: "Dual Implementation",
      description: "Get both basic (brute-force) and optimized MATLAB code with complete line-by-line explanations.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Optimized Solutions",
      description: "Learn vectorization, built-in functions, and performance optimization techniques.",
      gradient: "from-sky-500 to-blue-500"
    },
    {
      icon: FileText,
      title: "LaTeX Reports",
      description: "Professional academic reports ready for Overleaf - includes theory, code, plots, and analysis.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Download,
      title: "Export Everything",
      description: "Download complete LaTeX files, copy code snippets, and save your entire practical.",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Instant Generation",
      description: "Get complete practicals in 20-40 seconds - theory, code, explanations, and reports!",
      gradient: "from-indigo-500 to-sky-500"
    }
  ];

  const popularTopics = [
    "Convolution of two signals",
    "Fast Fourier Transform (FFT)",
    "FIR Filter Design",
    "Amplitude Modulation & Demodulation",
    "Sampling and Aliasing",
    "IIR Filter Design"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Code className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mb-4"
          >
            ECE MATLAB Helper
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Get complete ECE MATLAB practicals in seconds - Theory, Dual Implementations, Explanations & LaTeX Reports
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/ece-practical">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-200 px-8 py-6 text-lg group">
                <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Generate Complete Practical
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-200 dark:hover:border-cyan-800 group">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Q&A Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-teal-500" />
                Quick Questions & Answers
              </CardTitle>
              <CardDescription>
                Have a simple question? Get instant answers without generating a full practical
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Perfect for quick clarifications, concept explanations, or debugging help.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What is the difference between FFT and DFT?",
                    "How does sampling rate affect signal quality?",
                    "Explain amplitude modulation in simple terms",
                    "What are the applications of convolution?"
                  ].map((question, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <HelpCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {question}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/chat">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Q&A Chat
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                Popular Practical Topics
              </CardTitle>
              <CardDescription>
                Click any topic to get started instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularTopics.map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <Link href={`/ece-practical?topic=${encodeURIComponent(topic)}`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-4 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:border-cyan-300 dark:hover:border-cyan-700 group"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-3 text-cyan-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Enter Topic", desc: "Type your ECE practical topic" },
              { step: "2", title: "AI Generation", desc: "Our AI generates complete content" },
              { step: "3", title: "Review Tabs", desc: "Explore theory, code & explanations" },
              { step: "4", title: "Download Report", desc: "Get LaTeX report for submission" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 border-0 shadow-2xl">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to create your ECE practical?
              </h3>
              <p className="text-cyan-100 mb-6">
                Get theory, dual implementations, detailed explanations, and professional LaTeX reports in 20-40 seconds!
              </p>
              <Link href="/ece-practical">
                <Button className="bg-white text-teal-600 hover:bg-cyan-50 shadow-xl px-8 py-6 text-lg group">
                  <Code className="h-5 w-5 mr-2" />
                  Start Generating Now
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
