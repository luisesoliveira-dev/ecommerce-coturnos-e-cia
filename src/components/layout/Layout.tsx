import type { ReactNode } from "react";

import { Footer } from "../footer/Footer";
import { HelpWidget } from "../help/HelpWidget";
import { Navbar } from "../navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-preto font-barlow flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <HelpWidget />
      <Footer />
    </div>
  );
}