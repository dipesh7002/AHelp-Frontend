import { motion } from "framer-motion";
import { Users, FileCheck, Clock, Star } from "lucide-react";

const stats = [
  { 
    icon: Users, 
    value: "10,000+", 
    label: "Active Helpers",
    color: "from-blue-500 to-cyan-600"
  },
  { 
    icon: FileCheck, 
    value: "50,000+", 
    label: "Assignments Completed",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    icon: Clock, 
    value: "98%", 
    label: "On-Time Delivery",
    color: "from-purple-500 to-indigo-600"
  },
  { 
    icon: Star, 
    value: "4.9/5", 
    label: "Average Rating",
    color: "from-amber-500 to-orange-600"
  }
];

export default function Stats() {
  return (
    <section className="py-32 px-6 bg-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              Proven Track Record
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Trusted Worldwide
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Join thousands of students achieving academic success
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mx-auto`}>
                    <stat.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                </div>

                {/* Value */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-slate-300 text-lg">
                    {stat.label}
                  </div>
                </div>

                {/* Top Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}