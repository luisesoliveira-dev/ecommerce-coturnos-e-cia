import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "../../data/slides";

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(null);
  const didMove = useRef(false);
  const AUTOPLAY_INTERVAL = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, isDragging]);

  const onDragStart = (clientX) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = clientX;
    didMove.current = false;
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX.current;

    if (Math.abs(deltaX) > 10) {
      didMove.current = true;
    }

    setDragOffset(deltaX);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = window.innerWidth * 0.15;

    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }

    setDragOffset(0);
    startX.current = null;
    setIsPaused(false);
  };

  const handleLinkClick = (e) => {
    if (didMove.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden group bg-pretoclaro aspect-25/26 md:aspect-21/9 2xl:aspect-25/9 touch-pan-y select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onMouseEnter={() => setIsPaused(true)}
    >
      {/* Track */}
      <div
        className={`flex h-full ${!isDragging ? "transition-transform duration-500 ease-out" : ""}`}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          willChange: "transform",
        }}
      >
        {slides.map((slide) => (
          <Link
            key={slide.id}
            to={slide.link}
            onClick={handleLinkClick}
            className="relative flex-none w-full h-full block"
            draggable={false}
          >
            <picture className="w-full h-full pointer-events-none">
              <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
              <img
                src={slide.mobileImage}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover block"
                draggable={false}
              />
            </picture>
          </Link>
        ))}
      </div>

      {/* Prev / Next — Estilo anterior (quadrado, hover gold) — Sempre visíveis */}
      <button
        onClick={(e) => {
          e.preventDefault();
          prevSlide();
        }}
        aria-label="Slide anterior"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-preto/50 text-branco flex items-center justify-center hover:bg-gold hover:text-preto transition-colors z-30 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          nextSlide();
        }}
        aria-label="Próximo slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-preto/50 text-branco flex items-center justify-center hover:bg-gold hover:text-preto transition-colors z-30 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrentSlide(i);
            }}
            aria-label={`Ir para slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentSlide
                ? "w-6 h-2 bg-gold"
                : "w-2 h-2 bg-branco/40 hover:bg-branco/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
