import { CardProduto } from "../ui/CardProduto";

export function ProductGrid({ products, filtersVisible }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center font-barlow">
        <svg
          className="w-12 h-12 text-gray-200 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <p className="text-[15px] font-bold text-gray-400 uppercase tracking-widest">
          Nenhum produto encontrado
        </p>
        <p className="text-[13px] text-gray-300 mt-1">
          Tente ajustar os filtros
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid transition-all duration-300 ${
        filtersVisible
          ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-6"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 lg:gap-6 xl:gap-6"
      }`}
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${i * 30}ms` }}
        >
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
  );
}
