import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingCTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Student */}
            <div className="p-10 border-r border-slate-200">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-slate-600">
                  Get your assignment done by expert helpers
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Affordable pricing for students</span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Quick turnaround time</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">100% satisfaction guaranteed</span>
                </div>
              </div>

              <Link href="/post-assignment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Post Assignment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>

            {/* Right Side - Helper */}
            <div className="p-10 bg-gradient-to-br from-emerald-50 to-green-50">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Expert Helper?
                </h3>
                <p className="text-slate-600">
                  Earn money by helping students succeed
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Flexible work schedule</span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Competitive earnings</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Secure payment system</span>
                </div>
              </div>

              <Link href="/signin_helper">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Become a Helper
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}