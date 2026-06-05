import { useState, useRef, useEffect, useCallback } from "react";
import { produtos, tabsProdutos } from "../../data/produtos";
import { CardProduto } from "../ui/CardProduto";
import { HorizontalDragScroll } from "../ui/HorizontalDragScroll";

const TABS_ALLOWED = ["lancamentos", "classicos", "promocao"];
const vitrineTabs = tabsProdutos.filter((t) => TABS_ALLOWED.includes(t.id));

const THUMB_PCT = 25;

export const VitrineProdutos = () => {
  const [activeTab, setActiveTab] = useState(
    vitrineTabs[0]?.id ?? "lancamentos",
  );
  const [progress, setProgress] = useState(0);

  const scrollRef = useRef(null);
  const lastCardRef = useRef(null);

  const filteredProducts = produtos.filter((p) => p.category === activeTab);

  /* ── Progresso do scroll ── */
  /* max = scrollLeft necessário para o último card ficar totalmente visível
     à direita do container. Isso ignora o padding extra do trailingPadding. */
  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    const lastCard = lastCardRef.current;
    if (!el || !lastCard) return;
    // offsetLeft do último card em relação ao scroll container
    const lastCardOffsetLeft = lastCard.offsetLeft;
    const lastCardWidth = lastCard.offsetWidth;
    const containerWidth = el.clientWidth;
    // scrollLeft necessário para o RIGHT do último card bater na borda direita do container
    const max = lastCardOffsetLeft + lastCardWidth - containerWidth;
    setProgress(max > 0 ? Math.min(el.scrollLeft / max, 1) : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    setProgress(0);
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, [activeTab, updateProgress]);

  const thumbTranslateX = progress * (100 - THUMB_PCT);

  /* ── Cabeçalho — só pills alinhadas à direita ── */
  const Header = (
    <div className="flex items-center justify-start mb-8">
      <div className="flex items-center gap-2">
        {vitrineTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative px-1.5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-[11px] sm:text-sm lg:text-base font-bold uppercase tracking-widest sm:tracking-[0.12em]",
                "border transition-all duration-150 cursor-pointer select-none whitespace-nowrap",
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-gray-800",
              ].join(" ")}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-0.75 left-1/2 -translate-x-1/2 w-8 h-0.75 bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Barra de progresso ── */
  const ProgressBar = (
    <div className="mt-5">
      <div className="relative w-full h-0.75 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-army rounded-full transition-transform duration-75 ease-out"
          style={{
            width: `${THUMB_PCT}%`,
            transform: `translateX(${thumbTranslateX * (100 / THUMB_PCT)}%)`,
          }}
        />
      </div>
    </div>
  );

  return (
    <section className="w-full py-10 sm:py-16 font-barlow overflow-hidden">
      <div className="max-w-360 mx-auto w-full px-4 sm:px-8">
        {Header}

        {/* ── MOBILE / TABLET / DESKTOP lg — carrossel + barra (< 1280px) ── */}
        <div className="xl:hidden">
          <HorizontalDragScroll ref={scrollRef} className="gap-2 pb-2">
            {(cardRefs) =>
              filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                    if (i === filteredProducts.length - 1)
                      lastCardRef.current = el;
                  }}
                  className="shrink-0 w-[calc(50%-6px)] sm:w-[calc(46%-6px)] md:w-[calc(39%-6px)] lg:w-[calc(25%-9px)]"
                >
                  <CardProduto
                    title={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    defaultImage={product.image}
                    hoverImage={product.hoverImage}
                    badge={product.badge}
                    size="full"
                  />
                </div>
              ))
            }
          </HorizontalDragScroll>
          {ProgressBar}
        </div>

        {/* ── DESKTOP xl (≥ 1280px) — grid 5 colunas, sem barra ── */}
        <div className="hidden xl:grid grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <CardProduto
              key={product.id}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              defaultImage={product.image}
              hoverImage={product.hoverImage}
              badge={product.badge}
              size="full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
