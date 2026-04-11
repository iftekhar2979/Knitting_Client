// app/layout.js

import Navbar from "@/components/Navbar";
import { Providers } from '@/lib/Providers';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tertiary Knity | Premium Knitwear Manufacturing",
  description: "High-quality, sustainable, and scalable garment solutions engineered with industrial precision.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">

      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>

    </html>
    </Providers>
  );
}
