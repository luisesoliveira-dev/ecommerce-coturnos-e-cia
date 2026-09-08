import { ProductGallery } from "./ProductGallery";
import { ProductInfo, DetailedProduct } from "./ProductInfo";

export interface ProductViewProps {
  product: DetailedProduct;
  onOpenCart?: () => void;
}

export function ProductView({ product, onOpenCart }: ProductViewProps) {
  return (
    <div className="max-w-390 mx-auto w-full px-4 sm:px-8 pb-20">
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
        {/* Coluna Esquerda: Galeria - Dominante (70%) */}
        <div className="w-full lg:w-[68%] xl:w-[72%]">
          <ProductGallery key={product.id} images={product.images || []} />
        </div>

        {/* Coluna Direita: Info - Compacta (30%) */}
        <div className="w-full lg:w-[32%] xl:w-[28%]">
          <ProductInfo
            key={product.id}
            product={product}
            onOpenCart={onOpenCart}
          />
        </div>
      </div>
    </div>
  );
}
