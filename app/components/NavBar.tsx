import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Button from "./Button";

const norm: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.2 },
};
export default function NavBar() {
  return (
    <div className="sticky top-0 z-50">
      <motion.div
        className="flex justify-between items-center bg-gray-900 text-slate-300 px-10 rounded-1xl"
        variants={norm}
        initial="hidden"
        animate="visible"
      >
        <div className="flex mx-20">
          <Link href="/newhome">
            <div className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/newhome">
            <div className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
              Services
            </div>
          </Link>
          <Link href="/about">
            <div className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
              About
            </div>
          </Link>
          <Link href="/writers">
            <div className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
              Writers
            </div>
          </Link>
        </div>
        <div>
          <div className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
            <Button text="Sign IN"/>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
