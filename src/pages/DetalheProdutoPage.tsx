import { ProductDetailContent } from "../components/product/ProductDetailContent";
import { useCart } from "../context/useCart";

export default function DetalheProdutoPage() {
  const { openCart } = useCart();

  return <ProductDetailContent onOpenCart={openCart} />;
}
