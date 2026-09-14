interface SearchTermChipProps {
  label: string;
  onClick: () => void;
}

export function SearchTermChip({ label, onClick }: SearchTermChipProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 border border-army text-army text-sm font-barlow font-semibold uppercase tracking-wide rounded-full hover:bg-army hover:text-branco transition-all duration-200 cursor-pointer"
    >
      {label}
    </button>
  );
}
