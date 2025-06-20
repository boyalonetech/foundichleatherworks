"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { counter, getCart } = useCartStore();
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [member, setMember] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOrScroll = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOrScroll);
      document.addEventListener("touchstart", handleClickOrScroll);
      window.addEventListener("scroll", () => setOpen(false));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOrScroll);
      document.removeEventListener("touchstart", handleClickOrScroll);
      window.removeEventListener("scroll", () => setOpen(false));
    };
  }, [open]);

  useEffect(() => {
    getCart(wixClient);
    setNotificationCount((prev) => prev + 1);
  }, [counter, getCart, wixClient]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedImage = localStorage.getItem("customProfileImage");
      if (storedImage) setCustomImage(storedImage);

      const fetchMember = async () => {
        try {
          const memberData = await wixClient.members.getCurrentMember();
          setMember(memberData.member);
        } catch (error) {
          console.error("Failed to fetch member info:", error);
        }
      };
      fetchMember();
    } else {
      setCustomImage(null);
      setMember(null);
    }
  }, [isLoggedIn, wixClient]);

  return (
    <div>
      <Image
        ref={menuIconRef}
        src="/menu.png"
        alt="menu"
        width={23}
        height={23}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      <div
        ref={menuRef}
        className={`fixed top-20 right-0 w-[100%] max-w-[100%] h-[calc(65vh-80px)] bg-white text-black
          flex flex-col pl-7 justify-center gap-8 text-xl z-100 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <Link href="/home">
          <span
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z"
              />
            </svg>
            Home
          </span>
        </Link>

        <Link href="/list">
          <span
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                fillRule="evenodd"
                d="M5.207 5.486A1 1 0 0 1 6.065 5h11.867a1 1 0 0 1 .858.486l2.254 3.757a.5.5 0 0 1-.429.757H19.5v8.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5.3a.2.2 0 0 0-.2-.2H7.2a.2.2 0 0 0-.2.2v5.3a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V10H3.382a.5.5 0 0 1-.43-.757zm7.293 7.68c0-.23.187-.416.417-.416h4.166c.23 0 .417.187.417.417v2.916c0 .23-.186.417-.417.417h-4.166a.417.417 0 0 1-.417-.417z"
                clipRule="evenodd"
              />
            </svg>
            Shop
          </span>
        </Link>

        <Link href="/deals">
          <span
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path
                fill="red"
                d="M47.783 11.883c-.688-.542-2.533-.977-3.914-1.301L42 10.332V5.814l.957-.015C43.854 6.254 45.146 7 45.213 8h3.604c-.067-2-1.586-3.262-2.938-4.264C44.982 3.071 44 2.716 42 2.501V0h-2v2.424c-2 .192-2.646.69-3.549 1.503c-1.181 1.063-1.707 2.397-1.707 4.003c0 1.76.503 3.053 1.712 3.881c.676.469 1.544.905 3.544 1.309v4.895c-1-.177-1.002-.132-1.355-.551c-.34-.406-.433-1.464-.549-1.464H34.52c0 2 .541 2.958 1.895 4.025c.976.769 1.585.905 3.585 1.107V23h2v-1.836c2-.193 3.699-.702 4.676-1.536c1.268-1.083 2.305-2.444 2.305-4.082c-.001-1.598-.129-2.818-1.198-3.663m-8.765-2.786c-.582-.317-.806-.797-.806-1.438c0-.698.193-1.244.783-1.634c.311-.205.005-.354 1.005-.453v3.94c-1-.152-.762-.29-.982-.415m4.343 8.82c-.168.058-1.361.104-1.361.145v-4.167c2 .172 1.846.357 2.178.558c.521.324.783.786.783 1.377q-.001 1.525-1.6 2.087M38.52 30h-.553l-6.144-11.125c-.265-.481-.933-.875-1.483-.875H11.699c-.55 0-1.218.394-1.483.875L4.072 30H3.52C2.419 30 1 30.9 1 32v10c0 1.1 1.419 2 2.52 2H5v3c0 1.65 1.87 3 3.52 3h1c1.65 0 2.48-1.35 2.48-3v-3h17v3c0 1.65 1.869 3 3.52 3h1c1.65 0 2.48-1.35 2.48-3v-3h2.52c1.1 0 1.48-.9 1.48-2V32c0-1.1-.381-2-1.48-2m-31.5 8a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m2-8l4.053-8.105c.245-.493.897-.895 1.447-.895h13c.55 0 1.201.402 1.447.895L33.02 30zm26 8a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"
              />
            </svg>
            Deals
          </span>
        </Link>

        <Link href="/contact">
          <span
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m-8 2.999c1.648 0 3 1.351 3 3A3.01 3.01 0 0 1 13 11c-1.647 0-3-1.353-3-3.001c0-1.649 1.353-3 3-3M19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5z"
              />
            </svg>
            Contact
          </span>
        </Link>

        <Link href="/about">
          <span
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
            >
              <path
                fill="red"
                fillRule="evenodd"
                d="M256 42.667c117.822 0 213.334 95.512 213.334 213.333c0 117.82-95.512 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334S138.18 42.667 256 42.667m21.38 192h-42.666v128h42.666zM256.217 144c-15.554 0-26.837 11.22-26.837 26.371c0 15.764 10.986 26.963 26.837 26.963c15.235 0 26.497-11.2 26.497-26.667c0-15.446-11.262-26.667-26.497-26.667"
              />
            </svg>
            About
          </span>
        </Link>

        <Link href="/notification">
          <span
            className="relative flex items-center gap-4"
            onClick={() => {
              setNotificationCount(0);
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={27}
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="red"
                  d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
                ></path>
              </g>
            </svg>
            {notificationCount > 0 && (
              <div className="absolute -top-2 left-[18px] w-4 h-4 bg-found rounded-full text-white text-[10px] flex items-center justify-center notificated">
                {notificationCount}
              </div>
            )}
            Notification
          </span>
        </Link>

        {/* ... Your other links (Home, Shop, Deals, Contact, About) stay unchanged ... */}

        <Link href="/profile">
          <span
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <span className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center scale-[1.3]">
              {customImage ? (
                <Image
                  src={customImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="35px"
                  viewBox="0 0 24 24"
                  className="block"
                >
                  <path
                    fill="red"
                    fillRule="evenodd"
                    d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <h1 className="font-bold">
              {member?.profile?.nickname || "Profile"}
            </h1>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
