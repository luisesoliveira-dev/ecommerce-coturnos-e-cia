import { useState, useRef, useEffect } from "react";

export const SizeFilter = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);

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

  useEffect(() => {
    const check = () => {
      const el = scrollRef.current;
      if (!el) return;
      setNeedsScroll(el.scrollWidth > el.clientWidth);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onMouseDown = (e) => {
    if (!needsScroll) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.remove("cursor-grab");
    scrollRef.current.classList.add("cursor-grabbing");
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) dragMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.remove("cursor-grabbing");
      if (needsScroll) scrollRef.current.classList.add("cursor-grab");
    }
  };

  const handleClick = (size, active) => {
    if (dragMoved.current) return;
    setSelectedSize(active ? null : size);
  };

  return (
    <section className="w-full bg-white py-10 border-b border-gray-100 font-barlow">
      <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
        {/* Título */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-pretoclaro">
            Compre pelo <span className="text-army">Tamanho</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-3" />
        </div>

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className={`flex py-2 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            needsScroll ? "cursor-grab" : "cursor-default"
          }`}
        >
          <div
            className={`flex gap-3 xl:gap-4 min-w-max ${!needsScroll ? "mx-auto" : ""}`}
          >
            {sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => handleClick(size, active)}
                  className={`
                    shrink-0
                    w-14 h-14 sm:w-16 sm:h-16 xl:w-18 xl:h-18
                    flex items-center justify-center
                    text-base sm:text-lg font-bold rounded-xl
                    border-2 transition-all duration-200
                    cursor-pointer select-none
                    ${
                      active
                        ? "bg-army border-black text-branco"
                        : "bg-branco border-gray-200 text-gray-600 hover:border-army hover:text-army active:scale-95"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {selectedSize && (
          <p className="mt-5 text-center text-sm font-bold text-gray-400 uppercase tracking-widest animate-fadeUp">
            Tamanho selecionado:{" "}
            <span className="text-[#D4AF37] text-lg">{selectedSize}</span>
          </p>
        )}
      </div>
    </section>
  );
};
