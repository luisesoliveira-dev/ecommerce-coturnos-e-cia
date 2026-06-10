import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";

export function ProductView({ product }) {
  return (
    <div className="max-w-390 mx-auto w-full px-4 sm:px-8 pb-20">
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
        {/* Coluna Esquerda: Galeria - Dominante (70%) */}
        <div className="w-full lg:w-[68%] xl:w-[72%]">
          <ProductGallery images={product.images} />
        </div>

        {/* Coluna Direita: Info - Compacta (30%) */}
        <div className="w-full lg:w-[32%] xl:w-[28%]">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
