// components/LoadingScreen.tsx

"use client";

import Image from "next/image";
import React, { useEffect } from "react";

const LoadingScreen: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/home";
    }, 3100);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black overflow-hidden">
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative">
          {/* Ground Shadow
          <div className="absolute animate-bounce -bottom-3 left-1/2 -translate-x-1/2 w-40 h-10 bg-black/30 rounded-[50%] blur-xl z-0 fou-nd2" /> */}

          {/* Logo Image */}
          <div className="relative z-10">
            <Image
              src="/found.png"
              alt="Foundich Logo"
              width={400}
              height={400}
              className="rounded-[50px] shadow-[0px_2px_10px_rgba(0,0,0,0.2)] scale-[0.5] transition-transform py-20 px-10 fou-nd"
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-lg font-semibold text-gray-700 load animate-pulse">
          Loading...
        </p>

        {/* Loading Bar */}
        <div className="mt-4 w-40 h-2 bg-gray-200 rounded-full overflow-hidden load">
          <div className="h-full bg-found animate-loadingBar" />
        </div>
      </div>

      {/* Scoped Loading Bar Animation */}
      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loadingBar {
          width: 100%;
          animation: loadingBar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
