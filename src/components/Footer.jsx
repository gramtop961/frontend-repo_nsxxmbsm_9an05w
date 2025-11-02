import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#08110c]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_120%,rgba(16,185,129,0.15),transparent)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-center sm:flex-row">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-white/70"
        >
          © 2025 FloraSense. Greener growth, smarter care.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-white/50"
        >
          Built with renewable UX principles: fast, accessible, low-energy.
        </motion.p>
      </div>
    </footer>
  );
}
