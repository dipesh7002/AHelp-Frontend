'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calculator, 
  BookOpen, 
  PenTool, 
  Code, 
  BarChart3,
  Clock,
  DollarSign,
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Essay Writing",
      description: "Well-structured essays with proper formatting and citations",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Research Papers",
      description: "Comprehensive research with credible sources and analysis",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Calculator,
      title: "Math & Science",
      description: "Step-by-step solutions with detailed explanations",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Code,
      title: "Programming",
      description: "Clean, documented code across multiple languages",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Statistical analysis and data visualization projects",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: PenTool,
      title: "Editing & Proofreading",
      description: "Professional review and refinement of your work",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Meet even the tightest deadlines with our efficient workflow",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: DollarSign,
      title: "Student Pricing",
      description: "Affordable rates designed specifically for student budgets",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Award,
      title: "Expert Quality",
      description: "Verified professionals ensuring top-tier work every time",
      color: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-40 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40" />
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-full text-indigo-700 font-medium shadow-sm">
                Comprehensive Academic Support
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
              Expert Help for
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Every Subject
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-light">
              Professional assistance delivered on time and within your budget
            </p>

            <Link href="/post-assignment">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-32 max-w-7xl mx-auto bg-gradient-to-b from-white to-slate-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              Our Services
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            What We Offer
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive support for every academic need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-white border border-slate-200/60 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <service.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Our Promise
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Why Students Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Quality, affordability, and reliability in every assignment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-white border border-slate-200/60 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Submit your assignment today and experience stress-free academic support
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/post-assignment">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Get Help Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/how-it-works">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}