import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-branco/8 sm:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 sm:py-0 sm:cursor-default sm:pointer-events-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-branco font-extrabold uppercase tracking-widest text-xs border-l-2 border-gold pl-3 text-left">
          {title}
        </h3>
        <ChevronDown
          className={`text-gray-500 sm:hidden transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out sm:max-h-none! sm:opacity-100! sm:mt-5 ${
          isOpen
            ? "max-h-96 opacity-100 mt-2 pb-4 sm:pb-0"
            : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
        }`}
      >
        <ul className="flex flex-col gap-3">{children}</ul>
      </div>
    </div>
  );
};
