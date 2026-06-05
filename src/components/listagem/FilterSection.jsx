import { useState } from "react";

export function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="text-[13px] font-bold uppercase tracking-widest text-black">
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
