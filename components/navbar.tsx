"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { WhatsAppLink } from "@/components/whatsapp-link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ overHero = false }: { overHero?: boolean }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Light text only when sitting over the dark hero and not scrolled yet
  const onDark = overHero && !isScrolled && !mobileMenuOpen;

  const textColor = onDark ? "text-white" : "text-zinc-800 dark:text-zinc-100";
  const linkColor = onDark ? "text-white/85 hover:text-white" : "text-zinc-600 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl px-5 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl shadow-lg shadow-zinc-900/5 border border-zinc-200/60 dark:border-zinc-800/60"
            : onDark
            ? "bg-transparent border border-transparent"
            : "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60"
        }`}
      >
        {/* Brand */}
   <Link href="/" className={`flex items-center gap-3 group ${textColor}`}>
  <span className="flex items-center justify-center size-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
    <Image
      src="/logo.png"
      alt="Boonvet logo"
      width={40}
      height={40}
      className="object-contain"
    />
  </span>

  <span className="font-extrabold text-xl tracking-tight">Boonvet</span>
</Link>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full text-sm font-medium ${
          onDark ? "bg-white/10 backdrop-blur-md border border-white/15" : "bg-zinc-100/70 dark:bg-zinc-900/70"
        }`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${linkColor} ${
                onDark ? "hover:bg-white/15" : "hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <WhatsAppLink
            message="Hello, I'd like to get in touch regarding Boonvet Formulations."
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-[#1a4d3c] text-white shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Chat with us
          </WhatsAppLink>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              onDark ? "text-white hover:bg-white/10" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-7xl mx-auto mt-3 p-3 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl flex flex-col gap-1"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl font-medium text-zinc-800 dark:text-zinc-100 hover:bg-emerald-50 dark:hover:bg-zinc-900 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <WhatsAppLink
              message="Hello, I'd like to get in touch regarding Boonvet Formulations."
              className="mt-2 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-[#1a4d3c] text-white font-semibold"
            >
              Chat with us
            </WhatsAppLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}