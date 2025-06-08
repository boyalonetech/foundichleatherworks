"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";
import SearchBarMobile from "./SearchBarMobile";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="h-[10vh] md:h-24 lg:h-[10vh] px-4 md:px-8 shadow-[0_2px_3px_rgba(0,0,0,0.4)] fixed md:static top-0 left-0 w-full z-50 bg-white md:relative flex flex-col justify-center">
      {/* MOBILE */}
      {/* <div className=" mt-6 md:mt-0"> */}
        {/* Only show when search is not active */}
        {!isSearch && (
          <div className="h-full flex items-center justify-between md:hidden nav">
            <Link href="/">
              <div className="text-3xl tracking-wide font-bold text-found">
                Foundich
              </div>
            </Link>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setIsSearch(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 2a8 8 0 015.293 13.707l4.5 4.5l-1.414 1.414l-4.5-4.5A8 8 0 1110 2zm0 2a6 6 0 100 12a6 6 0 000-12z"
                  />
                </svg>
              </button>
              <Menu />
            </div>
          </div>
        )}

        {/* Search Input Mobile */}
        {isSearch && (
          <div className="flex gap-1 items-center">
            <button
              type="button"
              onClick={() => setIsSearch(false)}
              className="ml-2 p-1 rounded-full hover:bg-gray-300 h-10  text-gray-600"
              title="Cancel"
            >
              {/* Cancel Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"
                ></path>
              </svg>
            </button>
            <SearchBarMobile />
          </div>
        )}
      {/* </div> */}

      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center h-full justify-between gap-8">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12 z-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo2.png"
              alt="Foundich Logo"
              width={50}
              height={50}
              className="mt-2"
              priority
            />
            <div className="text-3xl tracking-wide font-bold text-found">
              Foundich
            </div>
          </Link>
          <nav className="hidden xl:flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/list">Shop</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
