// components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black">
      <div className="text-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-found border-solid mx-5 mb-4"></div>
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
