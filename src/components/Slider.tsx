"use client";

import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { use, useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "summer sale collection",
    description: "Sale up to 50% off",
    img: "/7f4bf4ff36ccc4b7424e6d5b24bf59c4.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-red-500",
  },
  {
    id: 2,
    title: "Winter sale collection",
    description: "Sale up to 50% off",
    img: "/07c7781c4b6b5e7abab6663b2a893405.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-white to-green-50",
  },
  {
    id: 3,
    title: "frost sale collection",
    description: "Sale up to 50% off",
    img: "/e8589163c4e02be787f946269bec8911.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-purple-50 to-blue-50",
  },

]; 

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="mt-20 md:mt-0 h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl ">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href="/list">
                <button className="rounded-md bg-black text-white py-3 px-4">
                  Shop Now
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION DOTS - Outside The Slide Loop */}
      <div className="absolute m-auto left-1/2 -translate-x-1/2 bottom-8 flex gap-4 z-10">
        {slides.map((_, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-black cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={index}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[7px] h-[7px] bg-black rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
