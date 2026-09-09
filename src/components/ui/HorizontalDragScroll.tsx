import React, { useRef, useCallback, forwardRef, ReactNode } from "react";

const FRICTION = 0.93;

export interface HorizontalDragScrollProps {
  children: (
    cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  ) => ReactNode;
  className?: string;
  trailingPadding?: boolean;
}

export const HorizontalDragScroll = forwardRef<
  HTMLDivElement,
  HorizontalDragScrollProps
>(function HorizontalDragScroll(
  { children, className = "", trailingPadding = true },
  ref,
) {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const scrollRef =
    (ref as React.RefObject<HTMLDivElement | null>) ?? internalRef;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const startSL = useRef(0);
  const velX = useRef(0);
  const prevX = useRef(0);
  const prevT = useRef(0);
  const rafId = useRef<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // ── Scroll suave com easing ────────────────────────────
  const smoothScrollTo = useCallback(
    (el: HTMLDivElement | null, targetLeft: number) => {
      if (!el) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const start = el.scrollLeft;
      const distance = targetLeft - start;
      const duration = 420;
      let startTime: number | null = null;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.scrollLeft = start + distance * ease(progress);
        if (progress < 1) rafId.current = requestAnimationFrame(tick);
      };
      rafId.current = requestAnimationFrame(tick);
    },
    [],
  );

  // ── Snap ao card mais próximo ──────────────────────────
  const snapToNearest = useCallback(
    (scrollEl: HTMLDivElement | null) => {
      if (!scrollEl || !cardRefs.current?.length) return;
      const scrollLeft = scrollEl.scrollLeft;
      const containerLeft = scrollEl.getBoundingClientRect().left;

      let bestIdx = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cardLeft =
          el.getBoundingClientRect().left - containerLeft + scrollLeft;
        const dist = Math.abs(scrollLeft - cardLeft);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      const currentEl = cardRefs.current[bestIdx];
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const cardLeft = rect.left - containerLeft + scrollLeft;
        const halfCard = rect.width / 2;
        const overshoot = scrollLeft - cardLeft;
        const targetIdx =
          overshoot > halfCard
            ? Math.min(bestIdx + 1, cardRefs.current.length - 1)
            : overshoot < -halfCard
              ? Math.max(bestIdx - 1, 0)
              : bestIdx;

        const targetEl = cardRefs.current[targetIdx];
        if (targetEl) {
          const targetLeft =
            targetEl.getBoundingClientRect().left - containerLeft + scrollLeft;
          smoothScrollTo(scrollEl, targetLeft);
        }
      }
    },
    [smoothScrollTo],
  );

  // ── Inércia ────────────────────────────────────────────
  const runMomentum = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const tick = () => {
      const el = scrollRef.current;
      if (!el) return;
      if (Math.abs(velX.current) < 0.5) {
        snapToNearest(el);
        return;
      }
      el.scrollLeft += velX.current;
      velX.current *= FRICTION;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, [snapToNearest, scrollRef]);

  // ── Touch ──────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0].clientX;
    },
    [],
  );

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    snapToNearest(scrollRef.current);
    touchStartX.current = null;
    touchEndX.current = null;
  }, [snapToNearest, scrollRef]);

  // ── Drag mouse ─────────────────────────────────────────
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      isDragging.current = true;
      didDrag.current = false;
      startX.current = e.pageX;
      startSL.current = scrollRef.current?.scrollLeft ?? 0;
      prevX.current = e.pageX;
      prevT.current = performance.now();
      velX.current = 0;
    },
    [scrollRef],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const dx = e.pageX - startX.current;
      if (Math.abs(dx) > 4) didDrag.current = true;
      if (scrollRef.current)
        scrollRef.current.scrollLeft = startSL.current - dx;
      const now = performance.now();
      const dt = now - prevT.current;
      if (dt > 0) velX.current = (-(e.pageX - prevX.current) / dt) * 16;
      prevX.current = e.pageX;
      prevT.current = now;
    },
    [scrollRef],
  );

  const finishDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | null) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (!didDrag.current) return;
      if (e?.stopPropagation) e.stopPropagation();
      if (Math.abs(velX.current) < 1) snapToNearest(scrollRef.current);
      else runMomentum();
    },
    [snapToNearest, runMomentum, scrollRef],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => finishDrag(e),
    [finishDrag],
  );
  const onMouseLeave = useCallback(() => finishDrag(null), [finishDrag]);

  // Bloqueia cliques se houve arrasto
  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto cursor-grab active:cursor-grabbing select-none ${trailingPadding ? "-mr-4 sm:-mr-8 pr-10 sm:pr-16" : ""} ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onClickCapture={onClickCapture}
    >
      {children(cardRefs)}
    </div>
  );
});
