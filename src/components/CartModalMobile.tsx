"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    window.location.href = "/checkout";
  };

  const handleViewCart = () => {
    onClose();
    router.push("/cart");
  };

  return (
    <div className="w-[100%] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-0 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <h3
              className="text-xl cursor-pointer px-4"
              onClick={onClose}
              title="Close"
            >
              ✖
            </h3>
          </div>

          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-medium">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ₦{item.price?.amount}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>
                ₦
                {cart.lineItems
                  ? cart.lineItems.reduce(
                      (sum, item) =>
                        sum +
                        (Number(item.price?.amount || 0) * Number(item.quantity || 1)),
                      0
                    )
                  : 0}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button
                className="rounded-md py-2 px-2 ring-1 ring-gray-300 text-gray-700"
                onClick={handleViewCart}
              >
                View Cart
              </button>
              <button
                className="rounded-md py-2 px-2 bg-found text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
