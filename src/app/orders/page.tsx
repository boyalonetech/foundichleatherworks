"use client";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  if (!order) return <div className="p-6">No recent order found.</div>;

  const { form, cart, reference } = order;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-[30%] md:mt-12 shadow-[0px_1px_10px_rgba(0,0,0,0.2)]">
      <h1 className="text-2xl font-bold mb-4">✅ Order Summary</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Customer Info</h2>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <p><strong>Address:</strong> {form.notes}</p>
        <p><strong>Payment Ref:</strong> {reference}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Purchased Items</h2>
        {cart?.lineItems?.map((item: any) => (
          <div key={item._id} className="mb-2 border-b py-2">
            <p><strong>{item.productName?.original}</strong></p>
            <p>Qty: {item.quantity}</p>
            <p>Price: ₦{item.price?.amount}</p>
          </div>
        ))}
        <p className="font-bold mt-4">Subtotal: ₦{cart?.subtotal?.amount}</p>
      </div>
    </div>
  );
};

export default OrdersPage;
