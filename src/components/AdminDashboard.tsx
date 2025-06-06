// components/AdminDashboard.tsx
"use client";
import React from "react";
import { BarChart2, Users, Settings, LayoutDashboard } from "lucide-react";

type Props = {
  productsInStock: number;
};

import Link from "next/link";
import Image from "next/image";

const AdminDashboard = ({ productsInStock }: Props) => {
  return (
    <div className="min-h-screen flex bg-gray-100 mt-[24%] md:mt-0">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6 hidden md:block ">
        <h1 className="text-2xl font-bold text-found mb-10">Admin Panel</h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-found"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
          </a>
          <a
            href="https://shorturl.at/k7A7F"
            className="flex items-center text-gray-700 hover:text-found gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 15 15"
            >
              <path
                fill="none"
                stroke="currentColor"
                d="M4.5 4v-.5a3 3 0 0 1 6 0V4m-3 3v5M5 9.5h5M2.401 6.39l-.778 7a1 1 0 0 0 .994 1.11h9.766a1 1 0 0 0 .994-1.11l-.778-7a1 1 0 0 0-.994-.89h-8.21a1 1 0 0 0-.994.89Z"
                strokeWidth="1"
              />
            </svg>
            Add Products
          </a>
          <a
            href="https://shorturl.at/7Z8vN"
            className="flex items-center text-gray-700 hover:text-found"
          >
            <Users className="w-5 h-5 mr-2" /> Users
          </a>
          <a
            href="https://shorturl.at/klv0c"
            className="flex items-center text-gray-700 hover:text-found"
          >
            <BarChart2 className="w-5 h-5 mr-2" /> Orders
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-found"
          >
            <Settings className="w-5 h-5 mr-2" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <Link href="/profile">
            {" "}
            <button className="bg-found text-white px-4 py-2 rounded hover:bg-red-700">
              Profile
            </button>
          </Link>
        </header>
        <div className=" mb-[10%] overflow-hidden">
          <Image
            src="/ChatGPT Image Jun 6, 2025, 11_01_31 AM.png"
            width={500}
            height={100}
            quality={90}
            alt="analytics"
            className="w-[100%]"
          />
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-700 font-bold">Products in Stock</h3>
            <p className="text-3xl font-semibold mt-2">{productsInStock}</p>
          </div>
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            className="bg-white p-6 rounded shadow"
          >
            <h3 className="text-gray-700 font-bold">New Messages</h3>
            <p className="text-3xl font-semibold mt-2 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect width={20} height={16} x={2} y={4} rx={2}></rect>
                </g>
              </svg>
            </p>
          </a>

          <a href="https://shorturl.at/klv0c">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-gray-700 font-bold">Orders</h3>
              <p className="text-3xl font-semibold mt-2">420</p>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
