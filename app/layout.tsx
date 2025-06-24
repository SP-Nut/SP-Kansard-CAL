import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบคำนวณราคาวัสดุ",
  description: "เครื่องมือคำนวณราคาวัสดุก่อสร้าง หลังคา ฝ้า และระแนง โดยประมาณ",
  keywords: "คำนวณราคา, วัสดุก่อสร้าง, หลังคา, ฝ้า, ระแนง, ราคาโดยประมาณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}