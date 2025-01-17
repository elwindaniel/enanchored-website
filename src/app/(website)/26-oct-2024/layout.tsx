import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enanchored Youth Meeting on 26 october 2024",
  description: "Register Now! for Enanchored Youth Meeting on 26 october 2024 at Seaham Youth Centre, SR7 8QE. from 09 : 30 am to 04 : 00 pm. We are exicted to see you on that day.",
  openGraph: {
    title: "Enanchored Youth Meeting on 26 October 2024",
    description: "Join us for the Enanchored Youth Meeting at Seaham Youth Centre on 26 October 2024. A day of inspiration, fun, and connection. Register now!",
    url: "https://www.enanchored.com/26-oct-2024",  // replace with the actual URL of the event page
    type: "website",
    images: [
      {
        url: "https://www.enanchored.com/_next/image?url=%2Fcamp%2Fcamp261024.png&w=384&q=75",  // replace with your image URL
        width: 376,
        height: 230,
        alt: "Enanchored Youth Meeting Banner",
      },
    ],
  },
};

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
      
    </>
  );
}
