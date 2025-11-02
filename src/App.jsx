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

    // Simulated analysis preview. Replace with your Edge Function backend call.
    await new Promise((r) => setTimeout(r, 1300));
    setResult({
      condition: 'Early leaf spot (preview)',
      confidence: 0.9,
      symptoms: 'Small brown spots with pale halos; older leaves most affected.',
      treatment: 'Prune affected leaves, increase airflow, water at soil level, and prefer organic copper or bio-fungicides.'
    });

    setIsAnalyzing(false);
  };

  const handleSubmitFeedback = (text) => {
    // Connect to backend storage later
    console.log('Feedback:', text);
  };

  return (
    <div className="min-h-screen bg-[#08110c] text-white">
      <Hero onStart={handleStart} />
      <main>
        <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(16,185,129,0.14),transparent_60%)]" />
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
            {[
              {
                title: 'Capture',
                desc: 'Drop a clear photo of your plant leaf or stem.'
              },
              {
                title: 'Eco-Analyze',
                desc: 'AI detects diseases and stress with low-energy edge compute.'
              },
              {
                title: 'Sustain',
                desc: 'Get organic, water-wise treatment suggestions tailored to you.'
              }
            ].map((item, i) => (
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
