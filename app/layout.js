// app/layout.js

import Navbar from "@/components/Navbar";
import { Providers } from '@/lib/Providers';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tertiary Colour Knit Fabrics | Premium Knitwear Manufacturer in Gazipur",
  description: "100% Export Oriented Knit Fabrics Manufacturer & Supplier in Bangladesh. Specializing in high-quality, sustainable textile solutions with industrial precision.",
  keywords: [
    "Knit Fabrics Manufacturer",
    "Textile Supplier Bangladesh",
    "Export Oriented Garments",
    "Gazipur Knitting Factory",
    "Premium Knitwear",
    "Sustainable Textiles",
    "Bulk Fabric Production",
    "Tertiary Colour Knit Fabrics",
    "Custom Fabric Design",
    "Industrial Knitting Gazipur"
  ],
  authors: [{ name: "Tertiary Colour Knit Fabrics" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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
