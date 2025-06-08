import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

interface Notification {
  id: number;
  message: string;
  time: string;
  productImage: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "Introducing the sleek Foundich Apex Leather Edition. Premium just got redefined.",
    time: "2m ago",
    productImage: "/0b112d45999d0b0539d726a7308c7823.jpg",
  },
  {
    id: 2,
    message: "🔥 Limited drop: Foundich Urban Trail now available in stone black.",
    time: "5m ago",
    productImage: "/0ce2e017a06b119321d9a42b80185815.jpg",
  },
  {
    id: 3,
    message: "A new wave of craftsmanship. Discover the Foundich Signature Low.",
    time: "9m ago",
    productImage: "/1e37710e7032f43371a5319a4cc6de79.jpg",
  },
  {
    id: 4,
    message: "✨ Just in: Camel suede boots made for royalty. Shop the Foundich Luxe.",
    time: "15m ago",
    productImage: "/4bb98181d5a10960ec98b94d8d32b4b7.jpg",
  },
  {
    id: 5,
    message: "Foundich Bold Edge – redefine your steps with confidence.",
    time: "30m ago",
    productImage: "/5b6bf11be578b246086a148a677c44df.jpg",
  },
  {
    id: 6,
    message: "Step out in gold. Foundich Monarch Drop now in stock.",
    time: "40m ago",
    productImage: "/5d312b613039692258431863f7b5f3c0.jpg",
  },
  {
    id: 7,
    message: "🧵 New arrivals: Hand-stitched leather perfection now live!",
    time: "1h ago",
    productImage: "/06b4520222b6824466bac6bebd1fcd44.jpg",
  },
  {
    id: 8,
    message: "👟 Reimagined for the bold – Foundich Crown Runners are here.",
    time: "2h ago",
    productImage: "/07c7781c4b6b5e7abab6663b2a893405.jpg",
  },
  {
    id: 9,
    message: "New drop alert 🚨: Forest Green high-cut elegance by Foundich.",
    time: "3h ago",
    productImage: "/7f4bf4ff36ccc4b7424e6d5b24bf59c4.jpg",
  },
  {
    id: 10,
    message: "Foundich Everyday Luxe – walk in excellence daily.",
    time: "4h ago",
    productImage: "/8e743d387924ffb625420cd539dc3f29.jpg",
  },
  {
    id: 11,
    message: "The artisan’s dream: Introducing Foundich Originals series.",
    time: "6h ago",
    productImage: "/8f8e77f9c66a661f9ddd0446706abeff.jpg",
  },
  {
    id: 12,
    message: "Foundich Vault: Rare classic styles are back for a limited time.",
    time: "7h ago",
    productImage: "/23cd0c7dd3378fed434d6f0ea2f2f38d.jpg",
  },
  {
    id: 13,
    message: "Sustainably stylish – explore our eco-conscious Foundich line.",
    time: "8h ago",
    productImage: "/37bc8623bc78dc5b7737639f566d46fd.jpg",
  },
  {
    id: 14,
    message: "Walk tall with the new Foundich Gladiator Series.",
    time: "10h ago",
    productImage: "/64e4ec8571a0cdfcac17d5178e6d5b3e.jpg",
  },
  {
    id: 15,
    message: "🌍 Designed for impact: Foundich Global Explorer boots.",
    time: "12h ago",
    productImage: "/64eb7d6cdf1ecc9171cbe42ff9e7f7e8.jpg",
  },
  {
    id: 16,
    message: "Sneakerheads unite: Foundich Vault Series Volume 2 released.",
    time: "15h ago",
    productImage: "/76a81544a1a34fb0faefbd5069bcc9e1.jpg",
  },
  {
    id: 17,
    message: "Minimalist perfection – Foundich Nude Tones just launched.",
    time: "16h ago",
    productImage: "/86e9ddd81e81b2a8ba32deffd122390e.jpg",
  },
  {
    id: 18,
    message: "Foundich anniversary drop: Signature Black + Gold available now.",
    time: "18h ago",
    productImage: "/95ffa5da70e13ea8c023b595a5255fba.jpg",
  },
  {
    id: 19,
    message: "Foundich goes rugged. Trailblazer series for the wild soul.",
    time: "19h ago",
    productImage: "/172abe3c66d74f66a7dd7a463439001a.jpg",
  },
  {
    id: 20,
    message: "New colorway just dropped: Desert Sun by Foundich. Limited stock!",
    time: "1d ago",
    productImage: "/9062a50652fd552448ec72ac8eea2b89.jpg",
  },
];

const NotificationPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Notifications | Foundich</title>
      </Head>

      <main className="bg-gray-100 min-h-screen py-10 px-4 flex justify-center">
        <div className="w-full max-w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              {/* Avatar */}
              <div className="mr-3">
                <Image
                  src="/foundich.png"
                  alt="Foundich Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              {/* Notification Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-black">Foundich</span> {notif.message}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span>{notif.time}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Link
                    href="/list"
                    className="text-sm text-lime-600 hover:text-lime-800 font-medium"
                  >
                    Shop Now
                  </Link>
                  <button className="text-xs text-gray-400 hover:text-gray-600 ml-auto">Mark as read</button>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="ml-3">
                <Image
                  src={notif.productImage}
                  alt="Product"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default NotificationPage;
