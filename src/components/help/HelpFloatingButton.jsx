import { HelpCircle, X } from "lucide-react";

export function HelpFloatingButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Fechar menu de ajuda" : "Abrir menu de ajuda"}
      aria-expanded={isOpen}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-army text-branco flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      {isOpen ? (
        <X size={24} />
      ) : (
        <HelpCircle size={24} />
      )}
    </button>
  );
}