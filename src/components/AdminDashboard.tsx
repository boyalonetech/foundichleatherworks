"use client";
import React, { useState } from "react";
import {
  BarChart2,
  Users,
  Settings,
  LayoutDashboard,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  productsInStock: number;
};

const AdminDashboard = ({ productsInStock }: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 relative flex-col md:flex-row mt-[30%] md:mt-0">
      {/* Mobile Toggle Button */}

      {/* Sidebar */}
      <aside
        className={`mt-[20%] md:mt-0 bg-white shadow-md px-4 py-6 w-64 fixed top-0 bottom-0 left-0 z-40 transition-transform transform md:relative md:translate-x-0 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold text-found mb-10 mt-12 md:mt-0">
          Admin Panel
        </h1>
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

      {/* Overlay for mobile when sidebar is open */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex flex-row sm:flex-row justify-between items-center sm:items-center mb-6 gap-4">
          <h2 className="text-3xl flex gap-3 font-bold text-black">
            Dashboard <span className="hidden md:block">Overview</span>
          </h2>
          <Link href="/profile">
            <button className="bg-none md:bg-found text-white px-2 py-1 md:px-4 md:py-2 rounded hover:bg-none md:hover:bg-red-700">
              <span className="hidden md:block">Profile </span>
              <span className=" block md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  className="hover:fill-white"
                >
                  <path
                    fill="red"
                    fillRule="evenodd"
                    d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </button>
          </Link>
        </header>
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="md:hidden  top-4 left-4 z-50 bg-white p-1 rounded shadow mb-8"
        >
          {sidebarVisible ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <div className="mb-[10%] overflow-hidden">
          <Image
            src="/ChatGPT Image Jun 6, 2025, 11_01_31 AM.png"
            width={10000}
            height={10000}
            quality={90}
            alt="analytics"
            className="w-[100%]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-[0px_4px_10px_rgba(0,0,0,0.7)]">
            <h3 className="text-gray-700 font-bold">Products in Stock</h3>
            <p className="text-3xl font-semibold mt-2">{productsInStock}</p>
          </div>
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            className="bg-white p-6 rounded shadow hover:shadow-[0px_4px_10px_rgba(0,0,0,0.7)]"
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
            <div className="bg-white p-6 rounded shadow hover:shadow-[0px_4px_10px_rgba(0,0,0,0.7)]">
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
