import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Button from "./Button";

const norm: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

const linkHover: Variants = {
  hover: { 
    y: -2,
    transition: {
      duration: 0.2
    }
  }
};

export default function NavBar() {
  return (
    <div className="sticky top-4 left-0 z-50">
      <motion.nav
        className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-4xl border border-slate-200/50"
        variants={norm}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center px-8 py-4">
          {/* Logo/Brand - Optional */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
                Assignment Helper
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://localhost:8000/auth/google/login/?process=login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button text="Sign In" />
            </a>

            <Link href="/signin_helper">
              <Button text="Become Helper" color="green" />
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}