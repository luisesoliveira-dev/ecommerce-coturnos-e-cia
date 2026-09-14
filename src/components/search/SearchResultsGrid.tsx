import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { CardProduto } from "../ui/CardProduto";
import { formatPrice } from "../../utils/formatPrice";

interface SearchResultsGridProps {
  products: Product[];
  query: string;
  onProductClick?: () => void;
}

export function SearchResultsGrid({
  products,
  query,
  onProductClick,
}: SearchResultsGridProps) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="flex-1 py-10 text-center">
        <p className="font-barlow text-lg text-preto font-semibold mb-2">
          Nenhum produto encontrado para &quot;{query}&quot;
        </p>
        <p className="font-barlow text-sm text-zinc-500">
          Verifique a ortografia ou tente buscar por termos mais genéricos como
          &quot;coturno&quot;, &quot;bota&quot; ou &quot;preto&quot;.
        </p>
      </div>
    );
  }

  // Exibe no máximo os 4 primeiros cards no preview
  const displayedProducts = products.slice(0, 4);

  const handleVerMais = () => {
    onProductClick?.(); // Fecha o overlay
    navigate(`/produtos?busca=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between min-w-0">
      <div>
        {/* Cabeçalho */}
        <div className="flex items-center justify-between h-6 mb-4">
          <h3 className="font-barlow font-bold text-base sm:text-lg text-preto uppercase tracking-wide leading-none">
            Resultados para &quot;{query}&quot;{" "}
            <span className="text-zinc-400 font-normal">
              ({products.length})
            </span>
          </h3>
        </div>

        {/* VERSÃO MOBILE (< 768px): Lista em linhas conforme imagem de referência */}
        <div className="flex flex-col divide-y divide-zinc-100 w-full md:hidden">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/produto/${product.id}`}
              onClick={onProductClick}
              className="flex items-center gap-4 py-3 group w-full"
            >
              {/* Imagem do produto em quadrado bege */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 aspect-square bg-[#F5F0EA] rounded overflow-hidden flex items-center justify-center shrink-0 p-1.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              {/* Informações: Título e Preço */}
              <div className="flex-1 min-w-0">
                <h4 className="font-barlow font-bold text-base text-preto group-hover:text-gold transition-colors leading-snug truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2.5 mt-1">
                  {product.oldPrice && (
                    <span className="font-barlow text-xs sm:text-sm text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="font-barlow font-extrabold text-sm sm:text-base text-army">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* VERSÃO TABLET E DESKTOP (>= 768px): Grade com 4 colunas */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {displayedProducts.map((product) => (
            <div key={product.id} onClick={onProductClick} className="w-full">
              <CardProduto
                id={product.id}
                title={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                defaultImage={product.image}
                hoverImage={product.hoverImage}
                badge={product.badge}
                size="full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Linha divisória inferior (presente na referência mobile) */}
      <div className="w-full border-t border-zinc-200 mt-5 mb-5 lg:mt-3.5 lg:mb-3.5" />

      {/* BOTÃO VER MAIS RESULTADOS — Conforme referência visual */}
      <div className="flex justify-center pb-7 sm:pb-8 lg:pb-4">
        <button
          onClick={handleVerMais}
          className="w-full sm:w-auto px-8 py-3 bg-black text-white font-barlow font-bold text-sm uppercase tracking-wider hover:bg-army transition-colors cursor-pointer rounded shadow-sm text-center"
        >
          Ver mais resultados ({products.length})
        </button>
      </div>
    </div>
  );
}
