import { HorizontalDragScroll } from "../ui/HorizontalDragScroll";

export function ProductGallery({ images }) {
  if (!images || images.length === 0) return null;

  // Limita a exibição a no máximo 12 imagens
  const galleryImages = images.slice(0, 12);

  return (
    <div className="font-barlow">
      {/* MOBILE / TABLET: Scroll Horizontal (< lg) */}
      <div className="lg:hidden -mx-4 sm:-mx-8">
        <HorizontalDragScroll className="gap-2 px-4 sm:px-8 pb-4">
          {(cardRefs) =>
            galleryImages.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="shrink-0 w-[88vw] sm:w-[70vw] aspect-square bg-[#F5F0EA] flex items-center justify-center p-6"
              >
                <img
                  src={img}
                  alt={`Produto detalhe ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply brightness-110 saturate-110"
                />
              </div>
            ))
          }
        </HorizontalDragScroll>
        
        {/* Indicador visual de quantidade para mobile */}
        <div className="px-4 sm:px-8 mt-2 flex gap-1 justify-center">
            {galleryImages.map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-200" />
            ))}
        </div>
      </div>

      {/* DESKTOP: Grid de Imagens - Totalmente em 2 colunas (>= lg) */}
      <div className="hidden lg:grid grid-cols-2 gap-1.5 xl:gap-2">
        {galleryImages.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-square bg-[#F5F0EA] overflow-hidden flex items-center justify-center p-6"
          >
            <img 
              src={img} 
              alt={`Produto detalhe ${idx + 1}`} 
              className="w-full h-full object-contain mix-blend-multiply brightness-110 saturate-110 transition-all duration-500 hover:scale-105 hover:brightness-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

