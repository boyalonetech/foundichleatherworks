import Image from "next/image";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-10 md:px-16 lg:px-32 mt-[30%] md:mt-2">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-600">Foundich Leather Works</h1>

        <div className="">
            <Image src="/Asset 3@3x.png" height={100} width={100} alt="" className="w-[100%] mb-[20%]" />
        </div>

        <p className="text-lg mb-8">
          Welcome to <strong>Foundich Leather Works</strong>, where tradition meets innovation in every stitch.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Who We Are</h2>
            <p>
              At Foundich, we are passionate artisans dedicated to crafting premium, handmade leather footwear
              that stands the test of time. Based in Nigeria, our journey began with a simple vision: to redefine
              African craftsmanship through quality, elegance, and originality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">What We Do</h2>
            <p>
              We specialize in designing and producing handcrafted leather shoes that blend comfort, durability,
              and style. Each pair of shoes is meticulously made using the finest locally-sourced leather, designed
              to elevate your everyday look and complement any occasion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Our Mission</h2>
            <p>
              To empower the African fashion industry through world-class leather craftsmanship, offering affordable
              luxury to every customer while supporting local artisans and sustainable practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Our Vision</h2>
            <p>
              To become a globally recognized name in leather fashion by creating timeless pieces that represent
              African pride, creativity, and excellence.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
