"use client";

import { useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/hooks/useCartStore";

const PaymentForm = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { cart } = useCartStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    amount: cart?.lineItems
      ? cart.lineItems.reduce(
          (sum, item) =>
            sum + (Number(item.price?.amount) || 0) * (item.quantity || 1),
          0
        )
      : 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!(window as any).FlutterwaveCheckout) {
      alert("Flutterwave script not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);

    (window as any).FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
      tx_ref: `TXN_${Date.now()}`,
      amount: form.amount,
      currency: "NGN",
      customer: {
        email: form.email,
        phonenumber: form.phone,
        name: form.name,
      },
      customizations: {
        title: "Foundich Payment",
        description: "Order Payment",
      },
      callback: async (response: any) => {
        try {
          const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData: form,
              cartData: cart,
              reference: response.transaction_id,
            }),
          });

          if (res.ok) {
            alert("Payment successful! Order info sent to your email.");
          } else {
            alert("Payment succeeded, but failed to send order email.");
          }
        } catch (error) {
          console.error("Email send error:", error);
          alert("Something went wrong after payment.");
        } finally {
          setIsProcessing(false);
        }
      },
      onclose: () => {
        alert("Payment popup closed.");
        setIsProcessing(false);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <textarea
        name="notes"
        placeholder="Address"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-4 py-2 w-full disabled:opacity-50"
        disabled={!scriptLoaded || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay ₦${form.amount}`}
      </button>
    </div>
  );
};

export default PaymentForm;
