import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORDENACAO = [
  { id: "recentes", label: "Mais Recentes" },
  { id: "preco-asc", label: "Menor Preço" },
  { id: "preco-desc", label: "Maior Preço" },
  { id: "mais-vendidos", label: "Mais Vendidos" },
];

export function TopBarProducts({
  total,
  ordenacao,
  onOrdenacao,
  showFilters,
  onToggleFilters,
  onOpenMobileFilters,
  activeFiltersCount,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    ORDENACAO.find((o) => o.id === ordenacao)?.label || "Ordenar";

  return (
    <div className="flex flex-col gap-y-3 pb-5 border-b border-gray-100 font-barlow">
      {/* BREADCRUMB — mobile (<768px) */}
      <div className="md:hidden flex items-center">
        <span className="text-[12px] text-gray-400 uppercase tracking-widest">
          HOME / <span className="text-black font-bold">PRODUTOS</span>
          <span className="ml-2 text-gray-400">{total} itens</span>
        </span>
      </div>

      {/* ===== MOBILE (<768px): dois botões lado a lado expandidos ===== */}
      <div className="flex md:hidden items-center gap-2 w-full">
        {/* Filtros */}
        <button
          onClick={onOpenMobileFilters}
          className="flex flex-1 items-center justify-start gap-2 px-3 py-2.5 border border-black text-[10px] sm:text-[12px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors relative"
        >
          <SlidersHorizontal size={14} className="shrink-0" />
          Mostrar Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-army text-white text-[10px] font-black flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Ordenação */}
        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 bg-white border border-black text-[10px] sm:text-[12px] font-bold uppercase tracking-wider text-black px-3 py-2.5 w-full hover:bg-black hover:text-white transition-all duration-200"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate">{currentLabel}</span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                />
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-1 w-full bg-white border border-black z-50 shadow-xl overflow-hidden"
                >
                  {ORDENACAO.map((opt) => (
                    <li
                      key={opt.id}
                      onClick={() => {
                        onOrdenacao(opt.id);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer border-b border-gray-100 last:border-none ${
                        ordenacao === opt.id
                          ? "bg-army text-white"
                          : "text-black hover:bg-army hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== DESKTOP (>=768px): layout original ===== */}
      <div className="hidden md:flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-3">
          {/* Botão filtros — visível de md em diante (não só lg) */}
          <button
            onClick={onToggleFilters}
            className={`flex items-center gap-2 px-4 py-2 border text-[12px] font-bold uppercase tracking-widest transition-all duration-200 ${
              showFilters
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M7 12h10M11 20h2"
              />
            </svg>
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>

          {/* BREADCRUMB DESKTOP */}
          <span className="text-[12px] text-gray-400 uppercase tracking-widest">
            HOME / <span className="text-black font-bold">PRODUTOS</span>
            <span className="ml-2 text-gray-400">{total} itens</span>
          </span>
        </div>

        {/* Ordenação desktop */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-black uppercase font-bold tracking-widest hidden lg:block">
            Ordenar por:
          </span>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-4 bg-white border border-black text-[12px] font-bold uppercase tracking-wider text-black px-3 py-2 min-w-40 hover:bg-black hover:text-white transition-all duration-200"
            >
              <span>{currentLabel}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-1 w-full bg-white border border-black z-50 shadow-xl overflow-hidden"
                  >
                    {ORDENACAO.map((opt) => (
                      <li
                        key={opt.id}
                        onClick={() => {
                          onOrdenacao(opt.id);
                          setIsOpen(false);
                        }}
                        className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer border-b border-gray-100 last:border-none ${
                          ordenacao === opt.id
                            ? "bg-army text-white"
                            : "text-black hover:bg-army hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
