"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, TrendingUp, Zap, Radio } from "lucide-react";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-0 px-4 overflow-hidden min-h-[100vh]">
        {/* Background Globe Wrapper - Restricted to Hero with padding */}
        <div className="absolute top-0 left-0 w-full h-full -z-50 opacity-40 pointer-events-none pt-32">
          <RotatingEarth />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Radio size={12} className="animate-pulse" />
            <span>HFTCode v1.0 Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
            Master the Algorithms of <br />
            <span className="text-primary block mt-2">Quantitative Finance</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The world&apos;s first competitive coding platform dedicated to quantitative finance, market microstructure, and algorithmic execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/problems">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Start Solving <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/blogs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg bg-white/5 text-foreground font-semibold border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Read Research
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Floating UI Elements with Container Scroll */}
        <div className="w-full relative z-10 -mt-20">
          <ContainerScroll
            titleComponent={<></>}
          >
            <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/5 w-full h-full flex items-center justify-center">
              <div className="text-center w-full">
                <div className="grid grid-cols-3 gap-8 opacity-20 mb-8 max-w-2xl mx-auto">
                  <div className="h-24 bg-primary/20 rounded animate-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="h-24 bg-primary/20 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-24 bg-primary/20 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-muted-foreground font-mono text-2xl">High Frequency Execution Engine</p>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why HFTCode?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional coding platforms ignore the complexities of financial markets. We bridge the gap.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-yellow-400" />}
              title="Low Latency Focus"
              description="Optimize for nanoseconds. Problems focus on C++ efficiency, memory alignment, and lock-free structures."
            />
            <FeatureCard
              icon={<TrendingUp className="text-green-400" />}
              title="Real Market Data"
              description="Backtest your algorithms against replayed L3 data from real exchanges, not just random inputs."
            />
            <FeatureCard
              icon={<Code className="text-blue-400" />}
              title="Strategy, Not Just Algo"
              description="Move beyond sorting arrays. Implement market making, arbitrage, and execution strategies."
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
