import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Button from "./Button";
import { useState } from "react";

const norm: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const linkHover: Variants = {
  hover: { y: -2, transition: { duration: 0.2 } }
};

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 left-0 z-50">
      <motion.nav
        className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-4xl border border-slate-200/50"
        variants={norm}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center px-8 py-4">
          
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
              Assignment Helper
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/writers", label: "Writers" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className="px-5 py-2 text-slate-700 font-medium hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50 transition-colors"
                  variants={linkHover}
                  whileHover="hover"
                >
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/signin">
              <Button text="Sign In" />
            </Link>
            <Link href="/signin_helper">
              <Button text="Become Helper" color="green" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-0.5 bg-slate-700"></span>
            <span className="w-6 h-0.5 bg-slate-700"></span>
            <span className="w-6 h-0.5 bg-slate-700"></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden flex flex-col px-6 pb-4 gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/writers", label: "Writers" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="block py-2 text-slate-700 font-medium hover:text-blue-600">
                  {link.label}
                </span>
              </Link>
            ))}
            <Button text="Sign In" />
            <Button text="Become Helper" color="green" />
          </div>
        )}
      </motion.nav>
    </div>
  );
}
