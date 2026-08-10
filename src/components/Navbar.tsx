"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Cohort Finder", href: "/" },
    { name: "Employers", href: "/employers" },
    { name: "Trends", href: "/trends" },
    { name: "Methodology", href: "/methodology" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-surface/60 backdrop-blur-lg docked full-width top-0 sticky z-50 border-b border-white/10 shadow-xl shadow-surface/20">
      <div className="flex justify-between items-center w-full px-4 md:px-margin-lg max-w-container-max mx-auto h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-margin-sm group">
          <span className="font-sans text-headline-md font-bold text-primary group-hover:text-primary-container transition-colors">
            Priordate
          </span>
          <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
            Beta
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-gutter">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-body-md transition-colors py-1 ${
                  isActive
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com"
            target="_blank"
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-full font-sans text-body-md font-semibold hover:bg-primary-fixed-dim transition-all primary-glow hidden sm:flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>Open Source</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-sans text-body-lg py-2 ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
