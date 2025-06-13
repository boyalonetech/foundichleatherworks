"use client";

import { useState, ChangeEvent } from "react";
import Script from "next/script";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";

const CheckoutPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart } = useCartStore();

  const subtotal =
    cart?.lineItems?.reduce(
      (sum, item) =>
        Number(sum) +
        Number(item.price?.amount ?? 0) * Number(item.quantity ?? 1),
      0
    ) ?? 0;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendOrderDetails = async (reference: string) => {
    const orderData = { form, cart, reference };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxTTrAfW96g045ol12tlKGqyy-cpX7-c0ddj3dBc7zwKn3Q3x0fOibrSimp8OXuSxrZ/exec",
        {
          method: "POST",
          body: JSON.stringify(orderData),
        }
      );
    } catch (err) {
      console.error("Failed to Send Order:", err);
    }

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    window.location.href = "/orders";
  };

  const handlePay = () => {
    const flutterwaveKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY;

    if (!flutterwaveKey) {
      alert("❗ Flutterwave public key not found");
      return;
    }

    const amount = subtotal;
    if (amount <= 0) {
      alert("❗ Invalid amount");
      return;
    }

    setIsProcessing(true);

    (window as any).FlutterwaveCheckout({
      public_key: flutterwaveKey,
      tx_ref: `TXN_${Date.now()}`,
      amount,
      currency: "NGN",
      customer: {
        email: form.email,
        phonenumber: form.phone,
        name: form.name,
      },
      customizations: {
        title: "Foundich Payment",
        description: "Order Payment",
        logo: "https://foundichleatherworks.vercel.app/logo.png", // 👈 Add your logo/icon URL here
      },

      callback: function (response: any) {
        alert(
          `Getting Your Order Details ✅ Transaction ID: ${response.transaction_id}`
        );
        sendOrderDetails(response.transaction_id);
        setIsProcessing(false);
      },
      onclose: function () {
        alert("Payment Closed ❌.");
        setIsProcessing(false);
      },
    });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-3xl mx-auto mt-[35%] md:mt-10 p-6 space-y-8 rounded-xl shadow-xl bg-white  transition-all"
    >
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Delivery Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-found flex gap-2 items-center">
          {" "}
          <span className="text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 10.35V5h-5v2h3v2.65L13.52 14H10V9H2v7h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1"
              ></path>
              <path
                fill="currentColor"
                d="M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"
              ></path>
            </svg>
          </span>
          Delivery Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-transparent focus:outline-found"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-transparent focus:outline-found"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              placeholder="08012345678"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-transparent focus:outline-found"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="notes"
              placeholder="Street, City, State"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 bg-transparent resize-none focus:outline-found"
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-found">🧾 Order Summary</h2>

        {cart?.lineItems?.length ? (
          cart.lineItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 items-center border p-3 rounded-lg bg-gray-50]"
            >
              <Image
                src={
                  item.image
                    ? wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})
                    : "/product.png"
                }
                alt={item.productName?.original || "Product image"}
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.productName?.original}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm font-medium text-found">
                  ₦{item.price?.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items in cart.</p>
        )}

        <div className="text-right font-semibold text-xl">
          Subtotal: ₦{subtotal}
        </div>
      </div>

      {/* Pay Button */}
      <button
        type="button"
        onClick={handlePay}
        className="bg-found text-white px-6 py-3 w-full rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={!scriptLoaded || isProcessing}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          `Pay ₦${subtotal}`
        )}
      </button>
    </form>
  );
};

export default CheckoutPage;