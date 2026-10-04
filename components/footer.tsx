import Link from "next/link";

const links = [
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-main">
          <div>
            <Link
              aria-label="Boonvet Formulations home"
              className="footer-brand"
              href="/"
            >
              Boonvet Formulations
            </Link>
            <p className="footer-contact mt-4">
              Animal feed supplements and nutrition products
              <br />
              Saharanpur, Uttar Pradesh, India
            </p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <nav aria-label="Footer navigation" className="footer-links mt-4">
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
            <p className="footer-heading">Product enquiries</p>
            <p className="footer-contact mt-4">
              Call us on 07942720013 or contact us about the product catalogue.
            </p>
            <Link
              className="footer-contact-link mt-3 inline-flex"
              href="/contact"
            >
              Get in touch <span className="ml-2" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Boonvet Formulations. All rights reserved.</p>
          <Link className="footer-admin-link" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
