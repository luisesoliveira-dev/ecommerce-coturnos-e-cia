import { useMemo } from "react";
import { searchProdutos, getRelatedTerms } from "../../data/search";
import { SearchRelatedTerms } from "./SearchRelatedTerms";
import { SearchResultsGrid } from "./SearchResultsGrid";

interface SearchResultsProps {
  query: string;
  onSelectTerm: (term: string) => void;
  onProductClick?: () => void;
}

export function SearchResults({
  query,
  onSelectTerm,
  onProductClick,
}: SearchResultsProps) {
  const products = useMemo(() => searchProdutos(query), [query]);
  const relatedTerms = useMemo(() => getRelatedTerms(query), [query]);

  return (
    <div className="w-full max-w-390 mx-auto px-4 sm:px-8 py-5 sm:py-6 lg:pt-4 lg:pb-3">
      {/* O pr-25 no desktop alinha perfeitamente o fim do 4º card com o fim do campo de busca (antes do botão Cancelar) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:pr-25 w-full lg:items-start">
        <SearchRelatedTerms terms={relatedTerms} onSelectTerm={onSelectTerm} />
        <SearchResultsGrid
          products={products}
          query={query}
          onProductClick={onProductClick}
        />
      </div>
    </div>
  );
}
