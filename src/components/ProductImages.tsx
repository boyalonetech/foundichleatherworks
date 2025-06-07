"use client";

import Image from "next/image";
import { useState } from "react";

// const images = [
//   { id: 1, src: "/d75797127382bb43ca47e161230dbbfe.jpg", alt: "image1" },
//   { id: 2, src: "/a5cf2475142fa9271439b692db75a630.jpg", alt: "image2" },
//   { id: 3, src: "/86e9ddd81e81b2a8ba32deffd122390e.jpg", alt: "image3" },
//   { id: 4, src: "/9062a50652fd552448ec72ac8eea2b89.jpg", alt: "image4" },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt="product"
          width={1000}
          height={1000}
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 md:mt-6">
        {items.map((item: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 md:mt-0 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt="product"
              width={500}
              height={500}
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
