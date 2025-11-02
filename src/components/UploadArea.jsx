import React, { useCallback, useRef, useState } from 'react';
import { Image as ImageIcon, RefreshCw, Sparkles, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadArea({ onFileSelected, onAnalyze, isAnalyzing, canAnalyze, onReset, previewUrl }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const handleBrowse = () => inputRef.current?.click();

  return (
    <section className="relative w-full bg-[#08110c]" id="upload">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            'group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition',
            isDragging ? 'border-emerald-400/60 bg-white/5' : 'border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]'
          ].join(' ')}
          onClick={handleBrowse}
        >
          <motion.div
            initial={false}
            animate={{ scale: isDragging ? 1.02 : 1 }}
            className="absolute inset-0 rounded-3xl ring-1 ring-white/10"
          />

          <AnimatePresence mode="popLayout">
            {previewUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex w-full flex-col items-center gap-5"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10">
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-contain" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(132,204,22,0.2),transparent_40%)]"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onAnalyze(); }}
                    disabled={!canAnalyze || isAnalyzing}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4" /> {isAnalyzing ? 'Analyzing…' : 'Analyze Photo'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onReset(); }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4" /> Choose another image
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="drop"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex max-w-xl flex-col items-center"
              >
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-inset ring-white/10">
                  <ImageIcon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-white">Drag & drop your plant photo here</h3>
                <p className="mt-1 text-sm text-white/70">or click to browse</p>
                <p className="mt-3 text-xs text-white/50">Supported: JPG, PNG, HEIC</p>
              </motion.div>
            )}
          </AnimatePresence>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type.startsWith('image/')) {
                onFileSelected(file);
              }
            }}
          />

          {/* Glow border */}
          <motion.div
            aria-hidden
            animate={{ opacity: isDragging ? 0.6 : 0.25 }}
            className="pointer-events-none absolute inset-0 -z-0 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-lime-500/20 to-teal-400/20 blur-2xl"
          />
        </motion.div>

        {isAnalyzing && (
          <div className="mx-auto mt-4 flex max-w-2xl items-center gap-3 text-sm text-white/80">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-1.5 w-1/3 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500"
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            Processing on the edge…
          </div>
        )}
      </div>
    </section>
  );
}
