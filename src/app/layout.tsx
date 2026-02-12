import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Drip - Shop, Stream & Collect",
  description:
    "Your home for entertaining live shoppable events for collectors and craft lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
