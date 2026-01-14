import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoFeedMe - Community Food & Farm Pools",
  description: "Pool resources for affordable food, staples, and farming. Escrow-protected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16"> {/* Padding to avoid overlap with fixed navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
