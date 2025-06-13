import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import BottomNavTablet from "@/components/BottomNavTablet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FOUNDICH Leather Works",
  description: "An E-commerce Website for home-made leather",
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
          <Footer />
          <BottomNavTablet />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
