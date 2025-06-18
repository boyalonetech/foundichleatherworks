import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import BottomNavTablet from "@/components/BottomNavTablet";
import ChatBot from "@/components/ChatBot";

// Preload and optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "FOUNDICH Leather Works | Premium Handmade Leather Shoes",
    template: "%s | FOUNDICH Leather Works",
  },
  description:
    "Discover premium handmade leather shoes crafted for style, comfort & durability. Timeless designs for every occasion. Fast delivery & quality guarantee.",
  keywords: [
    "handmade leather shoes",
    "premium leather footwear",
    "quality leather shoes",
    "durable leather shoes",
    "FOUNDICH leather works",
    "artisan leather shoes",
    "comfortable leather footwear",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "FOUNDICH Leather Works | Premium Handmade Leather Shoes",
    description:
      "Discover premium handmade leather shoes crafted for style, comfort & durability.",
    url: "https://www.foundich.com",
    siteName: "FOUNDICH Leather Works",
    images: [
      {
        url: "https://www.foundich.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FOUNDICH Leather Works Premium Shoes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOUNDICH Leather Works | Premium Handmade Leather Shoes",
    description:
      "Discover premium handmade leather shoes crafted for style, comfort & durability.",
    images: ["https://www.foundich.com/twitter-image.jpg"],
  },
  metadataBase: new URL("https://www.foundich.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preload" href="/logo.png" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>FOUNDICH Leather Works | Premium Handmade Leather Shoes</title>
        {/* Structured data for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "FOUNDICH Leather Works",
            description: "Premium handmade leather shoes",
            url: "https://www.foundich.vercel.app",
            logo: "https://www.foundich.vercel.app/logo.png",
            sameAs: [
              "https://www.facebook.com/foundich",
              "https://www.instagram.com/foundich",
            ],
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.foundich.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </head>
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <ChatBot />
          <Footer />
          <BottomNavTablet />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
