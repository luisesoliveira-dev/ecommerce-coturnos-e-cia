import { FilterSection } from "./FilterSection";
import { CategoryFilter } from "./CategoryFilter";
import { SizeFilter } from "./SizeFilter";
import { ColorFilter } from "./ColorFilter";
import { PriceRange } from "./PriceRange";

const TIPOS = [
  { id: "coturno", label: "Coturnos", count: 18 },
  { id: "bota-tatica", label: "Botas Táticas", count: 12 },
  { id: "sapato-social", label: "Sapatos Sociais", count: 7 },
];

const DESTAQUES = [
  { id: "promocao", label: "Promoções", count: 5 },
  { id: "classicos", label: "Mais Vendidos", count: 9 },
  { id: "lancamentos", label: "Lançamentos", count: 5 },
];

const MARCAS = [
  { id: "borcegui", label: "Borcegui", count: 8 },
  { id: "coturno-br", label: "Coturno BR", count: 6 },
  { id: "militar-pro", label: "Militar Pro", count: 5 },
  { id: "tacforce", label: "TacForce", count: 4 },
  { id: "urbangear", label: "UrbanGear", count: 3 },
];

const TAMANHOS = [38, 39, 40, 41, 42, 43, 44, 45];

const CORES = [
  { id: "preto", label: "Preto", hex: "#1a1a1a" },
  { id: "marrom", label: "Marrom", hex: "#6B3A2A" },
  { id: "verde", label: "Verde Militar", hex: "#4B5320" },
  { id: "bege", label: "Bege", hex: "#C4A882" },
  { id: "cinza", label: "Cinza", hex: "#6B6B6B" },
];

export function FilterSidebar({ filters, onChange, onClear }) {
  const hasActive =
    filters.tipos.length > 0 ||
    filters.destaques.length > 0 ||
    filters.marcas.length > 0 ||
    filters.tamanhos.length > 0 ||
    filters.cores.length > 0;

  return (
    <aside className="w-full font-barlow">
      {/* Topo */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
          Filtros
        </span>
        {hasActive && (
          <button
            onClick={onClear}
            className="text-[11px] font-bold uppercase tracking-widest text-army hover:text-black transition-colors"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <FilterSection title="Categorias">
        <CategoryFilter
          options={TIPOS}
          selected={filters.tipos}
          onChange={(v) => onChange({ ...filters, tipos: v })}
        />
      </FilterSection>

      <FilterSection title="Destaques">
        <CategoryFilter
          options={DESTAQUES}
          selected={filters.destaques}
          onChange={(v) => onChange({ ...filters, destaques: v })}
        />
      </FilterSection>

      <FilterSection title="Faixa de Preço">
        <PriceRange
          min={0}
          max={1000}
          value={filters.preco}
          onChange={(v) => onChange({ ...filters, preco: v })}
        />
      </FilterSection>

      <FilterSection title="Tamanho">
        <SizeFilter
          sizes={TAMANHOS}
          selected={filters.tamanhos}
          onChange={(v) => onChange({ ...filters, tamanhos: v })}
        />
      </FilterSection>

      <FilterSection title="Cor">
        <ColorFilter
          colors={CORES}
          selected={filters.cores}
          onChange={(v) => onChange({ ...filters, cores: v })}
        />
      </FilterSection>

      <FilterSection title="Marca" defaultOpen={false}>
        <CategoryFilter
          options={MARCAS}
          selected={filters.marcas}
          onChange={(v) => onChange({ ...filters, marcas: v })}
        />
      </FilterSection>
    </aside>
  );
}
