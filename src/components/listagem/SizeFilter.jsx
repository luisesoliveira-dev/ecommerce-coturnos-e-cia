export function SizeFilter({ sizes, selected, onChange }) {
  const toggle = (s) => {
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s],
    );
  };

  return (
    <div className="flex flex-wrap gap-2 pb-1">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => toggle(s)}
          className={`w-11 h-11 text-[13px] font-black border transition-all duration-200 ${
            selected.includes(s)
              ? "bg-army text-white border-black shadow-md"
              : "bg-white text-black border-black/10 hover:border-army hover:bg-army/5 hover:text-army"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
