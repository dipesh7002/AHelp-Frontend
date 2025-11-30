import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content: "Found an amazing helper who not only completed my programming assignment but helped me understand the concepts. Highly recommend!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Business Major",
    content: "Fast turnaround and excellent quality. The pricing was very reasonable for a college student budget.",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Mathematics Student",
    content: "I was struggling with calculus until I found a helper here. Now I'm getting A's consistently!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-slate-600">
            Real experiences from real students
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-50 rounded-2xl p-8 relative"
            >
              <Quote className="w-10 h-10 text-blue-200 absolute top-6 left-6" />
              <div className="flex gap-1 mb-4 mt-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-slate-600 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}