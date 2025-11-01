"use client";

import { usePathname } from "next/navigation";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatWidget";
import AIAssistantIcon from "@/components/ChatBot";

export default function HideLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 👇 hide in /admin routes
  const hideHeaderAndProfile = pathname?.startsWith("/ai");

  return (
    <>
      {!hideHeaderAndProfile && <NavBar />}
      {children}
      {!hideHeaderAndProfile && <AIAssistantIcon />}
      {!hideHeaderAndProfile && <Footer />}
    </>
  );
}
