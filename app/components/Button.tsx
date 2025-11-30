import { motion, Variants } from "framer-motion";

const buttonVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Button({
  text,
  type = "button",
  color = "sky",
}: {
  text: string;
  type?: "button" | "submit" | "reset";
  color?: "blue" | "sky" | "red" | string;
}) {
  const colorClasses =
    {
      blue: "bg-blue-600 hover:bg-blue-700",
      sky: "bg-sky-800 hover:bg-sky-900",
      red: "bg-red-600 hover:bg-red-700",
      green: "bg-green-600 hover:bg-green-700",
    }[color] || "bg-sky-800 hover:bg-sky-900";

  return (
    <motion.button
      type={type}
      className={`rounded-4xl px-6 py-3 font-medium text-white cursor-pointer ${colorClasses}`}
      variants={buttonVariant}
      whileHover={{ scale: 1.1 }}
    >
      {text}
    </motion.button>
  );
}
