"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Zap, BookOpen, FileText, Download, Sparkles, ArrowRight, CheckCircle2, Lightbulb, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Typewriter } from "@/components/ui/typewriter";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

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

  const testimonials = [
    {
      author: {
        name: "Priya Sharma",
        role: "ECE Student, IIT Delhi",
      },
      text: "This tool saved me hours before my lab viva! The theory explanations are crystal clear and the MATLAB code is production-ready. Highly recommended!",
    },
    {
      author: {
        name: "Arjun Patel",
        role: "B.Tech ECE, BITS Pilani",
      },
      text: "I was struggling with FFT implementation until I found this. The dual code approach (basic + optimized) helped me understand the concepts deeply.",
    },
    {
      author: {
        name: "Sneha Reddy",
        role: "M.Tech Signal Processing, NIT Trichy",
      },
      text: "The LaTeX reports are perfectly formatted and saved me so much time. I can directly use them for my submissions without any modifications!",
    },
    {
      author: {
        name: "Rajesh Kumar",
        role: "ECE Final Year, VIT Vellore",
      },
      text: "Amazing resource! The Q&A chat feature is perfect for quick doubts, and the complete practical generator is a lifesaver during exam season.",
    },
    {
      author: {
        name: "Ananya Menon",
        role: "ECE Student, Anna University",
      },
      text: "The code explanations are so detailed that even complex topics like filter design became easy to understand. Best ECE helper tool ever!",
    },
    {
      author: {
        name: "Karthik Iyer",
        role: "B.E. ECE, COEP Pune",
      },
      text: "I love how it provides both brute-force and optimized code. It helped me learn MATLAB optimization techniques that I use in my projects now.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Cosmic Sparkle Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.08) 10%, transparent 55%),
            radial-gradient(circle at 50% 50%, #111 0%, #1a1a1a 100%)
          `,
          backgroundBlendMode: "soft-light",
          boxShadow: `inset 0 0 60px rgba(255, 255, 255, 0.3),
            inset 20px 0 80px rgba(255, 0, 255, 0.2),
            inset -20px 0 80px rgba(0, 255, 255, 0.2),
            inset 20px 0 300px rgba(255, 0, 255, 0.1),
            inset -20px 0 300px rgba(0, 255, 255, 0.1),
            0 0 50px rgba(255, 255, 255, 0.1),
            -10px 0 80px rgba(255, 0, 255, 0.1),
            10px 0 80px rgba(0, 255, 255, 0.1)`,
          filter: "contrast(1.05) brightness(1.05) blur(0.5px)",
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
            Generate full-length MATLAB practicals with{" "}
            <Typewriter
              text={[
                "theory, dual implementations, detailed commentary, and polished LaTeX reports in seconds.",
                "comprehensive explanations and production-ready code.",
                "step-by-step guides and academic reports.",
              ]}
              speed={40}
              deleteSpeed={20}
              waitTime={3000}
              className="text-teal-300 font-semibold"
              showCursor={true}
              cursorChar="|"
              cursorClassName="text-teal-400"
            />
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
              className="relative"
            >
              <GlowingEffect 
                proximity={200}
                spread={30}
                blur={20}
                variant="blue"
                disabled={false}
                glow={true}
              />
              <Card className="relative h-full bg-white/5 text-white border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20">
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
          className="max-w-4xl mx-auto mb-16 relative"
        >
          <GlowingEffect 
            proximity={200}
            spread={30}
            blur={20}
            variant="blue"
            disabled={false}
            glow={true}
          />
          <Card className="bg-white/5 text-white border-white/10 shadow-2xl hover:border-blue-400/30 hover:shadow-blue-500/20 transition-all duration-300">
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
                      className="flex items-start gap-2 rounded-lg bg-white/5 p-3"
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
          className="max-w-4xl mx-auto relative"
        >
          <GlowingEffect 
            proximity={200}
            spread={30}
            blur={20}
            variant="blue"
            disabled={false}
            glow={true}
          />
          <Card className="bg-white/5 text-white border-white/10 shadow-2xl hover:border-blue-400/30 hover:shadow-blue-500/20 transition-all duration-300">
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
                        className="group w-full justify-start rounded-xl bg-transparent px-4 py-4 text-left text-white transition-colors hover:border-white/40 hover:bg-white/10"
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

        <TestimonialsSection
          title="Loved by ECE Students Across India"
          description="Join thousands of students who have transformed their MATLAB practical experience"
          testimonials={testimonials}
          className="mt-24"
        />

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
                className="text-center relative"
              >
                <GlowingEffect 
                  proximity={150}
                  spread={25}
                  blur={15}
                  variant="blue"
                  disabled={false}
                  glow={true}
                />
                <div className="relative rounded-2xl bg-white/5 p-6 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl font-bold text-white shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="mt-16 text-center relative"
        >
          <GlowingEffect 
            proximity={200}
            spread={30}
            blur={20}
            variant="blue"
            disabled={false}
            glow={true}
          />
          <Card className="max-w-2xl mx-auto bg-white/5 text-white border-white/10 shadow-2xl hover:border-blue-400/30 hover:shadow-blue-500/20 transition-all duration-300">
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
