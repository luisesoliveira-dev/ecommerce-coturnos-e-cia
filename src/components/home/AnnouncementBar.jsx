import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Footprints,
  Sparkles,
  TruckIcon,
} from "lucide-react";

const messages = [
  {
    icon: Footprints,
    text: "COTURNOS encontre o seu coturno ideal.",
    cta: null,
  },
  {
    icon: TruckIcon,
    text: "ENTREGA para todos os Estados e Regiões",
    cta: null,
  },
  {
    icon: Sparkles,
    text: "NOVIDADE Coleção Inverno 2026 disponível agora.",
    cta: "Ver Coleção",
  },
];

export const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const go = useCallback(
    (dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === "next"
            ? (prev + 1) % messages.length
            : (prev - 1 + messages.length) % messages.length,
        );
        setAnimating(false);
      }, 250);
    },
    [animating],
  );

  useEffect(() => {
    const id = setInterval(() => go("next"), 4000);
    return () => clearInterval(id);
  }, [go]);

  const { icon: Icon, text, cta } = messages[current];

  // Quebra o texto para destacar a primeira palavra em negrito
  const [bold, ...rest] = text.split(" ");

  return (
    <div className="w-full bg-branco text-preto border-b border-army">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-9 py-1.5 sm:py-2">
        {/* Seta esquerda — oculta no mobile */}
        <button
          onClick={() => go("prev")}
          aria-label="Anterior"
          className="hidden sm:flex shrink-0 w-7 h-7 items-center justify-center text-army hover:text-gold transition-colors cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Conteúdo central */}
        <div className="flex-1 overflow-hidden flex items-center justify-center min-w-0">
          <div
            key={current}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 text-center min-w-0 ${
              animating
                ? "opacity-0"
                : direction === "next"
                  ? "bar-next"
                  : "bar-prev"
            }`}
          >
            {/* Ícones */}
            <Icon className="shrink-0 text-army w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />

            <p className="text-[11px] sm:text-xs md:text-sm font-medium leading-snug truncate sm:whitespace-normal">
              <strong className="font-black text-pretoclaro text-[13px] sm:text-[14px] md:text-[16px]">
                {bold}
              </strong>{" "}
              <span className="text-pretoclaro">{rest.join(" ")}</span>
            </p>

            {cta && (
              <button className="hidden sm:inline shrink-0 underline underline-offset-2 font-bold text-army hover:text-gold transition-colors cursor-pointer text-[11px] sm:text-xs md:text-sm">
                {cta}
              </button>
            )}
          </div>
        </div>

        {/* Seta direita — oculta no mobile */}
        <button
          onClick={() => go("next")}
          aria-label="Próximo"
          className="hidden sm:flex shrink-0 w-7 h-7 items-center justify-center text-army hover:text-gold transition-colors cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
