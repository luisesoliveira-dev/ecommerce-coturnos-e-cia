import { useState, useMemo } from "react";
import { produtos } from "../../data/produtos";
import { FilterSidebar } from "./FilterSidebar";
import { FilterDrawerMobile } from "./FilterDrawerMobile";
import { TopBarProducts } from "./TopBarProducts";
import { ProductGrid } from "./ProductGrid";

const INITIAL_FILTERS = {
  tipos: [],
  destaques: [],
  marcas: [],
  tamanhos: [],
  cores: [],
  preco: [0, 1000],
};

// Mapa de destaques → category dos produtos
const DESTAQUE_MAP = {
  promocao: "promocao",
  classicos: "classicos",
  lancamentos: "lancamentos",
};

function parsePrice(str) {
  return parseFloat(
    str.replace("R$", "").replace(".", "").replace(",", ".").trim(),
  );
}

export function ProductListingPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ordenacao, setOrdenacao] = useState("recentes");

  const handleClear = () => setFilters(INITIAL_FILTERS);

  const activeFiltersCount =
    filters.tipos.length +
    filters.destaques.length +
    filters.marcas.length +
    filters.tamanhos.length +
    filters.cores.length;

  const filteredProducts = useMemo(() => {
    let list = [...produtos];

    // Filtro por tipo/categoria
    if (filters.tipos.length > 0) {
      list = list.filter((p) => filters.tipos.includes(p.tipo));
    }

    // Filtro por destaque/categoria
    if (filters.destaques.length > 0) {
      list = list.filter((p) =>
        filters.destaques.some((d) => DESTAQUE_MAP[d] === p.category),
      );
    }

    // Filtro por tamanho
    if (filters.tamanhos.length > 0) {
      list = list.filter((p) =>
        filters.tamanhos.some((t) => p.tamanhos?.includes(t)),
      );
    }

    // Filtro por cor
    if (filters.cores.length > 0) {
      list = list.filter((p) => filters.cores.includes(p.cor));
    }

    // Filtro por marca
    if (filters.marcas.length > 0) {
      list = list.filter((p) => filters.marcas.includes(p.marca));
    }

    // Filtro por faixa de preço
    list = list.filter((p) => {
      const price = parsePrice(p.price);
      return price >= filters.preco[0] && price <= filters.preco[1];
    });

    // Ordenação
    if (ordenacao === "preco-asc") {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (ordenacao === "preco-desc") {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return list;
  }, [filters, ordenacao]);

  return (
    <div className="w-full min-h-screen bg-white font-barlow">
      {/* Breadcrumb + Título da página */}
      <div className="max-w-360 mx-auto px-4 sm:px-8 pt-10 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-1">
              Home / Produtos
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight leading-none">
              Todos os Produtos
            </h1>
            <div className="w-12 h-0.75 bg-gold mt-3" />
          </div>
          <p className="text-[12px] text-gray-400 uppercase tracking-widest hidden md:block pb-1">
            {filteredProducts.length} itens encontrados
          </p>
        </div>
      </div>

      {/* Barra superior */}
      <div className="max-w-360 mx-auto px-4 sm:px-8 pb-6">
        <TopBarProducts
          total={filteredProducts.length}
          ordenacao={ordenacao}
          onOrdenacao={setOrdenacao}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
          onOpenMobileFilters={() => setMobileOpen(true)}
          activeFiltersCount={activeFiltersCount}
        />
      </div>

      {/* Corpo: sidebar + grid */}
      <div className="max-w-360 mx-auto px-4 sm:px-8 pb-16">
        <div className="flex gap-8 items-start">
          {/* Sidebar desktop — desliza suavemente */}
          <div
            className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
              showFilters ? "w-56 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onClear={handleClear}
            />
          </div>

          {/* Grid de produtos */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              filtersVisible={showFilters}
            />
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <FilterDrawerMobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={handleClear}
      />
    </div>
  );
}
