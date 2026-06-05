export function CategoryFilter({ options, selected, onChange }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt.id}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 shrink-0 border transition-all duration-150 flex items-center justify-center ${
              selected.includes(opt.id)
                ? "bg-black border-black"
                : "bg-white border-gray-300 group-hover:border-gray-600"
            }`}
          >
            {selected.includes(opt.id) && (
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span
            className={`text-[13px] transition-colors duration-150 ${
              selected.includes(opt.id)
                ? "text-black font-semibold"
                : "text-gray-600 group-hover:text-black"
            }`}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span className="ml-1 text-[11px] text-gray-400">({opt.count})</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}
