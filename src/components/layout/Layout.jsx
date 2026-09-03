import { Footer } from "../footer/Footer";
import { HelpWidget } from "../help/HelpWidget";
import { Navbar } from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-preto font-barlow flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <HelpWidget />

      <Footer />
    </div>
  );
}
