export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export interface ColorFilterProps {
  colors: ColorOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function ColorFilter({ colors, selected, onChange }: ColorFilterProps) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    );
  };

  return (
    <div className="flex flex-col gap-2 p-1">
      {colors.map((c) => (
        <label
          key={c.id}
          className="flex items-center gap-2.5 group"
          onClick={() => toggle(c.id)}
        >
          <div
            className={`w-5 h-5 rounded-full shrink-0 border-2 transition-all duration-150 ${
              selected.includes(c.id)
                ? "border-gold scale-110"
                : "border-transparent group-hover:border-gray-400"
            }`}
            style={{ backgroundColor: c.hex }}
          />
          <span
            className={`text-[13px] transition-colors duration-150 ${
              selected.includes(c.id)
                ? "text-gold font-semibold"
                : "text-gray-600 group-hover:text-black"
            }`}
          >
            {c.label}
          </span>
        </label>
      ))}
    </div>
  );
}
