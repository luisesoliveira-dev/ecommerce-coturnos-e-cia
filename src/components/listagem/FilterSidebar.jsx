import { FilterSection } from "./FilterSection";
import { CategoryFilter } from "./CategoryFilter";
import { SizeFilter } from "./SizeFilter";
import { ColorFilter } from "./ColorFilter";
import { PriceRange } from "./PriceRange";
import { useMemo } from "react";

export function FilterSidebar({ products = [], filters, onChange, onClear }) {
  // Gerando os filtros dinamicamente com base nos produtos passados via prop
  const dynamicFilters = useMemo(() => {
    const tiposMap = new Map();
    const marcasMap = new Map();
    const coresMap = new Map();
    const tamanhosSet = new Set();
    const materialSet = new Set();
    const terrenoSet = new Set();

    products.forEach((p) => {
      if (p.tipo) tiposMap.set(p.tipo, (tiposMap.get(p.tipo) || 0) + 1);
      if (p.marca) marcasMap.set(p.marca, (marcasMap.get(p.marca) || 0) + 1);
      if (p.cor) coresMap.set(p.cor, (coresMap.get(p.cor) || 0) + 1);
      if (p.tamanhos) p.tamanhos.forEach((t) => tamanhosSet.add(t));
      if (p.material) materialSet.add(p.material);
      if (p.terreno) terrenoSet.add(p.terreno);
    });

    return {
      tipos: Array.from(tiposMap.entries()).map(([id, count]) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1).replace("-", " "),
        count,
      })),
      marcas: Array.from(marcasMap.entries()).map(([id, count]) => ({
        id,
        label: id,
        count,
      })),
      cores: Array.from(coresMap.entries()).map(([id, count]) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        count,
        hex:
          id === "preto"
            ? "#1a1a1a"
            : id === "marrom"
              ? "#6B3A2A"
              : id === "verde"
                ? "#4B5320"
                : id === "bege"
                  ? "#C4A882"
                  : "#cccccc",
      })),
      tamanhos: Array.from(tamanhosSet).sort((a, b) => a - b),
      materiais: Array.from(materialSet).map((m) => ({ id: m, label: m })),
      terrenos: Array.from(terrenoSet).map((t) => ({ id: t, label: t })),
    };
  }, [products]);

  const hasActive =
    filters.tipos.length > 0 ||
    filters.destaques?.length > 0 ||
    filters.marcas.length > 0 ||
    filters.tamanhos.length > 0 ||
    filters.cores.length > 0 ||
    filters.materiais?.length > 0 ||
    filters.terrenos?.length > 0;

  return (
    <aside className="w-full font-barlow lg:sticky lg:top-24">
      {/* Topo */}
      <div className="flex items-center justify-between pb-5 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 bg-army" />
          <span className="text-[14px] font-black uppercase tracking-[0.15em] text-black">
            Filtros
          </span>
        </div>
        {hasActive && (
          <button
            onClick={onClear}
            className="text-[10px] font-black uppercase tracking-widest text-army hover:text-gold transition-colors cursor-pointer border-b border-army"
          >
            Limpar
          </button>
        )}
      </div>

      <FilterSection title="Categorias">
        <CategoryFilter
          options={dynamicFilters.tipos}
          selected={filters.tipos}
          onChange={(v) => onChange({ ...filters, tipos: v })}
        />
      </FilterSection>

      <FilterSection title="Faixa de Preço">
        <PriceRange
          key={filters.preco.join("-")}
          min={0}
          max={1000}
          value={filters.preco}
          onChange={(v) => onChange({ ...filters, preco: v })}
        />
      </FilterSection>

      <FilterSection title="Tamanho">
        <SizeFilter
          sizes={dynamicFilters.tamanhos}
          selected={filters.tamanhos}
          onChange={(v) => onChange({ ...filters, tamanhos: v })}
        />
      </FilterSection>

      <FilterSection title="Cor">
        <ColorFilter
          colors={dynamicFilters.cores}
          selected={filters.cores}
          onChange={(v) => onChange({ ...filters, cores: v })}
        />
      </FilterSection>

      {/* Filtros Táticos Avançados */}
      {dynamicFilters.materiais.length > 0 && (
        <FilterSection title="Material" defaultOpen={false}>
          <CategoryFilter
            options={dynamicFilters.materiais}
            selected={filters.materiais || []}
            onChange={(v) => onChange({ ...filters, materiais: v })}
          />
        </FilterSection>
      )}

      {dynamicFilters.terrenos.length > 0 && (
        <FilterSection title="Tipo de Terreno" defaultOpen={false}>
          <CategoryFilter
            options={dynamicFilters.terrenos}
            selected={filters.terrenos || []}
            onChange={(v) => onChange({ ...filters, terrenos: v })}
          />
        </FilterSection>
      )}

      <FilterSection title="Marca" defaultOpen={false}>
        <CategoryFilter
          options={dynamicFilters.marcas}
          selected={filters.marcas}
          onChange={(v) => onChange({ ...filters, marcas: v })}
        />
      </FilterSection>
    </aside>
  );
}
