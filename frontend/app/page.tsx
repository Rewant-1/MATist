"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Code, Zap, Activity, FileCode, ArrowDownToLine, Sparkles, ArrowRight, Cpu, Bot } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "@/components/ui/typewriter";
import ASMRStaticBackground from "@/components/asmr-static-background";
import { Testimonial } from "@/components/testimonial";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

export default function LandingPage() {
  const features = [
    {
      icon: Activity,
      title: "Theory & Foundations",
      description: "Complete theoretical explanations with formulas and concepts.",
    },
    {
      icon: Code,
      title: "Dual Implementation",
      description: "Basic and optimized MATLAB code with detailed commentary.",
    },
    {
      icon: Cpu,
      title: "Performance Optimized",
      description: "Learn vectorization and built-in function techniques.",
    },
    {
      icon: FileCode,
      title: "LaTeX Reports",
      description: "Publication-ready academic reports for Overleaf.",
    },
    {
      icon: ArrowDownToLine,
      title: "Export Ready",
      description: "Download complete files and code snippets instantly.",
    },
    {
      icon: Bot,
      title: "AI-Powered",
      description: "Generate complete practicals in 20-40 seconds.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Interactive ASMR Particle Background */}
      <ASMRStaticBackground />
      
      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center mb-32"
        >
          {/* Fully transparent hero - no border */}
          <div className="relative p-12 md:p-16">
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/30 text-indigo-300 text-sm mb-8">
                <Code className="w-4 h-4" />
                <span className="font-medium">Academic MATLAB Assistant</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
                MATist
              </h1>

              <div className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                <span>Generate MATLAB practicals with </span>
                <Typewriter
                  text={[
                    "theory and LaTeX reports.",
                    "optimized code solutions.",
                    "detailed explanations.",
                  ]}
                  speed={50}
                  deleteSpeed={30}
                  waitTime={3000}
                  className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent font-medium inline-block"
                  showCursor={true}
                  cursorChar="|"
                  cursorClassName="text-cyan-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/ece-practical">
                  <button className="group relative overflow-hidden px-8 py-4 rounded-full border border-white/20 hover:border-white/30 text-white font-medium transition-all duration-300 hover:scale-105">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent animate-pulse" />
                    </span>
                    <span className="relative flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate Practical
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link href="/chat">
                  <button className="px-8 py-4 rounded-2xl border border-white/20 hover:border-white/30 text-white font-medium transition-all duration-300">
                    Quick Q&A Chat
                  </button>
                </Link>
              </div>

              <p className="text-xs text-slate-500 mt-6 uppercase tracking-widest">Free • Just Login</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-slate-400 text-lg">Complete MATLAB practical generation in one place</p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            <BentoCard
              name="Theory & Foundations"
              className="col-span-3 lg:col-span-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
              }
              Icon={Activity}
              description="Complete theoretical explanations with formulas, diagrams, and concepts for every ECE topic."
            />
            <BentoCard
              name="Dual Implementation"
              className="col-span-3 lg:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />
              }
              Icon={Code}
              description="Get both basic (brute-force) and optimized MATLAB code with complete line-by-line explanations."
            />
            <BentoCard
              name="Performance Optimized"
              className="col-span-3 lg:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
              }
              Icon={Cpu}
              description="Learn vectorization, built-in functions, and optimization techniques."
            />
            <BentoCard
              name="LaTeX Reports"
              className="col-span-3 lg:col-span-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              }
              Icon={FileCode}
              description="Professional academic reports ready for Overleaf - includes theory, code, plots, and comprehensive analysis."
            />
            <BentoCard
              name="Export Everything"
              className="col-span-3 lg:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
              }
              Icon={ArrowDownToLine}
              description="Download complete LaTeX files and copy code snippets instantly."
            />
            <BentoCard
              name="Instant Generation"
              className="col-span-3 lg:col-span-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10" />
              }
              Icon={Bot}
              description="Get complete practicals in 20-40 seconds - theory, code, explanations, and reports!"
            />
          </BentoGrid>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Simple Process
            </h2>
            <p className="text-slate-400 text-lg">Four steps to your complete practical</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Enter Topic", desc: "Describe your ECE practical" },
              { num: "02", title: "AI Generation", desc: "Our AI creates complete content" },
              { num: "03", title: "Review & Edit", desc: "Explore theory, code, and output" },
              { num: "04", title: "Export", desc: "Download LaTeX report" },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <Testimonial />
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 md:p-16 relative overflow-hidden">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
                Ready to Create?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Generate professional MATLAB practicals with theory, code, and LaTeX reports in seconds.
              </p>
              <Link href="/ece-practical">
                <button className="group relative overflow-hidden px-10 py-5 rounded-full border border-white/20 hover:border-white/30 text-white text-lg font-medium transition-all duration-300 hover:scale-105">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent animate-pulse" />
                  </span>
                  <span className="relative flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Start Generating Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
