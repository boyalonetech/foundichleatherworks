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

// ✅ Add 12 deals
const deals: Deal[] = [
  { id: 1, name: "Classic Leather Sneakers", price: 12000, oldPrice: 16000, image: "/c51dd03d4a0ddb9bb9987b7e3290a335.jpg", badge: "25% OFF", endsAt: "2025-06-10T23:59:59" },
  { id: 2, name: "Street Style Canvas", price: 9500, oldPrice: 12000, image: "/e8bb090c798f3ac09f7a64d8e8697b45.jpg", badge: "FLASH DEAL", endsAt: "2025-06-06T12:00:00" },
  { id: 3, name: "Leather Sandal", price: 7000, oldPrice: 12000, image: "/d75797127382bb43ca47e161230dbbfe.jpg", badge: "Get Now", endsAt: "2025-06-06T13:00:00" },
  { id: 4, name: "Leather Shoe", price: 5000, oldPrice: 10000, image: "/86e9ddd81e81b2a8ba32deffd122390e.jpg", badge: "25% OFF", endsAt: "2025-06-06T13:00:00" },
  { id: 5, name: "Casual Loafers", price: 11000, oldPrice: 15000, image: "/8f8e77f9c66a661f9ddd0446706abeff.jpg", badge: "30% OFF", endsAt: "2025-06-06T13:00:00" },
  { id: 6, name: "Running Shoes", price: 14500, oldPrice: 17000, image: "/0ce2e017a06b119321d9a42b80185815.jpg", badge: "NEW", endsAt: "2025-06-06T13:00:00" },
  { id: 7, name: "High-Top Trainers", price: 16000, oldPrice: 19000, image: "/c51dd03d4a0ddb9bb9987b7e3290a335.jpg", badge: "LIMITED", endsAt: "2025-06-06T13:00:00" },
  { id: 8, name: "Ballet Flats", price: 8000, oldPrice: 10000, image: "/a5cf2475142fa9271439b692db75a630.jpg", badge: "HOT", endsAt: "2025-06-06T13:00:00" },
  { id: 9, name: "Winter Boots", price: 13500, oldPrice: 16000, image: "/be05f0913b3af9a607f3800284a5e384.jpg", badge: "STEAL", endsAt: "2025-06-06T13:00:00" },
  { id: 10, name: "Slip-ons", price: 9000, oldPrice: 11000, image: "/9062a50652fd552448ec72ac8eea2b89.jpg", badge: "BEST", endsAt: "2025-06-06T13:00:00" },
  { id: 11, name: "Oxford Leather", price: 15500, oldPrice: 20000, image: "/4222b3e38e32630b7510ef61e6c54f36.jpg", badge: "ELEGANT", endsAt: "2025-06-06T13:00:00" },
  { id: 12, name: "Suede Chukkas", price: 12500, oldPrice: 16000, image: "/8e743d387924ffb625420cd539dc3f29.jpg", badge: "CLASSIC", endsAt: "2025-06-06T13:00:00" },
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

function DealCard({ deal }: { deal: Deal }) {
  const [hours, minutes, seconds] = useCountdown(deal.endsAt);

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
            Ends in: {hours}h {minutes}m {seconds}s
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
  // ✅ Pick 4 random deals per day
  const today = new Date();
  const randomSeed = today.getDate(); // Ensures consistency per day
  const shuffled = [...deals].sort(() => 0.5 - Math.random()); // shuffle
  const dailyDeals = shuffled.slice(0, 4); // pick 4 random deals

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-200 py-12 px-6 mt-[23%] md:mt-0">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-black mb-10 flex justify-center items-center">
        <p className="animate-bounce">🔥</p> <p>Hot Deals</p>
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dailyDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </main>
  );
}
