"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import Link from "next/link";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
    // Assume any change in cart triggers a new notification
    setNotificationCount((prev) => prev + 1);
  }, [counter, getCart, wixClient]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedImage = localStorage.getItem("customProfileImage");
      setCustomImage(storedImage || null);
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
    setShowLogoutPopup(true);

    setTimeout(async () => {
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      setIsLoading(false);
      setIsProfileOpen(false);
      router.push(logoutUrl);
    }, 2000);
  };

  const cartPage = () => {
    window.location.href = "/cart";
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {showLogoutPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
          You have been logged out.
        </div>
      )}

      <Link
        href="/notification"
        className="relative cursor-pointer md:block hidden"
        onClick={() => setNotificationCount(0)}
      >
        <Image
          src="/notification.png"
          alt="Notifications"
          width={22}
          height={22}
          className="cursor-pointer"
        />
        {notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-found rounded-full text-white text-[10px] flex items-center justify-center notificated">
            {notificationCount}
          </div>
        )}
      </Link>

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

          <div className="text-center mb-2 font-bold text-2xl">
            {member?.profile?.nickname || "User"}
          </div>
          <hr />
          <div
            className="text-red-600 cursor-pointer text-center pt-3"
            onClick={handleLogout}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
