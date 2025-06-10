// "use client";

import CategoryList from "@/components/CategoryList";
import LoadingScreen from "@/components/LoadingScreen";
import ProductListHome from "@/components/ProductListHome";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:16 xl:32 2xl:64">
        <div className="text-3xl font-bold text-center">Featured Products</div>
        <Suspense fallback={<LoadingScreen />}>
          <ProductListHome
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
          <ProductListHome
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
