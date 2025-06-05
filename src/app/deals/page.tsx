"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Deal = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  endsAt: string;
};

const deals: Deal[] = [
  {
    id: 1,
    name: "Classic Leather Sneakers",
    price: 12000,
    oldPrice: 16000,
    image: "/e8bb090c798f3ac09f7a64d8e8697b45.jpg",
    badge: "25% OFF",
    endsAt: "2025-06-10T23:59:59",
  },
  {
    id: 2,
    name: "Street Style Canvas",
    price: 9500,
    oldPrice: 12000,
    image: "/06b4520222b6824466bac6bebd1fcd44.jpg",
    badge: "FLASH DEAL",
    endsAt: "2025-06-06T12:00:00",
  },
  {
    id: 3,
    name: "Leather Sandal",
    price: 7000,
    oldPrice: 12000,
    image: "/a5cf2475142fa9271439b692db75a630.jpg",
    badge: "Get Now",
    endsAt: "2025-06-06T13:00:00",
  },
  {
    id: 4,
    name: "Leather Shoe",
    price: 5000,
    oldPrice: 10000,
    image: "/4222b3e38e32630b7510ef61e6c54f36.jpg",
    badge: "25% OFF",
    endsAt: "2025-06-06T13:00:00",
  },
];

function useCountdown(targetDate: string): [number, number, number] {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [hours, minutes, seconds];
}

function Countdown({ endsAt }: { endsAt: string }) {
  const [isClient, setIsClient] = useState(false);
  const [hours, minutes, seconds] = useCountdown(endsAt);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <>Loading...</>;

  return (
    <>Ends in: {hours}h {minutes}m {seconds}s</>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative">
        <Image
          src={deal.image}
          alt={deal.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {deal.badge}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {deal.name}
        </h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-green-600 font-bold">
            ₦{deal.price.toLocaleString()}
          </span>
          <span className="line-through text-gray-400">
            ₦{deal.oldPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mt-2">
            <Countdown endsAt={deal.endsAt} />
          </p>
          <Link href="/list">
            <button className="p-2 text-white bg-found rounded-md">Get Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DealsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-200 py-12 px-6 mt-[23%] md:mt-0">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-black mb-10 flex justify-center items-center">
        <p className="animate-bounce">🔥</p> <p>Hot Deals</p>
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </main>
  );
}
