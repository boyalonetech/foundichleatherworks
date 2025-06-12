// components/LoadingScreen.tsx

"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/home";
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black overflow-hidden">
      <div className="flex flex-col items-center justify-center h-screen bg-white ">
        <div className="relative">
          {/* Ground Shadow */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-10 bg-black/50 rounded-[100%] blur-xl z-0 fou-nd2" />

          {/* Image */}
          <div className="relative z-10">
            <Image
              src="/found.png"
              alt="Foundich Logo"
              width={400}
              height={400}
              className="rounded-2xl shadow-[0px_2px_10px_rgba(0,0,0,0.2)] scale-[0.5] transition-transform py-20 px-10 fou-nd"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
