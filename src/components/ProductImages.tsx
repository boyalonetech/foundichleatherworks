"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="h-[400px] sm:h-[450px] md:h-[500px] relative mb-6">
        <Image
          src={items[index].image?.url}
          alt="product"
          width={5000}
          height={5000}
          quality={90}
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {items.map((item: any, i: number) => (
          <div
            className="w-[22%] min-w-[80px] sm:min-w-[100px] h-24 sm:h-28 md:h-32 relative cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt={`product-${i}`}
              width={500}
              height={500}
              quality={90}
              className="object-cover w-full h-full rounded-md border-2 border-transparent hover:border-black transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
