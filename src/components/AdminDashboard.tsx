"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart2,
  Users,
  Settings,
  LayoutDashboard,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  productsInStock: number;
};

const AdminDashboard = ({ productsInStock }: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative flex-col md:flex-row mt-[30%] md:mt-0">
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
          {/* <a
            href="#"
            className="flex items-center text-gray-700 hover:text-found"
          >
            <Settings className="w-5 h-5 mr-2" /> Settings
          </a> */}
        </nav>
      </aside>

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
          <button
            onClick={handleLogout}
            className="bg-none md:bg-found text-white px-2 py-1 md:px-4 md:py-2 rounded hover:bg-none md:hover:bg-red-700"
          >
            <span className="hidden md:block">Logout</span>
            <span className="block md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="red"
                  d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194l189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72h-465.71c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z"
                ></path>
              </svg>
            </span>
          </button>
        </header>
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="md:hidden top-4 left-4 z-50 bg-white p-1 rounded shadow mb-8"
        >
          {sidebarVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={23}
              height={23}
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="#f0041c"
                  d="M11 3v18H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm10 13v3a2 2 0 0 1-1.85 1.995L19 21h-6v-5zm0-6v4h-8v-4zm-2-7a2 2 0 0 1 1.995 1.85L21 5v3h-8V3z"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={23}
              height={23}
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="#f0041c"
                  d="M11 3v18H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm10 13v3a2 2 0 0 1-1.85 1.995L19 21h-6v-5zm0-6v4h-8v-4zm-2-7a2 2 0 0 1 1.995 1.85L21 5v3h-8V3z"
                ></path>
              </g>
            </svg>
          )}
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
          <Link href="/list">
            <div className="bg-white p-6 rounded shadow hover:shadow-[0px_4px_10px_rgba(0,0,0,0.7)]">
              <h3 className="text-gray-700 font-bold">Products in Stock</h3>
              <p className="text-3xl font-semibold mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="lime"
                    d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354zm0 640l177-89l-463-265l-211 106zm315-157l182-91l-497-249l-149 75zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288zm-640 710v-455l-384-192v454zm64-566l369-184l-369-185l-369 185zm576-1l448-224l448 224v527l-448 224l-448-224zm384 576v-305l-256-128v305zm384-128v-305l-256 128v305zm-320-288l241-121l-241-120l-241 120z"
                  ></path>
                </svg>
              </p>
            </div>
          </Link>

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
                  stroke="red"
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
          <a href="https://shorturl.at/klv0c"> <div className="bg-white p-6 rounded shadow hover:shadow-[0px_4px_10px_rgba(0,0,0,0.7)]">
            <h3 className="text-gray-700 font-bold">Sales</h3>
            <p className="text-3xl font-semibold mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 48 48"
              >
                <g fill="#ffa000">
                  <path d="M38 13c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 10c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2V8c0 1.1-2.7 2-6 2m0 6c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 19c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 22c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 25c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 28c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 31c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 34c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 37c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M38 40c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                </g>
                <g fill="#ffc107">
                  <ellipse cx={38} cy={8} rx={6} ry={2}></ellipse>
                  <path d="M38 12c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5"></path>
                </g>
                <g fill="#ffa000">
                  <path d="M10 19c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 16c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2m0 6c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 25c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 28c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 31c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 34c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 37c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M10 40c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                </g>
                <g fill="#ffc107">
                  <ellipse cx={10} cy={14} rx={6} ry={2}></ellipse>
                  <path d="M10 18c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5"></path>
                </g>
                <g fill="#ffa000">
                  <path d="M24 28c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M24 25c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2m0 6c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M24 34c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M24 37c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                  <path d="M24 40c-3.3 0-6-.9-6-2v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2"></path>
                </g>
                <g fill="#ffc107">
                  <ellipse cx={24} cy={23} rx={6} ry={2}></ellipse>
                  <path d="M24 27c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5m0 3c-2.8 0-5.1-.6-5.8-1.5c-.1.2-.2.3-.2.5c0 1.1 2.7 2 6 2s6-.9 6-2c0-.2-.1-.3-.2-.5c-.7.9-3 1.5-5.8 1.5"></path>
                </g>
              </svg>
            </p>
          </div></a>

         
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
