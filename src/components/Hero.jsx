import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#0b0b12]">
      {/* Spline scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft vignette and gradient overlays that don't block interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b12]/30 via-transparent to-[#0b0b12]" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_20%,rgba(162,98,255,0.25),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 text-center sm:pt-32">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-200/90 shadow-[0_0_0_1px_rgba(168,85,247,0.15)] backdrop-blur"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          AI Plant Diagnosis • Edge-powered
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display max-w-4xl bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl"
        >
          Lightning-fast plant care insights from a single photo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Upload, analyze, and get tailored treatment recommendations — all in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-purple-600/30 transition focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          >
            <span className="absolute inset-0 translate-y-10 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
            Start Analysis
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 shadow-sm backdrop-blur transition hover:bg-white/10"
          >
            Learn more
          </a>
        </motion.div>

        {/* Floating sparkles */}
        <div className="pointer-events-none absolute left-1/2 top-24 -z-0 -translate-x-1/2">
          <motion.div
            className="h-44 w-44 rounded-full bg-purple-500/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
