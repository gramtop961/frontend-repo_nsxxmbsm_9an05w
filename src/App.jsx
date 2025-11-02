import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero.jsx';
import UploadArea from './components/UploadArea.jsx';
import ResultsAndFeedback from './components/ResultsAndFeedback.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const canAnalyze = useMemo(() => Boolean(file), [file]);

  const handleStart = () => {
    const el = document.getElementById('upload');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileSelected = (f) => {
    setFile(f);
    setResult(null);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    // Simulated analysis preview. Replace with a call to your Edge Function backend.
    await new Promise((r) => setTimeout(r, 1300));
    setResult({
      condition: 'Early leaf spot (preview)',
      confidence: 0.9,
      symptoms: 'Brownish circular spots with yellow halos on older leaves.',
      treatment: 'Remove affected leaves, improve air circulation, and apply a copper-based fungicide. Avoid overhead watering.'
    });

    setIsAnalyzing(false);
  };

  const handleSubmitFeedback = (text) => {
    // Hook up to backend to store feedback. For now, we just log it.
    console.log('Feedback:', text);
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <Hero onStart={handleStart} />
      <main>
        <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(236,72,153,0.14),transparent_60%)]" />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mb-6 text-center text-2xl font-semibold text-white"
          >
            How it works
          </motion.h2>
          <div className="relative z-10 grid gap-6 sm:grid-cols-3">
            {[{
              title: 'Upload',
              desc: 'Drop a photo of your plant leaves or stem.'
            }, {
              title: 'Analyze',
              desc: 'AI edge function inspects for diseases and stress.'
            }, {
              title: 'Treat',
              desc: 'Get tailored, step-by-step care recommendations.'
            }].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl bg-white/[0.04] p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur transition hover:bg-white/[0.06]"
              >
                <div className="mb-2 text-sm font-semibold text-white">{item.title}</div>
                <p className="text-sm text-white/70">{item.desc}</p>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </section>

        <UploadArea
          onFileSelected={handleFileSelected}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          canAnalyze={canAnalyze}
          onReset={handleReset}
          previewUrl={previewUrl}
        />

        <ResultsAndFeedback
          result={result}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </main>
      <Footer />
    </div>
  );
}
