"use client";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";



const OrdersPage = () => {
  const [order, setOrder] = useState<any>(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  const handleDownload = () => {
    if (!receiptRef.current) return;
    html2pdf()
      .set({
        margin: 0.5,
        filename: "order-receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(receiptRef.current)
      .save();
  };

  if (!order)
    return (
      <div className="flex items-center justify-center h-screen text-center text-gray-500">
        No recent order found.
      </div>
    );

  const { form, cart, reference } = order;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg relative">

      <div ref={receiptRef}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-green-600">✅</span> Order Summary
        </h1>

        {/* Customer Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-medium">Name:</span> {form.name}</p>
            <p><span className="font-medium">Email:</span> {form.email}</p>
            <p><span className="font-medium">Phone:</span> {form.phone}</p>
            <p><span className="font-medium">Address:</span> {form.notes}</p>
            <p className="md:col-span-2"><span className="font-medium">Payment Reference:</span> {reference}</p>
          </div>
        </section>

        {/* Order Items */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Purchased Items</h2>
          <div className="divide-y border rounded-lg overflow-hidden bg-gray-50">
            {cart?.lineItems?.map((item: any) => (
              <div key={item._id} className="p-4">
                <p className="font-semibold text-gray-800">{item.productName?.original}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₦{item.price?.amount}</p>
              </div>
            ))}
          </div>
          <p className="text-right font-bold text-lg text-gray-800 mt-6">
            Subtotal: ₦{cart?.subtotal?.amount}
          </p>
        </section>
      </div>
            <div className="flex justify-start mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
