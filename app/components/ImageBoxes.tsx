import Image from "next/image";
import { motion, Variants } from "framer-motion";

const norm: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.2 },
};
interface SlideValues {
  values: [string, string][];
    width?: number
    height?: number
    margin_x?: number
}

export default function SlidingBoxes({
  image_list,
}: {
  image_list: SlideValues;
}) {
  return (
    <motion.div
      className="flex"
      variants={norm}
      initial="hidden"
      animate="visible"
    >
      {image_list.values.map((each_image, index) => {
        const [img_url, img_desc] = each_image;
        return (
          <div
            key={index}
            className={
          `flex flex-col justify-center items-center bg-white text-black 
           rounded-2xl cursor-pointer hover:shadow-lg
           ${image_list.width ? `w-${image_list.width}` : "w-md"}
           ${image_list.height ? `lh-${image_list.height}` : "h-md"}
           ${image_list.margin_x? `mx-${image_list.margin_x}`:"mx-3"}`
        }
          >
            <Image
              src={img_url}
              alt={img_desc}
              width={100}
              height={100}
              className="my-5"
            />
            <p className="px-5">{img_desc}</p>
          </div>
        );
      })}
    </motion.div>
  );
}
