"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedImage = localStorage.getItem("customProfileImage");
      if (storedImage) {
        setCustomImage(storedImage);
      } else {
        setCustomImage(null);
      }
    } else {
      setCustomImage(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberData = await wixClient.members.getCurrentMember();
        setMember(memberData.member);
      } catch (error) {
        console.error("Failed to fetch member info:", error);
      }
    };

    if (isLoggedIn) {
      fetchMember();
    } else {
      setMember(null);
    }
  }, [wixClient, isLoggedIn]);

  // Close profile dropdown on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleScroll = () => {
      setIsProfileOpen(false);
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProfileOpen]);

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

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setCustomImage(null);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const cartPage = () => {
    window.location.href = "/cart";
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/notification.png"
        alt="Notifications"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      <div
        className="relative cursor-pointer md:hidden lg:block"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-found rounded-full text-white text-sm flex items-center justify-center scale-[0.7]">
          {counter}
        </div>
      </div>

      <div
        className="relative cursor-pointer md:block lg:hidden"
        onClick={cartPage}
      >
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-found rounded-full text-white text-sm flex items-center justify-center scale-[0.7]">
          {counter}
        </div>
      </div>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}

      <div className="relative cursor-pointer" onClick={handleProfile}>
        <div className="relative w-8 h-8 rounded-full overflow-visible border border-gray-300">
          <Image
            src={customImage || "/profile.png"}
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {isProfileOpen && (
        <div
          ref={dropdownRef}
          className="absolute p-4 rounded-md top-12 right-4 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 w-40"
        >
          <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-visible border border-gray-300">
            <Image
              src={customImage || member?.profile?.photo?.url || "/profile.png"}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
            <button
              onClick={handleEditClick}
              className="absolute -bottom-0 -right-0 bg-blue-500 hover:bg-blue-500 text-white rounded-full p-1 shadow z-10"
              title="Edit profile image"
            >
              <Pencil size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div>
            <div className="text-center mb-2 font-bold text-2xl">
              {member?.profile?.nickname || "User"}
            </div>
          </div>

          <div
            className="text-red-600 cursor-pointer text-center"
            onClick={handleLogout}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            viewBox="0 0 24 24"
          >
            <circle
              cx={17}
              cy={15.5}
              r={1.12}
              fill="currentColor"
              fillRule="evenodd"
            ></circle>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M17 17.5c-.73 0-2.19.36-2.24 1.08c.5.71 1.32 1.17 2.24 1.17s1.74-.46 2.24-1.17c-.05-.72-1.51-1.08-2.24-1.08"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M18 11.09V6.27L10.5 3L3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82c.55-.13 1.08-.32 1.6-.55A5.97 5.97 0 0 0 17 23c3.31 0 6-2.69 6-6c0-2.97-2.16-5.43-5-5.91M11 17c0 .56.08 1.11.23 1.62c-.24.11-.48.22-.73.3c-3.17-1-5.5-4.24-5.5-7.74v-3.6l5.5-2.4l5.5 2.4v3.51c-2.84.48-5 2.94-5 5.91m6 4c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
