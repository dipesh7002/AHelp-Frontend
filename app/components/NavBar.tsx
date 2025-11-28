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
    <div className="sticky top-0 left-0">
      <motion.div
        className="flex justify-between items-center bg-slate-100 shadow-lg text-black px-10 rounded-4xl mb-5"
        variants={norm}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-5 mx-20">
          <Link href="/"> 
          <div className="px-10 my-10 hover:font-extrabold cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/newhome">
            <div className="px-10 my-10 hover:font-extrabold cursor-pointer">
              Services
            </div>
          </Link>
          <Link href="/about">
            <div className="px-10 my-10 hover:font-extrabold cursor-pointer">
              About
            </div>
          </Link>
          <Link href="/writers">
            <div className="px-10 my-10 hover:font-extrabold cursor-pointer">
              Writers
            </div>
          </Link>
        </div>
          <Link href="/signin" className="mx-10 my-10 hover:text-white hover:font-extrabold cursor-pointer">
            <Button text="Sign IN"/>
          </Link>
      </motion.div>
    </div>
  );
}
