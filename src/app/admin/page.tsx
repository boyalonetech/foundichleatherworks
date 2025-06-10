"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    if (isLoggedIn) {
      fetch("/api/get-products-in-stock")
        .then((res) => res.json())
        .then((data) => {
          setProductsInStock(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
          setProductsInStock([]);
        });
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_GET;

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

        {/* Password Input with Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 pr-10 w-full border border-gray-300 rounded"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? (
              // Eye-off icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.21.215-2.368.607-3.435M6.235 6.235l11.53 11.53M9.88 9.88a3 3 0 004.24 4.24" />
              </svg>
            ) : (
              // Eye icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </span>
        </div>

        <button
          type="submit"
          className="bg-found text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>

      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
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
