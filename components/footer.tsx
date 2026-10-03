import Link from "next/link";

const links = [
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink py-12 text-white">
      <div className="page-container">
        <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <Link
              aria-label="Sure Remedies home"
              className="text-2xl font-semibold tracking-[-0.06em]"
              href="/"
            >
              Sure Remedies<span className="text-mint">.</span>
            </Link>
            <p className="mt-4 max-w-xs leading-7 text-white/60">
              Saharanpur, Uttar Pradesh, India
              <br />
              07942720013
              <br />
              GST No. 09ASGPA2476C1Z2
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-mint">Explore</p>
            <nav aria-label="Footer navigation" className="mt-4 grid gap-3">
              {links.map((link) => (
                <Link
                  className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-sm font-semibold text-mint">Have a question?</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              We&apos;d love to help you find just what you&apos;re looking for.
            </p>
            <Link
              className="mt-3 inline-flex text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href="/contact"
            >
              Get in touch <span className="ml-2" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sure Remedies . All rights reserved.</p>
          <Link className="transition-colors hover:text-white" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
