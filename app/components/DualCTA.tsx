import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function DualCTA() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Students Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              For Students
            </h3>
            
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Get expert help with your assignments. Quality work at prices you can afford.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Choose from verified helpers
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Affordable, transparent pricing
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Guaranteed on-time delivery
              </li>
            </ul>

            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full px-6 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
              Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Helpers Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              For Helpers
            </h3>
            
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              Share your expertise and earn money helping students succeed.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Work on your own schedule
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Competitive, fair compensation
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Secure payment processing
              </li>
            </ul>

            <Link href="/signin_helper">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full px-6 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Become a Helper
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}