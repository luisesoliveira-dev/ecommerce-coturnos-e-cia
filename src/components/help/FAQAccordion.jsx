import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <div className="w-full border-t border-preto/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="border-b border-preto/20"
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-bold text-preto">
                {item.question}
              </span>

              <ChevronDown
                size={20}
                className={`shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pb-5"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm sm:text-base leading-relaxed text-preto/70">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}