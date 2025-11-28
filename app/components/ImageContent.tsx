import { animate, motion, Variants } from "framer-motion";
import Image from "next/image";

interface ImageContent {
  image_src: string;
  content: string;
}
const norm: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const resize: Variants = {
  initial: { opacity: 0 , scale: 0},
  animate: { opacity: 1 , scale: 1},
};

export default function ImageContents(content: ImageContent) {
  return (
    <motion.div
      variants={norm}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-4 mx-50 items-center"
    >
      <div className="font-semibold text-black text-xl">
      {content.content}
      </div>
      <motion.div
      className="relative m-2 h-100 w-full"
      variants={resize}
      initial = "initial"
      animate = "animate">
        <Image src={content.image_src} alt="NO img" fill className="object-cover rounded-br-[100px]" />
      </motion.div>
    </motion.div>
  );
}
