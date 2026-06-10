import { useState } from "react";

export function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-3 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="text-[14px] font-black uppercase tracking-widest text-black group-hover:text-army transition-colors">
          {title}
        </span>
        <div
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-125 opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-0.5">
          {" "}
          {/* Previne cortes visuais em inputs/sliders */}
          {children}
        </div>
      </div>
    </div>
  );
}
