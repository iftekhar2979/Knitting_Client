// app/layout.js

import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from '@/lib/Providers';
import Footer from '@/components/Home/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tertiary Knit and Colour",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  // console.log('val')
  return (
    <Providers>

    <html lang="en">
      <body className={inter.className}>
        
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
    </Providers>
  );
}
