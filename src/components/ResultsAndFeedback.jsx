import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ResultsAndFeedback({ result, onSubmitFeedback }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    onSubmitFeedback?.(feedback);
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section className="w-full bg-[#08110c]" id="results">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white/[0.04] p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-white">Diagnosis</h3>
            <AnimatePresence mode="popLayout">
              {result ? (
                <motion.div
                  key="has-result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-5 space-y-4 text-sm leading-relaxed text-white/80"
                >
                  <div>
                    <span className="font-semibold text-white">Condition: </span>
                    {result.condition}
                  </div>
                  <div>
                    <span className="font-semibold text-white">Confidence: </span>
                    {Math.round(result.confidence * 100)}%
                  </div>
                  <div>
                    <span className="font-semibold text-white">Symptoms: </span>
                    {result.symptoms}
                  </div>
                  <div>
                    <span className="font-semibold text-white">Recommended Treatment: </span>
                    {result.treatment}
                  </div>
                  <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-lime-500/10 p-3 text-xs text-white/70 ring-1 ring-white/10">
                    Preview result — connect your Edge Function for live AI and region-aware guidance.
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="no-result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-5 text-sm text-white/70"
                >
                  No analysis yet. Upload a photo and run analysis to see results.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl bg-white/[0.04] p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-white">Share your feedback</h3>
            <p className="mt-1 text-sm text-white/70">Help us grow more resilient, low-impact plant care.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
                placeholder="Share what worked, what didn’t, or any eco-friendly tip."
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">We value constructive, respectful feedback.</span>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-lime-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:brightness-110"
                >
                  Submit
                </button>
              </div>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-end gap-2 text-right text-xs font-medium text-emerald-300"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Thanks for your feedback!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
