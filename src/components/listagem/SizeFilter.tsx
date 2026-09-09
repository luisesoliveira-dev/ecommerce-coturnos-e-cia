export interface SizeFilterProps {
  sizes: number[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

export function SizeFilter({ sizes, selected, onChange }: SizeFilterProps) {
  const toggle = (s: number) => {
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s],
    );
  };

  return (
    <div className="grid grid-cols-4 gap-1.5 p-1">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => toggle(s)}
          className={`py-2 text-[12px] font-bold border transition-all duration-150 cursor-pointer ${
            selected.includes(s)
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-200 hover:border-black"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
