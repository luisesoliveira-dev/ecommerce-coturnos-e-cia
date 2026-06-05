export function ColorFilter({ colors, selected, onChange }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {colors.map((c) => (
        <label key={c.id} className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => toggle(c.id)}
            className={`w-5 h-5 rounded-full shrink-0 border-2 transition-all duration-150 ${
              selected.includes(c.id)
                ? "border-black scale-110"
                : "border-transparent group-hover:border-gray-400"
            }`}
            style={{ backgroundColor: c.hex }}
          />
          <span
            className={`text-[13px] transition-colors duration-150 ${
              selected.includes(c.id)
                ? "text-black font-semibold"
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
