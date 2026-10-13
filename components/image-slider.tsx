"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/Booncal_home.jpeg",
    alt: "Boonvet Formulations animal nutrition products",
    eyebrow: "Animal Nutrition",
    title: "Nourishing Healthier Livestock",
    subtitle: "Science-backed feed formulations for stronger, more productive animals.",
  },
  {
    src: "/Booncal_Homepage.jpeg",
    alt: "Boonvet Formulations feed supplements and veterinary products",
    eyebrow: "Feed & Veterinary Care",
    title: "Trusted Supplements, Proven Results",
    subtitle: "Quality feed supplements and veterinary products you can rely on.",
  },
];

const INTERVAL = 6000;

export function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, current]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Boonvet Formulations highlights"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-zinc-950"
    >
      {/* Background images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" },
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <span className="inline-block mb-5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-emerald-300">
                {slide.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                {slide.title}
              </h1>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-200/90 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore Products
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrow buttons (hidden on small screens, swipe instead) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        type="button"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-zinc-900 transition-all duration-300"
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        type="button"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-zinc-900 transition-all duration-300"
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress indicators + counter */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-6 sm:px-8 lg:px-12 mx-auto max-w-7xl flex items-center gap-6">
        <div className="flex gap-3 flex-1" role="tablist" aria-label="Slide indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              type="button"
              className="relative h-1 flex-1 max-w-24 overflow-hidden rounded-full bg-white/30"
            >
              {i === current && (
                <motion.span
                  key={`progress-${current}`}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              )}
              {i < current && <span className="absolute inset-0 bg-white rounded-full" />}
            </button>
          ))}
        </div>
        <span className="text-sm font-medium text-white/80 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}