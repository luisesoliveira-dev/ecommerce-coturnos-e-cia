export function SizeFilter({ sizes, selected, onChange }) {
  const toggle = (s) => {
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => toggle(s)}
          className={`w-10 h-10 text-[13px] font-semibold border transition-all duration-150 ${
            selected.includes(s)
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-700"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
