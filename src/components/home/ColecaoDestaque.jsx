import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ColecaoDestaqueBanner } from "./ColecaoDestaqueBanner";
import { CardProduto } from "../ui/CardProduto";
import { HorizontalDragScroll } from "../ui/HorizontalDragScroll";

export function ColecaoDestaque({ 
  title = "O Clássico Reimaginado", 
  banner, 
  items = [] 
}) {
  const [page, setPage] = useState(0);

  const desktopScrollRef = useRef(null);
  const desktopCardRefs = useRef([]);

  const rafId = useRef(null);
  const total = items?.length || 0;

  // ── Scroll suave com easing (botões de navegação) ─────
  const smoothScrollTo = useCallback((el, targetLeft) => {
    if (!el) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const start = el.scrollLeft;
    const distance = targetLeft - start;
    const duration = 420;
    let startTime = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + distance * ease(progress);
      if (progress < 1) rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, []);

  // ── Navegação (desktop) ────────────────────────────────
  const goTo = useCallback(
    (idx) => {
      if (total === 0) return;
      const next = ((idx % total) + total) % total;
      setPage(next);
      const el = desktopScrollRef.current;
      const ref = desktopCardRefs.current[next];
      if (el && ref) {
        const containerLeft = el.getBoundingClientRect().left;
        const targetLeft =
          ref.getBoundingClientRect().left - containerLeft + el.scrollLeft;
        smoothScrollTo(el, targetLeft);
      }
    },
    [total, smoothScrollTo],
  );

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full overflow-hidden py-10 sm:py-16 font-barlow">
      <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
        {/* CABEÇALHO */}
        <div className="flex justify-between items-end mb-4 sm:mb-6">
          <div>
            <h2 className="text-[18px] sm:text-2xl lg:text-3xl font-black uppercase text-preto tracking-tight">
              {title}
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => goTo(page - 1)}
              className="w-10 h-10 border-2 border-preto flex items-center justify-center text-preto hover:bg-army hover:text-branco hover:border-preto transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(page + 1)}
              className="w-10 h-10 border-2 border-preto flex items-center justify-center text-preto hover:bg-army hover:text-branco hover:border-preto transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* MOBILE/TABLET */}
        <div className="lg:hidden flex flex-col gap-2">
          <div className="w-full aspect-16/9.5 overflow-hidden sm:w-[calc(100%+16px)]">
            {banner && (
              <ColecaoDestaqueBanner
                image={banner.image}
                alt={banner.alt}
              />
            )}
          </div>
          <HorizontalDragScroll className="gap-2 pb-2">
            {(cardRefs) =>
              items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="shrink-0 w-[calc(50%-6px)] sm:w-[calc(46%-6px)] md:w-[calc(39%-6px)]"
                >
                  <CardProduto
                    id={item.id}
                    title={item.name}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    defaultImage={item.image}
                    hoverImage={item.hoverImage}
                    badge={item.badge}
                    size="full"
                  />
                </div>
              ))
            }
          </HorizontalDragScroll>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex gap-3 items-start">
          <div className="w-[46%] shrink-0 lg:aspect-[17/11.26] xl:aspect-[17/11.33] overflow-hidden">
            {banner && (
              <ColecaoDestaqueBanner
                image={banner.image}
                alt={banner.alt}
              />
            )}
          </div>
          <HorizontalDragScroll
            ref={desktopScrollRef}
            className="gap-3 flex-1 min-w-0"
            trailingPadding={false}
          >
            {(cardRefs) =>
              items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                    desktopCardRefs.current[i] = el;
                  }}
                  className="shrink-0 w-[calc(50%-6px)]"
                >
                  <CardProduto
                    id={item.id}
                    title={item.name}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    defaultImage={item.image}
                    hoverImage={item.hoverImage}
                    badge={item.badge}
                    size="full"
                  />
                </div>
              ))
            }
          </HorizontalDragScroll>
        </div>
      </div>
    </section>
  );
}
