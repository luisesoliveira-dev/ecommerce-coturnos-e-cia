import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HorizontalDragScroll } from "../ui/HorizontalDragScroll";
import { useScrollLock } from "../../hooks/useScrollLock";

export function ProductGallery({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Trava o scroll do body quando o modal está aberto
  useScrollLock(isModalOpen);

  if (!images || images.length === 0) return null;

  // Limita a exibição a no máximo 12 imagens
  const galleryImages = images.slice(0, 12);

  const openModal = (index) => {
    setSelectedImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImgIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <div className="font-barlow">
      {/* MOBILE / TABLET: Scroll Horizontal (< lg) */}
      <div className="lg:hidden -mx-4 sm:-mx-8">
        <HorizontalDragScroll className="gap-2 pb-4" trailingPadding={false}>
          {(cardRefs) =>
            galleryImages.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => openModal(idx)}
                className="shrink-0 w-[calc(100vw-clamp(32px,10vw,80px))] aspect-[4/5.12] bg-[#F5F0EA] flex items-center justify-center p-6 cursor-zoom-in"
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

        <div className="px-4 sm:px-8 mt-2 flex gap-1 justify-center">
          {galleryImages.map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${selectedImgIndex === i ? "bg-army" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: Grid de Imagens (>= lg) */}
      <div className="hidden lg:grid grid-cols-2 gap-1.5 xl:gap-2">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="aspect-[4/5.12] bg-[#F5F0EA] overflow-hidden flex items-center justify-center p-6 cursor-zoom-in"
          >
            <img
              src={img}
              alt={`Produto detalhe ${idx + 1}`}
              className="w-full h-full object-contain mix-blend-multiply brightness-110 saturate-110 transition-all duration-500 hover:scale-105 hover:brightness-100"
            />
          </div>
        ))}
      </div>

      {/* MODAL TELA CHEIA (LIGHTBOX) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 bg-white flex flex-col lg:flex-row"
          onClick={closeModal}
        >
          {/* BOTÃO FECHAR */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-110 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={24} className="text-preto" />
          </button>

          {/* GALERIA LATERAL (DESKTOP) / INFERIOR (MOBILE) */}
          <div
            className="order-2 lg:order-1 w-full lg:w-24 xl:w-32 bg-gray-50 border-t lg:border-t-0 lg:border-r border-gray-100 p-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`shrink-0 w-16 lg:w-full aspect-square bg-white border-2 transition-all ${
                  selectedImgIndex === idx
                    ? "border-gold"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain mix-blend-multiply p-1"
                  alt={`Miniatura ${idx}`}
                />
              </button>
            ))}
          </div>

          {/* ÁREA DA IMAGEM PRINCIPAL */}
          <div className="order-1 lg:order-2 flex-1 relative flex items-center justify-center bg-white p-4 lg:p-12 overflow-hidden">
            {/* Setas de navegação */}
            <button
              onClick={prevImage}
              className="absolute left-4 lg:left-8 z-110 p-3 bg-gray-50/80 rounded-full hover:bg-gray-100 transition-colors hidden md:block"
            >
              <ChevronLeft size={30} />
            </button>

            <img
              src={galleryImages[selectedImgIndex]}
              className="max-w-full max-h-full object-contain select-none transition-all duration-500 animate-in fade-in zoom-in"
              alt="Produto em tela cheia"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={nextImage}
              className="absolute right-4 lg:right-8 z-110 p-3 bg-gray-50/80 rounded-full hover:bg-gray-100 transition-colors hidden md:block"
            >
              <ChevronRight size={30} />
            </button>

            {/* Contador Mobile */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest text-gray-400 lg:hidden">
              {selectedImgIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
