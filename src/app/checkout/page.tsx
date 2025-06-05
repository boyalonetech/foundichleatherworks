"use client";
import { useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";

const CheckoutPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart } = useCartStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const sendOrderDetails = async (reference: string) => {
  const orderData = { form, cart, reference };

  // Send to Google Sheet
  try {
    await fetch("https://script.google.com/macros/s/AKfycbxTTrAfW96g045ol12tlKGqyy-cpX7-c0ddj3dBc7zwKn3Q3x0fOibrSimp8OXuSxrZ/exec", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  } catch (err) {
    console.error("Failed to send to Google Sheet:", err);
  }

  // Store locally & redirect
  localStorage.setItem("latestOrder", JSON.stringify(orderData));
  window.location.href = "/orders";
};


  const handlePay = () => {
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    if (!paystackKey) {
      alert("❗ Paystack public key not found");
      return;
    }

    if (!(window as any).PaystackPop) {
      alert("❗ PaystackPop is not available.");
      return;
    }

    const amount = (cart?.subtotal?.amount ?? 0) * 100;
    if (amount <= 0) {
      alert("❗ Invalid amount");
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: paystackKey,
      email: form.email,
      amount,
      currency: "NGN",
      ref: `TXN_${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Address", variable_name: "notes", value: form.notes },
        ],
      },
      callback: function (response: any) {
        alert(`✅ Payment complete! Reference: ${response.reference}`);
        setIsProcessing(false);
        sendOrderDetails(response.reference);
      },
      onClose: function () {
        alert("❗ Payment popup closed.");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
    setIsProcessing(true);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto mt-[35%] md:mt-10 space-y-6 px-4">
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Paystack script loaded");
          setScriptLoaded(true);
        }}
      />

      <h2 className="text-xl font-semibold">Delivery Details</h2>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <textarea
        name="notes"
        placeholder="State, City , Address"
        onChange={handleChange}
        className="w-full border p-2 py-3 resize-none"
        required
      />

      <h2 className="text-xl font-semibold mt-6">Order Summary</h2>

      {cart?.lineItems?.length ? (
        cart.lineItems.map((item) => (
          <div key={item._id} className="flex gap-4 mb-4">
            <Image
              src={wixMedia.getScaledToFillImageUrl(
                item.image || "/product.png",
                72,
                96,
                {}
              )}
              alt={item.productName?.original || "Product image"}
              width={72}
              height={96}
              className="object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold">{item.productName?.original}</h3>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₦{item.price?.amount}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No items in cart.</p>
      )}

      <div className="text-right font-bold text-lg">
        Subtotal: ₦{cart?.subtotal?.amount ?? 0}
      </div>

      <button
        type="button"
        onClick={handlePay}
        className="bg-green-600 text-white px-4 py-2 w-full rounded-md disabled:opacity-50"
        disabled={!scriptLoaded || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay ₦${cart?.subtotal?.amount ?? 0}`}
      </button>
    </form>
  );
};

export default CheckoutPage;
