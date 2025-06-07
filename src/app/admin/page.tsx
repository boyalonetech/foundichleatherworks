"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";

// app/admin/page.tsx
import { getProductsInStock } from "@/lib/getProductsInStock";

// const AdminPage = async () => {
//   const productsInStock = await getProductsInStock();

//   return <AdminDashboard productsInStock={productsInStock} />;
// };

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [productsInStock, setProductsInStock] = useState<any[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Fetch products in stock when logged in
    if (isLoggedIn) {
      getProductsInStock().then((result) => {
        // If getProductsInStock returns a number, wrap it in an array
        setProductsInStock(Array.isArray(result) ? result : []);
      });
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_ACCESS;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsLoggedIn(true);
      setShowPopup(false);
    } else {
      setShowPopup(true);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return <AdminDashboard productsInStock={productsInStock.length} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <h1 className="text-4xl mb-6 font-bold">Admin Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-found text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>

      {showPopup && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-white border border-red-500 text-red-700 shadow-xl 
                  p-6 rounded-xl flex items-center space-x-4 z-50  max-w-sm w-full"
        >
          <AlertTriangle className="text-red-600" size={28} />
          <div className="flex-1">
            <strong className="block text-lg">Access Denied</strong>
            <span className="text-sm">Incorrect email or password.</span>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="text-sm text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLoginPage;
