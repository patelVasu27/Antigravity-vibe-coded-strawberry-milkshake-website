'use client';

import type { Metadata } from "next";
import { Inter, Belleza } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const belleza = Belleza({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

// Note: metadata export is not supported in client components
// Move metadata to a separate metadata.ts file if needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Velvet Vine | Luxury Strawberry Milkshake</title>
        <meta name="description" content="A high-viscosity, artisanal strawberry milkshake experience." />
      </head>
      <body
        className={`${inter.variable} ${belleza.variable} bg-brand-black text-white antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
