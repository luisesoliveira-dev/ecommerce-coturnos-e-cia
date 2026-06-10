import { useEffect } from "react";
import { FilterSidebar } from "./FilterSidebar";

export function FilterDrawerMobile({
  open,
  onClose,
  filters,
  onChange,
  onClear,
}) {
  // Trava scroll do body quando aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-xs bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header do drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <span className="text-sm font-black uppercase tracking-widest text-black">
            Filtros
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onClear={onClear}
          />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-black text-white text-[13px] font-bold uppercase tracking-widest hover:bg-army transition-colors duration-200"
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </>
  );
}
