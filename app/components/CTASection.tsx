import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: "default" | "dark";
}

export default function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = "default"
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
          <p className={`text-xl mb-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {description}
          </p>

          {/* center both axes, stack on mobile and row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={primaryCTA.href} className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group w-full sm:w-auto mx-auto px-6 sm:px-8 py-4 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                  isDark
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            {secondaryCTA && (
              <Link href={secondaryCTA.href} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto mx-auto px-6 sm:px-8 py-4 font-semibold rounded-xl transition-all duration-200 border ${
                    isDark
                      ? 'border-slate-700 text-white hover:bg-slate-800'
                      : 'border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {secondaryCTA.text}
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
