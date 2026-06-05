import { useState } from "react";

export const SizeFilter = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = [
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ];

  return (
    <section className="w-full bg-white py-10 border-b border-gray-100">
      {/* Título */}
      <div className="text-center mb-7 px-6">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-pretoclaro">
          Compre pelo <span className="text-army">Tamanho</span>
        </h2>
        <div className="w-12 h-1 bg-gold mx-auto mt-3" />
      </div>

      {/* Scroll horizontal no mobile, wrap no desktop */}
      <div
        className="flex lg:flex-wrap lg:justify-center gap-3 px-6 pb-2
                   overflow-x-auto
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {sizes.map((size) => {
          const active = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => setSelectedSize(active ? null : size)}
              className={`
                shrink-0
                w-14 h-14 sm:w-16 sm:h-16
                flex items-center justify-center
                text-base sm:text-lg font-bold rounded-xl
                border-2 transition-all duration-200
                cursor-pointer select-none
                ${
                  active
                    ? "bg-army border-army text-branco shadow-lg scale-105"
                    : "bg-branco border-gray-200 text-gray-600 hover:border-army hover:text-army active:scale-95"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selectedSize && (
        <p
          className="mt-5 text-center text-sm font-bold text-gray-400 uppercase tracking-widest px-6"
          style={{ animation: "fadeUp 0.25s ease-out forwards" }}
        >
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
          Tamanho selecionado:{" "}
          <span className="text-[#D4AF37] text-lg">{selectedSize}</span>
        </p>
      )}
    </section>
  );
};
