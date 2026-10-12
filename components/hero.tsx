"use client"
import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { motion } from "framer-motion";

type HeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  artwork?: boolean;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  artwork = false,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 home-hero">
      <div className="page-container home-hero-inner grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & Actions */}
        <motion.div 
          className="relative z-10 lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.p 
            className="home-hero-eyebrow flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="inline-block size-1.5 rounded-full bg-[--leaf-lt]"
              aria-hidden="true"
            />
            {eyebrow}
          </motion.p>
          
          <h1 className="home-hero-title mb-6">{title}</h1>
          <p className="home-hero-description mb-8">{description}</p>
          
          <div className="hero-actions flex flex-wrap items-center gap-4">
            <Link className="button-primary" href={primaryHref}>
              {primaryLabel} <span aria-hidden="true">↗</span>
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link className="button-outline" href={secondaryHref}>
                {secondaryLabel}
              </Link>
            ) : null}
            <WhatsAppLink
              className="text-link flex items-center gap-2"
              message="Hello, I'd like to learn more about Boonvet Formulations."
            >
              <span className="inline-block size-2 rounded-full bg-[#25d366]" aria-hidden="true" />
              Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </motion.div>

        {/* Right Column: Visual / Artwork */}
        {artwork ? (
          <motion.div
            aria-label="Boonvet Formulations animal nutrition and feed solutions"
            className="nutrition-visual lg:col-span-5 relative"
            role="group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <span className="nutrition-visual-orbit nutrition-visual-orbit-one" />
            <span className="nutrition-visual-orbit nutrition-visual-orbit-two" />
            <span className="nutrition-visual-mark" aria-hidden="true">B</span>
            <div className="nutrition-visual-caption">
              <div className="nutrition-visual-badge">
                <span className="nutrition-visual-dot" />
                Saharanpur, Uttar Pradesh
              </div>
              <span>BOONVET FORMULATIONS</span>
              <strong>
                Animal nutrition.
                <br />
                Thoughtfully made.
              </strong>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}