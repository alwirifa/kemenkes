import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

import { Lato, Poppins } from "next/font/google";
import "./globals.css";

const lato = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kemenkes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}

      <Toaster />
      </body>
    </html>
  );
}
