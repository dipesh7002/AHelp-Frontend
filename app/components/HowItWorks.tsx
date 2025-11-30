import { motion } from "framer-motion";
import { Search, MessageSquare, CheckCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Post Your Assignment",
    description: "Share your requirements and deadline with our community of expert helpers"
  },
  {
    icon: MessageSquare,
    title: "Receive Proposals",
    description: "Get competitive bids from qualified helpers within minutes"
  },
  {
    icon: CheckCircle,
    title: "Choose & Collaborate",
    description: "Select the best helper and work together through our secure platform"
  },
  {
    icon: Sparkles,
    title: "Get Results",
    description: "Review, approve, and receive your completed assignment on time"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600">
            Connect with expert helpers in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent hidden md:block" 
                     style={{ display: index === 3 ? 'none' : 'block' }} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}