import type { Metadata } from "next";
import "@/styles/globals.css";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Welcome to Enanchored",
  description: "We are committed to fostering spiritual development in the teenager for growth, and in the youth, toward maturity deeply rooted in Christ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className} style={{padding:0, margin:0}}>
        {children}
      </body>
    </html>
  );
}
