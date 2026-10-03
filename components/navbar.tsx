import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-white/95 backdrop-blur">
      <div className="page-container flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 lg:min-h-[5.25rem] lg:flex-nowrap">
     
<Link
  aria-label="Boonvet Formulations home"
  className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
  href="/"
>
  {/* Logo */}
  <img
    src="/logo.png"
    alt="Boonvet Formulations"
    className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
  />

  {/* Brand name */}
  <span className="truncate text-base font-semibold tracking-[-0.04em] text-ink sm:text-[1.15rem]">
    Boonvet Formulations
  </span>
</Link>


        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-6 overflow-x-auto text-sm font-medium text-muted lg:order-none lg:w-auto lg:gap-9"
        >
          {links.map((link) => (
            <Link
              className="shrink-0 transition-colors hover:text-purple"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          className="rounded-full bg-purple px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-dark sm:px-5"
          href="/contact"
        >
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
