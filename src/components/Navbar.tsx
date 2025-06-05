"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="h-[10vh] md:h-24 lg:h-[10vh] px-4 md:px-8 shadow-[0_2px_3px_rgba(0,0,0,0.4)] fixed md:static top-0 left-0 w-full z-50 bg-white md:relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-3xl tracking-wide font-bold text-found">
            Foundich
          </div>
        </Link>
        <Menu />
      </div>

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
