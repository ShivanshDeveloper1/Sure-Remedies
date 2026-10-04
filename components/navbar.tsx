"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/about", label: "About us" },
  { href: "/products", label: "Our products" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="page-container topbar-inner">
          <nav aria-label="Quick links" className="topbar-links">
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <a href="tel:07942720013">
            <span className="topbar-location">Saharanpur, Uttar Pradesh</span>
            <span className="topbar-separator" aria-hidden="true"> · </span>
            07942720013
          </a>
        </div>
      </div>
      <div className="brand-header">
        <Link aria-label="Boonvet Formulations home" className="brand-logo" href="/">
          <Image
            alt="Boonvet Formulations"
            height={150}
            priority
            src="/logo.png"
            width={150}
          />
        </Link>
      </div>
      <div className="navigation-bar">
        <div className="page-container navigation-inner">
          <nav aria-label="Main navigation" className="desktop-navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="navigation-cta" href="/products">
            Explore products <span aria-hidden="true">↗</span>
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          aria-label="Mobile navigation"
          className={`mobile-navigation${menuOpen ? " is-open" : ""}`}
          id="mobile-navigation"
          aria-hidden={!menuOpen}
        >
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
