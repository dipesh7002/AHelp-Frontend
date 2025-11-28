"use client";

import Flower from "@/public/images/flower-8625039.png";
import Kindle from "@/public/images/pexels-kindelmedia-7054782.jpg";
import Circles from "@/public/images/circles-1609456.jpg";
import Lee from "@/public/images/pexels-jy-lee-438370-1137752.jpg";
import Mht from "@/public/images/pexels-mht01001-13138598.jpg";

import NavBar from "./components/NavBar";
import SlidingBoxes from "./components/ImageBoxes";
import ImageContents from "./components/ImageContent";

const my_iamge: [string, string][] = [
  [Flower.src, "flower is good"],
  [Kindle.src, "Kindle is bad"],
  [Circles.src, "Circles"],
  [Lee.src, "JPT"],
  [Mht.src, "JPT 2"],
];

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white">
      <NavBar />
      <SlidingBoxes image_list={{ values: my_iamge }} />
      <ImageContents image_src={Flower.src} content="Flower all around" />

      </div>
    </div>
  );
}
