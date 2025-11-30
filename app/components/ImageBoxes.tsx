import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

interface SlideValues {
  values: [string, string][];
  width?: number;
  margin_x?: number;
}

export default function SlidingBoxes({
  image_list,
}: {
  image_list: SlideValues;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Adjust based on your card width
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Scrollable Container */}
      <motion.div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {image_list.values.map((each_image, index) => {
          const [img_url, img_desc] = each_image;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.2 } 
              }}
              className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                <Image
                  src={img_url}
                  alt={img_desc}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <p className="text-slate-700 font-medium line-clamp-2">
                  {img_desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-slate-50 transition-all duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-slate-700" />
        </motion.button>
        
        <motion.button
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-slate-50 transition-all duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-slate-700" />
        </motion.button>
      </div>
    </div>
  );
}