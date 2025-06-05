// "use client";

import CategoryList from "@/components/CategoryList";
import LoadingScreen from "@/components/LoadingScreen";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { WixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { get } from "http";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  //   const wixClient = useWixClient();

  //   useEffect(() => {
  //     const getProducts = async () => {
  //       const res = await wixClient.products.queryProducts().find();

  // console.log(res);

  //     };

  //     getProducts();
  //   }, [wixClient]);

  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);





  

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:16 xl:32 2xl:64">
        <div className="text-3xl font-bold text-center">Featured Products</div>
        <Suspense fallback={<LoadingScreen />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>{" "}
      <div className="mt-24">
        <h1 className="px-4 md:px-8 lg:16 xl:32 2xl:64 text-center font-bold text-3xl mb-12">
          Categories
        </h1>
        <Suspense fallback={<LoadingScreen />}>
          <CategoryList />
        </Suspense>
      </div>{" "}
      <div className="mt-24 px-4 md:px-8 lg:16 xl:32 2xl:64">
        <div className="text-3xl font-bold text-center">New Products</div>
        <Suspense fallback={<LoadingScreen />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
