import type { Metadata } from "next";
import "./globals.css";
import {Toaster} from 'react-hot-toast';


import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Inferno Hotel",
  description:
    "Inferno Hotel Bali menawarkan pengalaman menginap mewah dengan fasilitas modern, kenyamanan tropis, dan lokasi strategis di Kuta, Ubud, dan Canggu.",
  icons: {
    icon: "/logo/Asset-2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
