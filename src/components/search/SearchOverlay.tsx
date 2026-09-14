import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo1.png";
import { useScrollLock } from "../../hooks/useScrollLock";
import { SearchInput } from "./SearchInput";
import { SearchEmpty } from "./SearchEmpty";
import { SearchResults } from "./SearchResults";

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  query,
  setQuery,
}: SearchOverlayProps) {
  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
          {/* BACKDROP ESCURO — Fecha ao clicar fora */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-preto/50 backdrop-blur-xs"
          />

          {/* PAINEL DE PESQUISA (Tela toda no mobile e tablet < 1024px, ~68vh no desktop) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 bg-branco border-b-[3px] border-army shadow-2xl w-full h-full lg:h-auto flex flex-col"
          >
            {/* TOPO / HEADER */}
            <header className="border-b-[3px] border-army bg-branco sticky top-0 z-10 shrink-0">
              <div className="max-w-390 mx-auto w-full h-16 flex items-center justify-between px-4 sm:px-8">
                {/* LOGO */}
                <Link
                  to="/"
                  onClick={handleClose}
                  className="flex items-center shrink-0"
                >
                  <img
                    src={logo}
                    alt="Coturnos & Cia"
                    className="h-10 sm:h-11 w-auto"
                  />
                </Link>

                {/* INPUT DE PESQUISA */}
                <SearchInput
                  value={query}
                  onChange={setQuery}
                  autoFocus={isOpen}
                />

                {/* BOTÃO CANCELAR */}
                <button
                  onClick={handleClose}
                  className="font-barlow font-bold text-sm sm:text-base text-army hover:text-gold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ml-2"
                >
                  Cancelar
                </button>
              </div>
            </header>

            {/* CONTEÚDO SCROLLÁVEL NO MOBILE, VISÍVEL SEM ROLAGEM NO DESKTOP */}
            <main className="flex-1 w-full overflow-y-auto lg:overflow-visible no-scrollbar">
              {query.trim() === "" ? (
                <SearchEmpty onSelectTerm={(term) => setQuery(term)} />
              ) : (
                <SearchResults
                  query={query}
                  onSelectTerm={(term) => setQuery(term)}
                  onProductClick={handleClose}
                />
              )}
            </main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
