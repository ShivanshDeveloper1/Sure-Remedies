import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-main">
          {/* Brand column */}
          <div>
            <Link
              aria-label="Boonvet Formulations home"
              className="footer-brand inline-block"
              href="/"
            >
              <Image
                src="/logo.png"
                alt="Boonvet Formulations"
                width={90}
                height={90}
                className="mb-3 opacity-90"
                style={{ objectFit: "contain" }}
                unoptimized
              />
              <br />
              Boonvet Formulations
            </Link>
            <p className="footer-contact">
              Animal feed supplements and nutrition products.
              <br />
              Saharanpur, Uttar Pradesh, India.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="footer-heading">Explore</p>
            <nav aria-label="Footer navigation" className="footer-links mt-4">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="footer-heading">Product enquiries</p>
            <p className="footer-contact mt-4">
              Call us or send an enquiry about the current product catalogue.
              We are happy to help.
            </p>
            <div className="mt-4  gap-4 space-y-2">
              <p
             
                className="footer-contact-link block mr-4"
              >
                7017566608 
              </p>
              <p
           
                className="footer-contact-link block text-sm font-normal"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                boonvetformulations@gmail.com
              </p>
            </div>
            <Link
              className="footer-contact-link mt-3 inline-flex"
              href="/contact"
            >
              Get in touch <span className="ml-1.5" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Boonvet Formulations. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span style={{ color: "rgba(255,255,255,0.35)" }}>GST: 09CVMPA2410H1ZW</span>
            <Link className="footer-admin-link" href="/admin">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
