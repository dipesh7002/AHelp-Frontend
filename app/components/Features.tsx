import { motion } from "framer-motion";
import { Shield, Zap, DollarSign, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Expert-verified work that meets academic standards",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Get your work done on time, every time",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Student-friendly rates without compromising quality",
    color: "from-emerald-500 to-green-600"
  },
  {
    icon: Users,
    title: "Expert Helpers",
    description: "Qualified professionals across all subjects",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance whenever you need",
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: Award,
    title: "Satisfaction Promise",
    description: "Unlimited revisions until you're happy",
    color: "from-cyan-500 to-blue-600"
  }
];

export default function Features() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A complete platform designed for academic excellence
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {/* Card */}
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

                {/* Subtle Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}