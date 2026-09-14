import { trendingTerms } from "../../data/search";
import { SearchTermChip } from "./SearchTermChip";

interface SearchEmptyProps {
  onSelectTerm: (term: string) => void;
}

export function SearchEmpty({ onSelectTerm }: SearchEmptyProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <h3 className="font-barlow font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-500 mb-4">
        Termos mais buscados
      </h3>
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {trendingTerms.map((term) => (
          <SearchTermChip
            key={term}
            label={term}
            onClick={() => onSelectTerm(term)}
          />
        ))}
      </div>
    </div>
  );
}
