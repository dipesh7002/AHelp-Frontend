"use client";

import Image from "next/image";
import BGImage from "@/public/images/circles-1609456.jpg";
import Flower from "@/public/images/flower-8625039.png";
import Kindle from "@/public/images/pexels-kindelmedia-7054782.jpg";
import NavBar from "./components/NavBar";
import SlidingBoxes from "./components/SlidingBoxes";
import Button from "./components/Button";

const my_iamge: [string, string][] = [
  [Flower.src, "flower is good"],
  [Kindle.src, "Kindle is bad"],
];

export default function Home() {
  return (
    <div className="bg-black">
      <div>
        <NavBar />
      </div>
      <SlidingBoxes image_list={{ values: my_iamge }} />
      <div className="absolute top-0 left-0 -z-10">
        {/* <Image
          src={BGImage}
          alt="Background"
          width={BGImage.width}
          height={BGImage.height}
          priority
          quality={100}
        /> */}
      </div>
    </div>
  );
}
