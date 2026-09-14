interface SearchRelatedTermsProps {
  terms: string[];
  onSelectTerm: (term: string) => void;
}

export function SearchRelatedTerms({
  terms,
  onSelectTerm,
}: SearchRelatedTermsProps) {
  // Mesmo quando não houver termos relacionados, mantém o espaço fixo na coluna lateral
  // no desktop para que a estrutura e o posicionamento dos cards nunca mudem de lugar.
  if (terms.length === 0) {
    return (
      <aside className="hidden lg:block lg:w-56 shrink-0" aria-hidden="true" />
    );
  }

  return (
    <aside className="w-full lg:w-56 shrink-0 mb-6 lg:mb-0">
      <div className="flex items-center h-6 mb-3 sm:mb-4">
        <h3 className="font-barlow font-bold text-[15px] sm:text-base uppercase tracking-wider text-preto leading-none">
          Termos relacionados
        </h3>
      </div>
      {/* No tablet e mobile: distribui os termos de forma limpa e legível */}
      <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-x-4 sm:gap-x-6 gap-y-2 lg:gap-y-2.5 w-full max-w-2xl lg:max-w-none">
        {terms.map((term) => (
          <li key={term}>
            <button
              onClick={() => onSelectTerm(term)}
              className="font-barlow text-[16px] sm:text-[15px] lg:text-base text-preto/90 hover:text-gold transition-colors text-left cursor-pointer block w-full py-1 truncate"
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
