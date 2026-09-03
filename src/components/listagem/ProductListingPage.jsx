import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { produtos as allProducts } from "../../data/produtos";
import { FilterSidebar } from "./FilterSidebar";
import { FilterDrawerMobile } from "./FilterDrawerMobile";
import { TopBarProducts } from "./TopBarProducts";
import { ProductGrid } from "./ProductGrid";

// Constantes estáveis fora do componente
const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

const INITIAL_FILTERS = {
  tipos: [],
  destaques: [],
  marcas: [],
  tamanhos: [],
  cores: [],
  materiais: [],
  terrenos: [],
  preco: [0, 1000],
};

const DESTAQUE_MAP = {
  promocao: "promocao",
  classicos: "classicos",
  lancamentos: "lancamentos",
};

function parsePrice(str) {
  if (!str) return 0;
  return parseFloat(
    str.replace("R$", "").replace(".", "").replace(",", ".").trim(),
  );
}

/**
 * Sub-componente que gerencia sua própria contagem de "Ver Mais".
 * O uso da 'key' no componente pai garante que ele resete quando necessário.
 */
function PaginatedProductGrid({ products, filtersVisible }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const displayedProducts = useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);

  return (
    <>
      <ProductGrid
        products={displayedProducts}
        filtersVisible={filtersVisible}
      />

      {visibleCount < products.length && (
        <div className="mt-12 flex flex-col items-center">
          <div className="w-full h-px bg-gray-100 relative mb-8">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold text-center w-full max-w-xs">
              Mostrando {displayedProducts.length} de {products.length} itens
            </span>
          </div>

          <button
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
            className="group relative px-12 py-4 border-2 border-black text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white"
          >
            Mostrar Mais
            <div className="absolute -bottom-1 -right-1 w-full h-full border-b-2 border-r-2 border-gold -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
          </button>
        </div>
      )}
    </>
  );
}

export function ProductListingPage({
  title = "Todos os Produtos",
  initialProducts = allProducts,
}) {
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
    filters.cores.length +
    (filters.materiais?.length || 0) +
    (filters.terrenos?.length || 0);

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (filters.tipos.length > 0) {
      list = list.filter((p) => filters.tipos.includes(p.tipo));
    }
    if (filters.destaques.length > 0) {
      list = list.filter((p) =>
        filters.destaques.some((d) => DESTAQUE_MAP[d] === p.category),
      );
    }
    if (filters.tamanhos.length > 0) {
      list = list.filter((p) =>
        filters.tamanhos.some((t) => p.tamanhos?.includes(t)),
      );
    }
    if (filters.cores.length > 0) {
      list = list.filter((p) => filters.cores.includes(p.cor));
    }
    if (filters.marcas.length > 0) {
      list = list.filter((p) => filters.marcas.includes(p.marca));
    }
    if (filters.materiais?.length > 0) {
      list = list.filter((p) => filters.materiais.includes(p.material));
    }
    if (filters.terrenos?.length > 0) {
      list = list.filter((p) => filters.terrenos.includes(p.terreno));
    }

    list = list.filter((p) => {
      const price = parsePrice(p.price);
      return price >= filters.preco[0] && price <= filters.preco[1];
    });

    if (ordenacao === "preco-asc") {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (ordenacao === "preco-desc") {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return list;
  }, [initialProducts, filters, ordenacao]);

  const filterKey = useMemo(() => {
    return JSON.stringify(filters) + ordenacao + title;
  }, [filters, ordenacao, title]);

  return (
    <div className="w-full min-h-screen bg-white font-barlow">
      <div className="max-w-390 mx-auto px-4 sm:px-8">
        <div className="pt-10 pb-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Home / {title}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight leading-none">
                {title}
              </h1>
              <div className="w-12 h-0.75 bg-gold mt-3" />
            </div>
            <p className="text-[12px] text-gray-400 uppercase tracking-widest hidden md:block pb-1">
              {filteredProducts.length} itens encontrados
            </p>
          </div>
        </div>

        <div className="pb-6">
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

        <div className="pb-16">
          <div className="flex items-start">
            <AnimatePresence initial={false}>
              {showFilters && (
                <motion.div
                  initial={{ width: 0, opacity: 0, marginRight: 0 }}
                  animate={{ width: 224, opacity: 1, marginRight: 32 }}
                  exit={{ width: 0, opacity: 0, marginRight: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="hidden lg:block shrink-0 overflow-hidden"
                >
                  <div className="w-56">
                    <FilterSidebar
                      products={initialProducts}
                      filters={filters}
                      onChange={setFilters}
                      onClear={handleClear}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-w-0">
              <PaginatedProductGrid
                key={filterKey}
                products={filteredProducts}
                filtersVisible={showFilters}
              />
            </div>
          </div>
        </div>
      </div>

      <FilterDrawerMobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={handleClear}
        products={allProducts}
      />
    </div>
  );
}
