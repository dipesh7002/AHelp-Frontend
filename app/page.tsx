"use client";

import Flower from "@/public/images/flower-8625039.png";
import Kindle from "@/public/images/pexels-kindelmedia-7054782.jpg";
import NavBar from "./components/NavBar";
import SlidingBoxes from "./components/ImageBoxes";

const my_iamge: [string, string][] = [
  [Flower.src, "flower is good"],
  [Kindle.src, "Kindle is bad"],
];

export default function Home() {
  return (
    <div className="relative h-screen">
            <NavBar />
            <SlidingBoxes image_list={{values: my_iamge}} />
      <div className="absolute inset-0">
        <div className="relative h-full w-full [&>div]:absolute [&>div]:bottom-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-b [&>div]:from-blue-200 [&>div]:to-white">
        <div>
</div>
        </div>
      </div>
    </div>
  );
}
