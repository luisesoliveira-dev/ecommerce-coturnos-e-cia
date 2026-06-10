import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SecondaryCarousel = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(null);
  const didMove = useRef(false);
  const AUTOPLAY_INTERVAL = 4000;

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || isDragging || slides.length === 0) return;
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, isDragging, slides.length]);

  const onDragStart = (clientX) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = clientX;
    didMove.current = false;
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX.current;
    if (Math.abs(deltaX) > 10) didMove.current = true;
    setDragOffset(deltaX);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = window.innerWidth * 0.15;
    if (dragOffset < -threshold) nextSlide();
    else if (dragOffset > threshold) prevSlide();
    setDragOffset(0);
    startX.current = null;
    setIsPaused(false);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="w-full bg-branco">
      <div
        className={`relative w-full overflow-hidden group bg-gray-100 aspect-[2.2/1] md:aspect-21/4 lg:aspect-21/3 touch-pan-y select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
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
              onClick={(e) => didMove.current && e.preventDefault()}
              className="relative flex-none w-full h-full block"
              draggable={false}
            >
              <picture className="w-full h-full pointer-events-none">
                <source
                  media="(min-width: 768px)"
                  srcSet={slide.desktopImage}
                />
                <img
                  src={slide.mobileImage}
                  alt={`Slide Promo ${slide.id}`}
                  className="w-full h-full object-cover block"
                  draggable={false}
                />
              </picture>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-preto/30 text-branco border border-transparent hover:border-preto hover:bg-gold hover:text-preto transition-all z-30 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-preto/30 text-branco border border-transparent hover:border-preto hover:bg-gold hover:text-preto transition-all z-30 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
