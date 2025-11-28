import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const norm: Variants = {
  hidden: { opacity: 0, y: 50 },
    initial: { filter: "blur(10px)" },
  animate: {filter: "none" }
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
  return (
    <motion.div
      className="overflow-auto m-2 w-200"
      variants={norm}
      initial="initial"
      animate="animate"
      // whileHover="hover"
    >
      <div className="flex items-center">
        {image_list.values.map((each_image, index) => {
          const [img_url, img_desc] = each_image;
          return (
            <div
              key={index}
              className={`flex flex-col justify-center relative w-full items-center bg-white text-black 
           rounded-2xl cursor-pointer hover:shadow-lg
           ${image_list.width ? `w-${image_list.width}` : "w-md"}
           ${image_list.width ? `lh-${image_list.width}` : "h-md"}
           ${image_list.margin_x ? `mx-${image_list.margin_x}` : "mx-3"}`}
            >
              <Image
                src={img_url}
                alt={img_desc}
                width={100}
                height={100}
                className="object-cover w-md rounded-2xl h-md"
              />
              <p className="px-5">{img_desc}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-3 gap-4 hover:shadow-lg">
        <ChevronLeft size={32} className="cursor-pointer text-black" />
        <ChevronRight size={32} className="cursor-pointer text-black" />
      </div>
    </motion.div>
  );
}
