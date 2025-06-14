import Filter from "@/components/Filter";
import LoadingScreen from "@/components/LoadingScreen";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ScrollToProducts from "@/components/ScrollToProducts";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:64 relative overflow-x-hidden">
      {/* CAMPAIGN */}
      <div className="hidden bg-gray-50 px-8 mt-2 sm:flex justify-between h-96 ">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 ">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <Link href="/list?cat=all-products">
            <button className="rounded-3xl bg-found text-white w-max py-3 px-6 text-md">
              Buy Now
            </button>
          </Link>
        </div>
        <div className="relative w-2/3">
          <Image
            src="/0b112d45999d0b0539d726a7308c7823.jpg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mt-[24%] block md:hidden overflow-hidden scale-[1.3] lg:hidden 2xl:hidden xl:hidden sm:hidden relative">
        <Image
          src="/photo-1653868250450-b83e6263d427.avif"
          width={500}
          height={500}
          quality={90}
          alt=""
          className="w-full h-[25vh] filter brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white gap-4 px-4">
          <h1 className="font-bold text-xl">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <Link href="/list?cat=all-products">
            <button className="rounded-3xl bg-found text-white py-1 px-4 text-sm">
              Buy Now
            </button>
          </Link>
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCTS */}
      <ScrollToProducts>
        <h1 className="md:mt-12 mt-8 text-2xl font-semibold">
          {cat?.collection?.name} For You!
        </h1>
        <Suspense fallback={<LoadingScreen />}>
          <ProductList
            categoryId={
              cat.collection?._id || "00000000-000000-000000-00000000000"
            }
            searchParams={searchParams}
          />
        </Suspense>
      </ScrollToProducts>
    </div>
  );
};

export default ListPage;
