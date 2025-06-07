"use server";

import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProduct";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SinglePage({ params }: PageProps) {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", (await params)?.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-[5%] md:mt-2">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max mt-[35%] md:mt-1">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-8">
        <h1 className="text-4xl font-medium">{product.name}</h1>

        <div
          className="text-gray-900"
          dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
        />

        <div className="h-[2px] bg-gray-100" />

        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">₦{product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ₦{product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ₦{product.price?.discountedPrice}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />

        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100" />

        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-semibold mb-4">{section.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: section.description }} />
          </div>
        ))}
      </div>
    </div>
  );
}
