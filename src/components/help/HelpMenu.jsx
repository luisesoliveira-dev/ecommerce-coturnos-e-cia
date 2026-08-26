import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import {
  helpLinks,
  whatsappUrl,
} from "../../data/help";

export function HelpMenu({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-40px)] max-w-xs bg-branco border-2 border-preto shadow-xl">
      <div className="p-4 border-b border-preto/20">
        <p className="text-sm font-bold uppercase text-army">
          Precisa de ajuda?
        </p>

        <h2 className="text-lg font-black uppercase text-preto">
          Atendimento
        </h2>
      </div>

      <nav className="p-2">
        {helpLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block px-4 py-3 text-sm sm:text-base font-bold text-preto hover:bg-army hover:text-branco transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 text-sm sm:text-base font-bold text-preto hover:bg-army hover:text-branco transition-colors"
        >
          <MessageCircle size={18} />

          <span>Fale Conosco</span>
        </a>
      </nav>
    </div>
  );
}