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
    },
    {
      icon: Code,
      title: "Dual Implementation",
      description: "Get both basic (brute-force) and optimized MATLAB code with complete line-by-line explanations.",
    },
    {
      icon: Zap,
      title: "Optimized Solutions",
      description: "Learn vectorization, built-in functions, and performance optimization techniques.",
    },
    {
      icon: FileText,
      title: "LaTeX Reports",
      description: "Professional academic reports ready for Overleaf - includes theory, code, plots, and analysis.",
    },
    {
      icon: Download,
      title: "Export Everything",
      description: "Download complete LaTeX files, copy code snippets, and save your entire practical.",
    },
    {
      icon: Sparkles,
      title: "Instant Generation",
      description: "Get complete practicals in 20-40 seconds - theory, code, explanations, and reports!",
    },
  ];

  const popularTopics = [
    "Convolution of two signals",
    "Fast Fourier Transform (FFT)",
    "FIR Filter Design",
    "Amplitude Modulation & Demodulation",
    "Sampling and Aliasing",
    "IIR Filter Design",
  ];

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Crimson Core Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #a51d35 16%, #7d1a2f 32%, #591828 46%, #3c1722 60%, #2a151d 72%, #1f1317 84%, #141013 94%, #0a0a0a 100%), radial-gradient(90% 75% at 50% 50%, rgba(228,42,66,0.06) 0%, rgba(228,42,66,0) 55%), radial-gradient(150% 120% at 8% 8%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(150% 120% at 92% 92%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(60% 50% at 50% 60%, rgba(240,60,80,0.06), rgba(0,0,0,0) 60%), #050505",
        }}
      />
      {/* Soft vignette to blend edges */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
          opacity: 0.95,
        }}
      />

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Code className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold tracking-tight text-white mb-4"
          >
            ECE MATLAB Helper
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Generate full-length MATLAB practicals with theory, dual implementations, detailed commentary, and polished LaTeX reports in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/ece-practical">
              <Button className="bg-white text-black hover:bg-gray-200 border border-white/20 px-8 py-6 text-lg font-semibold transition-all duration-200">
                <Sparkles className="h-5 w-5 mr-2 text-black" />
                Generate Complete Practical
                <ArrowRight className="h-5 w-5 ml-2 text-black" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

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
              <Card className="h-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="border border-white/10 bg-white/5 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-white">
                <MessageCircle className="h-6 w-6" />
                Quick Questions & Answers
              </CardTitle>
              <CardDescription className="text-white/60">
                Have a simple question? Get instant answers without generating a full practical.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-white/60">
                  Perfect for quick clarifications, concept refreshers, or debugging guidance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What is the difference between FFT and DFT?",
                    "How does sampling rate affect signal quality?",
                    "Explain amplitude modulation in simple terms",
                    "What are the applications of convolution?",
                  ].map((question) => (
                    <div
                      key={question}
                      className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <HelpCircle className="h-4 w-4 mt-0.5 text-white" />
                      <span className="text-sm text-white/80">{question}</span>
                    </div>
                  ))}
                </div>
                <Link href="/chat">
                  <Button className="w-full border border-white/20 bg-white text-black hover:bg-gray-200 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2 text-black" />
                    Start Q&A Chat
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border border-white/10 bg-white/5 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-white">
                <Lightbulb className="h-6 w-6" />
                Popular Practical Topics
              </CardTitle>
              <CardDescription className="text-white/60">
                Click any topic to launch a complete practical instantly.
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
                        className="group w-full justify-start rounded-xl border border-white/20 bg-transparent px-4 py-4 text-left text-white transition-colors hover:border-white/40 hover:bg-white/10"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-3 text-white group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-white">{topic}</span>
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Enter Topic", desc: "Type your ECE practical topic" },
              { step: "2", title: "AI Generation", desc: "Our AI builds the complete workflow" },
              { step: "3", title: "Review Tabs", desc: "Explore theory, code, and explanations" },
              { step: "4", title: "Download Report", desc: "Grab the LaTeX report for submission" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white text-2xl font-bold text-black shadow-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto border border-white/15 bg-white/5 text-white shadow-2xl">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to create your ECE practical?
              </h3>
              <p className="text-white/70 mb-6">
                Deliver polished MATLAB practicals with zero guesswork — from theory to LaTeX — in under a minute.
              </p>
              <Link href="/ece-practical">
                <Button className="bg-white text-black hover:bg-gray-200 border border-white/20 px-8 py-6 text-lg font-semibold transition-all duration-200">
                  <Code className="h-5 w-5 mr-2 text-black" />
                  Start Generating Now
                  <ArrowRight className="h-5 w-5 ml-2 text-black" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
