import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb } from "./Breadcrumb";
import { ProductView } from "./ProductView";
import { NewsletterSection } from "../sections/NewsletterSection";
import { produtos } from "../../data/produtos";
import { productMock } from "../../data/productDetail";
import type { DetailedProduct } from "./ProductInfo";

interface ProductDetailContentProps {
  onOpenCart: () => void;
}

export function ProductDetailContent({
  onOpenCart,
}: ProductDetailContentProps) {
  const { id } = useParams<{ id: string }>();

  const productFound = produtos.find(
    (p) => p.id === (id ? parseInt(id, 10) : NaN),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!productFound) {
    return (
      <div className="max-w-390 mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black uppercase tracking-normal">
          Produto não encontrado
        </h1>
        <p className="text-gray-500 mt-4 mb-8">
          O item que você está procurando não existe ou foi removido.
        </p>
        <Link
          to="/produtos"
          className="bg-army text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  const productData: DetailedProduct = {
    ...productMock,
    ...productFound,
  };

  return (
    <>
      <Breadcrumb productName={productData.name} />
      <ProductView product={productData} onOpenCart={onOpenCart} />
      <NewsletterSection />
    </>
  );
}
