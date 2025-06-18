import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import BottomNavTablet from "@/components/BottomNavTablet";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FOUNDICH Leather Works",
  description:
    "Discover premium handmade leather shoes at Foundich Leather Works – crafted with style, comfort, and durability in mind. Shop timeless designs perfect for every occasion. Fast delivery, secure checkout, and quality you can trust. ",
  icons: {
    icon: "/favicon.ico", // Favicon path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          {children}
          <ChatBot />

          <Footer />
          <BottomNavTablet />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
