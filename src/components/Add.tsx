"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  // // TEMPORARY
  // const stock = 6;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-medium">Choose a Quantity</h4>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center ">
        <div className="flex flex-row sm:flex-row sm:items-center gap-[6rem] md:gap-[10rem] lg:gap-[6rem] sm:gap-6 md:8 mb-4">
          <div className="bg-gray-100 py-1 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>

          {stockNumber < 1 ? (
            <div className="text-xs text-red-500">Product is out of stock</div>
          ) : (
            <div className="text-xs text-gray-700 leading-snug">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br />
              Don&apos;t miss it
            </div>
          )}
        </div>

        <button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading || stockNumber < 1}
          className="w-full sm:w-36 text-sm rounded-3xl ring-1 ring-found py-2 px-4 text-white bg-found hover:bg-red-600 md:hover:bg-found md:hover:shadow-[0px_3px_10px_#f00] hover:text-white disabled:cursor-not-allowed disabled:bg-red-400 disabled:ring-0 disabled:text-white"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
