export function CategoryFilter({ options, selected, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <label
            key={opt.id}
            className="flex items-center gap-2.5 group"
            onClick={() => {
              onChange(
                isSelected
                  ? selected.filter((s) => s !== opt.id)
                  : [...selected, opt.id],
              );
            }}
          >
            <div
              className={`w-4 h-4 shrink-0 border transition-all duration-150 flex items-center justify-center ${
                isSelected
                  ? "bg-black border-black"
                  : "bg-white border-gray-300 group-hover:border-gray-600"
              }`}
            >
              {isSelected && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-[13px] transition-colors duration-150 uppercase tracking-wide ${
                isSelected
                  ? "text-black font-black"
                  : "text-black/70 font-bold group-hover:text-black"
              }`}
            >
              {opt.label}
              {opt.count !== undefined && (
                <span className="ml-1 text-[10px] text-black/40 font-bold">
                  ({opt.count})
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
