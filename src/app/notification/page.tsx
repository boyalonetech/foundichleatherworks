// app/notifications/page.tsx

import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";

// ISR to revalidate every 60 seconds
export const revalidate = 172800;

// Utility to check if product was added in last 24 hours
const isNewProduct = (createdDate: string): boolean => {
  const now = new Date();
  const created = new Date(createdDate);
  const timeDiff = now.getTime() - created.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  return hoursDiff <= 24;
};

const NotificationPage = async () => {
  const wixClient = await wixClientServer();

  // Query: Get latest 10 products
  const productQuery = wixClient.products
    .queryProducts()
    .descending("lastUpdated") // Newest products first
    .limit(10);

  const res = await productQuery.find();
  const newProducts = res.items;

  return (
    <div className="mt-12 mb-12 space-y-6 px-4 max-w-2xl mx-auto md:max-w-[80%]">
      <h2 className="text-2xl font-bold text-center">🔔Notifications</h2>

      {newProducts.length === 0 ? (
        <p className="text-gray-600 text-center">No new products available.</p>
      ) : (
        <ul className="space-y-4">
          {newProducts.map((product: products.Product) => {
            const isNew = product._createdDate
              ? isNewProduct(
                  typeof product._createdDate === "string"
                    ? product._createdDate
                    : product._createdDate.toISOString()
                )
              : false;

            return (
              <li
                key={product._id}
                className="relative p-4 border border-gray-200 rounded-md shadow-sm bg-white hover:shadow-md transition"
              >
                <Link href={`/${product.slug}`} className="block">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        product.media?.mainMedia?.image?.url || "/product.png"
                      }
                      alt={product.name || "Product image"}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">
                          {product.name}
                        </h3>
                        {isNew && (
                          <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-found">
                        ₦{product.price?.price ?? "N/A"} • <span className="text-gray-700">Added on{" "}
                        {product._createdDate
                          ? new Date(product._createdDate).toLocaleDateString()
                          : "Unknown date"}</span> 
                      </p>
                    </div>
                  </div>
                  {isNew && (
                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
