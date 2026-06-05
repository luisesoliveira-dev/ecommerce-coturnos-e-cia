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
  return (
    <div className="flex items-center justify-between gap-3 pb-5 border-b border-gray-100 font-barlow">
      {/* Esquerda */}
      <div className="flex items-center gap-3">
        {/* Botão filtros — desktop */}
        <button
          onClick={onToggleFilters}
          className={`hidden lg:flex items-center gap-2 px-4 py-2 border text-[12px] font-bold uppercase tracking-widest transition-all duration-200 ${
            showFilters
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300 hover:border-gray-700"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
          </svg>
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>

        {/* Botão filtros — mobile */}
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 text-[12px] font-bold uppercase tracking-widest hover:border-gray-700 transition-colors relative"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
          </svg>
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-army text-white text-[10px] font-black flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Breadcrumb / contagem */}
        <span className="text-[12px] text-gray-400 uppercase tracking-widest hidden sm:block">
          HOME / <span className="text-black font-bold">PRODUTOS</span>
          <span className="ml-2 text-gray-400">{total} itens</span>
        </span>
      </div>

      {/* Direita — ordenação */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-gray-400 uppercase tracking-widest hidden sm:block">
          Ordenar:
        </span>
        <div className="relative">
          <select
            value={ordenacao}
            onChange={(e) => onOrdenacao(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-[12px] font-bold uppercase tracking-wider text-black px-3 py-2 pr-8 cursor-pointer hover:border-gray-600 transition-colors focus:outline-none"
          >
            {ORDENACAO.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
