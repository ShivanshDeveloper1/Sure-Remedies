import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "@/components/site.css";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Boonvet Formulations | Animal Nutrition",
    template: "%s | Boonvet Formulations",
  },
  description:
    "Animal feed supplements and nutrition products from Boonvet Formulations, based in Saharanpur, Uttar Pradesh.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <WhatsAppButton />
        <Footer />

      </body>
    </html>
  );
}
