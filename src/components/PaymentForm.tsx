"use client";

import { useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/hooks/useCartStore"; // ✅ Assuming this is your cart store

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
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    if (!paystackKey) {
      alert("Payment key not set.");
      return;
    }

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!(window as any).PaystackPop) {
      alert("Paystack script not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);

    const handler = (window as any).PaystackPop.setup({
      key: paystackKey,
      email: form.email,
      amount: form.amount * 100,
      currency: "NGN",
      ref: `TXN_${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Notes", variable_name: "notes", value: form.notes },
        ],
      },
      callback: async (response: any) => {
        try {
          const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData: form,
              cartData: cart,
              reference: response.reference,
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
      onClose: function () {
        alert("Payment popup closed.");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="beforeInteractive"
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
