import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}

export function SearchInput({ value, onChange, autoFocus }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      // Pequeno delay para garantir que o overlay já está montado
      const t = setTimeout(() => ref.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  return (
    <div className="flex items-center flex-1 mx-2 sm:mx-4 xl:mx-8 bg-transparent border-b-2 border-army gap-2 sm:gap-3 py-1.5 focus-within:border-gold transition-colors duration-200 min-w-0">
      <Search size={18} className="text-army shrink-0" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="O que você está procurando?"
        className="flex-1 bg-transparent border-none outline-none text-preto font-barlow text-sm sm:text-base lg:text-lg placeholder-army/50 tracking-wide min-w-0"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-army hover:text-gold transition-colors p-0.5 cursor-pointer"
          aria-label="Limpar busca"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
