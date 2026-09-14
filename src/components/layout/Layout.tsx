import type { ReactNode } from "react";
import { Footer } from "../footer/Footer";
import { HelpWidget } from "../help/HelpWidget";
import { Navbar } from "../navbar/Navbar";
import { CartDrawer } from "../navbar/CartDrawer";
import { useCart } from "../../context/useCart";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen bg-white text-preto font-barlow flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <HelpWidget />
      <Footer />
    </div>
  );
}
