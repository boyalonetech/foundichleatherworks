import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { decode } from "html-entities";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 12;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const page = parseInt(searchParams?.page || "1", 10); // default to page 1
  const offset = (page - 1) * (limit || PRODUCT_PER_PAGE);

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(offset); // ✅ fixed skip logic

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") productQuery.ascending(sortBy);
    if (sortType === "desc") productQuery.descending(sortBy);
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 mb-12 flex gap-x-8 gap-y-5 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={`/${product.slug}`}
          key={product._id}
          className="w-full sm:w-[45%] lg:w-[22%] shadow-[0_3px_5px_rgba(0,0,0,0.1)] p-4 rounded-2xl flex flex-col justify-between gap-4 h-[380px] overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative w-full h-[40%] min-h-[180px]">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt={product.name || "Product image"}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.media?.items?.[1]?.image?.url && (
              <Image
                src={product.media.items[1].image.url}
                alt={`${product.name} hover image`}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>

          {/* Name and Price */}
          <div className="flex justify-between text-sm font-medium">
            <span>{product.name}</span>
            <span className="font-semibold">₦{product.price?.price}</span>
          </div>

          {/* Short Description */}
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-600 overflow-hidden line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  decode(
                    product.additionalInfoSections.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  )
                ),
              }}
            />
          )}

          {/* Add to Cart */}
          <div className="mt-auto pt-2">
            <button className="rounded-2xl ring-1 w-max ring-found text-found py-2 px-4 text-sm hover:bg-found hover:text-white">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        hasPrev={page > 1}
        hasNext={res.items.length === (limit || PRODUCT_PER_PAGE)}
      />
    </div>
  );
};

export default ProductList;
