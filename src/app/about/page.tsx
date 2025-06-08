import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  FaLeaf,
  FaStar,
  FaGlobe,
  FaHandshake,
  FaAward,
  FaClock,
  FaRegStar,
} from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <main className="mt-16 md:mt-0 min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-neutral-900 px-4 sm:px-6 md:px-16 lg:px-32 py-10">
      {/* HERO */}
      <section className="relative mb-16">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-found opacity-20 rounded-full mix-blend-multiply animate-pulse" />
        <div className="relative z-10 text-center px-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Foundich <span className="text-found">Leather</span> Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Crafting luxury, one stitch at a time.
          </p>
        </div>
      </section>

      {/* OVERLAP IMAGE PANEL */}
      <section className="relative mb-20 sm:mb-24">
        <div className="relative z-10 w-full max-w-xl mx-auto px-2">
          <Image
            src="/Asset 3@3x.png"
            width={1000}
            height={800}
            quality={90}
            alt="Handcrafted Leather"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* INFO GRID */}
      <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-20">
        {[
          {
            icon: <FaLeaf size={28} className="text-white" />,
            title: "Sustainable Craft",
            text: "Eco-friendly tanning & solar-powered workshops.",
          },
          {
            icon: <FaStar size={28} className="text-white" />,
            title: "Premium Quality",
            text: "Hand-stitched by master artisans.",
          },
          {
            icon: <FaGlobe size={28} className="text-white" />,
            title: "Global Vision",
            text: "Celebrating African heritage worldwide.",
          },
          {
            icon: <FaHandshake size={28} className="text-white" />,
            title: "Community First",
            text: "Supporting local artisans & fair trade.",
          },
          {
            icon: <FaAward size={28} className="text-white" />,
            title: "Award Winning",
            text: "Recognized for excellence in design.",
          },
          {
            icon: <FaClock size={28} className="text-white" />,
            title: "Timeless Design",
            text: "Classic styles that never go out of fashion.",
          },
        ].map((block, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-6 pt-16 shadow hover:shadow-[0px_5px_20px_rgba(0,0,0,0.3)] transition-shadow"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-found text-white p-4 rounded-full">
              {block.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
              {block.title}
            </h3>
            <p className="text-center text-gray-600 leading-relaxed">
              {block.text}
            </p>
          </div>
        ))}
      </section>

      {/* OUR VALUES */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-found">
          Our Core Values
        </h2>
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 px-2">
          {[
            {
              title: "Integrity",
              desc: "Honesty and transparency in every stitch.",
            },
            {
              title: "Innovation",
              desc: "Continuously refining our craft.",
            },
            {
              title: "Sustainability",
              desc: "Respect for people and planet.",
            },
          ].map((v, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow">
              <h3 className="text-2xl font-semibold mb-2 text-center">
                {v.title}
              </h3>
              <p className="text-gray-600 text-center">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mb-20 px-2 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-found">
          What Our Customers Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              name: "Amara Okeke",
              quote:
                "Absolutely stunning craftsmanship. My shoes feel like royalty!",
              avatar: "/photo-1700561791890-a15d45b9c79d.avif",
              rating: 5,
            },
            {
              name: "Chinedu Nwosu",
              quote:
                "Best leather shoes I've ever owned—durable and so comfortable.",
              avatar: "/photo-1654787707030-f716f370c602.avif",
              rating: 4,
            },
            {
              name: "Fatima Bello",
              quote: "Love the eco-friendly approach. Stylish and sustainable!",
              avatar: "/photo-1617244145995-f79f45448c5c.avif",
              rating: 5,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="w-full sm:w-80 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4 flex-col">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                  <Image
                    src={t.avatar}
                    width={500}
                    height={500}
                    alt={t.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-semibold mb-2">{t.name}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, idx) =>
                    idx < t.rating ? (
                      <FaStar key={idx} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={idx} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-found">
          Meet the Team
        </h2>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 team">
          {[
            { name: "Ucheben", role: "Operations", img: "/ucheben.jpg" },
            { name: "Victor", role: "Designer", img: "/emeka.jpg" },
            { name: "Divine", role: "Developer", img: "/divine.jpeg" },
            { name: "Precious", role: "Marketing Lead", img: "/pressy.jpg" },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={m.img}
                  layout="fill"
                  objectFit="cover"
                  alt={m.name}
                />
              </div>
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-gray-600">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="mt-20 bg-found text-white rounded-3xl px-6 py-12 sm:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-screen animate-pulse">
          <Image
            src="/Asset 3@3x.png"
            layout="fill"
            objectFit="cover"
            alt="Background"
          />
        </div>
        <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Ready to Step Up Your Style?
        </h2>
        <p className="relative mb-6 max-w-xl mx-auto">
          Discover our latest collection of handcrafted leather shoes—luxury
          that lasts.
        </p>
        <Link href="/list">
          <button className="relative bg-white text-found font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
            Shop Now
          </button>
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
