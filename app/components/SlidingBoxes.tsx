import Image from "next/image";
import { motion, Variants } from "framer-motion";

const norm: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.2 },
};
interface SlideValues {
  values: [string, string][];
  //   width: number
  //   height: number
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
            className="flex flex-col justify-center  items-center bg-gray-700 text-white rounded-3xl mx-3 hover:shadow-md hover:shadow-blue-500 w-md p-4"
          >
            <Image
              src={img_url}
              alt={img_desc}
              width={100}
              height={100}
              className="my-5"
            />
            <p>{img_desc}</p>
          </div>
        );
      })}
    </motion.div>
  );
}
