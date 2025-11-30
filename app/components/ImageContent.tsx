import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface ImageContent {
  image_src: string;
  content: string;
  imageOnRight?: boolean; // Optional prop to control image position
}

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function ImageContents({ 
  image_src, 
  content, 
  imageOnRight = true 
}: ImageContent) {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-7xl mx-auto px-6 py-16"
    >
      <div className={`grid md:grid-cols-2 gap-12 items-center ${!imageOnRight ? 'md:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <motion.div
          variants={fadeIn}
          className={`${imageOnRight ? 'md:order-1' : 'md:order-2'}`}
        >
          <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-medium">
            {content}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={scaleIn}
          className={`relative h-80 md:h-96 w-full rounded-3xl overflow-hidden shadow-xl group ${imageOnRight ? 'md:order-2' : 'md:order-1'}`}
        >
          <Image 
            src={image_src} 
            alt={content} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}