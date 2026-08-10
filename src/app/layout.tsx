import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priordate - U.S. Green Card Pipeline Transparency",
  description:
    "Open-source transparency platform tracking U.S. green card pipeline data from DOL PERM, LCA, and USCIS I-140 statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="relative w-full flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
