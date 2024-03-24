import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import ToasterProvider from "@/lib/toaster";
import InternalSessionProvider from "@/lib/sessionProvider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets: ["devanagari"], weight:['100','200','300','400','500','600','700','800','900']})

export const metadata: Metadata = {
  title: "Erisco Food Limited: A leading indigenous manufacturer of food products in Nigeria",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}><InternalSessionProvider><Navbar/><div className="mt-24"><ToasterProvider/><CartProvider>{children}</CartProvider></div></InternalSessionProvider><Footer/></body>
    </html>
  );
}
