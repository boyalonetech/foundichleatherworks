"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [member, setMember] = useState<any>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const wixClient = useWixClient();

  const isLoggedIn = !!member;

  useEffect(() => {
    if (isLoggedIn && !member?.profile?.photo?.url) {
      const storedImage = localStorage.getItem("customProfileImage");
      if (storedImage) {
        setCustomImage(storedImage);
      }
    } else {
      setCustomImage(null);
    }
  }, [isLoggedIn, member]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberData = await wixClient.members.getCurrentMember();
        setMember(memberData.member);

        // Clear custom image if Wix profile photo exists
        if (memberData?.member?.profile?.photo?.url) {
          localStorage.removeItem("customProfileImage");
        }
      } catch (error) {
        setMember(null);
        console.error("Failed to fetch member info:", error);
      }
    };

    fetchMember();
  }, [wixClient]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCustomImage(result);
        localStorage.setItem("customProfileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      Cookies.remove("refreshToken");

      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      setIsLoading(false);
      setMember(null);
      router.push(logoutUrl);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const displayedImage = isLoggedIn
    ? member?.profile?.photo?.url || customImage || "/profile.png"
    : "/profile.png";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          {/* Circular image with overflow-hidden */}
          <div className="w-24 h-24 rounded-full overflow-hidden border mx-auto">
            <Image
              src={displayedImage}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          </div>

          {/* Pencil button outside the circular image */}
          {isLoggedIn && (
            <button
              onClick={handleEditClick}
              className="absolute -bottom-0 -right-0 bg-blue-500 rounded-full p-[5px] shadow z-10"
              title="Edit profile image"
            >
              <Pencil size={16} className="text-white" />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <h2 className="font-bold mb-2 text-2xl">
          {member?.profile?.nickname || "User"}
        </h2>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
