"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";

const CartPage = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-12 lg:px-24 bg-white mt-[20%] md:mt-0">
      <h1 className="sm:text-3xl text-2xl  font-bold mb-8 flex gap-2 items-center">
        <Image src="/logo1.png" alt="logo" width={35} height={35} />
        Shopping Cart</h1>

      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cart Items List */}
          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item) => (
              <div
                className="flex gap-4 items-start border-b pb-4"
                key={item._id}
              >
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.image, 96, 96, {})}
                    alt={item.productName?.original || "Product Image"}
                    width={96}
                    height={96}
                    className="object-cover rounded-md sm:w-[30%]"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  <div className="">
                    <div className="flex justify-between items-center sm:mt-6">
                      <h3 className="sm:text-2xl font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="text-md text-green-600 flex items-center gap-3">
                        {item.quantity && item.quantity > 1 && (
                          <span>{item.quantity}x</span>
                        )}
                        <span className="text-black font-bold sm:text-xl">₦{item.price?.amount}</span>
                        
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.availability?.status}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      disabled={isLoading}
                      className="text-blue-500 hover:underline disabled:opacity-50"
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="mt-8">
            <div className="flex justify-between text-lg font-semibold mb-2">
              <span>Subtotal</span>
              <span>
                ₦{
                  cart.lineItems
                    ? cart.lineItems.reduce(
                        (sum, item) =>
                          sum +
                          ((Number(item.price?.amount) || 0) * (item.quantity || 1)),
                        0
                      )
                    : 0
                }
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex gap-4">
              <button
                className="rounded-md py-2 px-4 bg-found text-white disabled:opacity-70"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
