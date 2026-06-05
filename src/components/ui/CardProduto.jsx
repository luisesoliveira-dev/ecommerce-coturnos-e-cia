export function CardProduto({
  title,
  price,
  oldPrice,
  defaultImage,
  hoverImage,
  size = "md",
}) {
  const sizes = {
    sm: "w-44",
    md: "w-56",
    lg: "w-72",
    xl: "w-80",
    full: "w-full",
  };

  return (
    <div
      className={`group ${sizes[size]} flex flex-col bg-transparent border border-transparent hover:border-gold cursor-pointer`}
    >
      {/* IMAGEM */}
      <div className="relative w-full aspect-17/20 overflow-hidden flex items-center justify-center bg-[#F5F0EA]">
        <img
          src={defaultImage}
          alt={`${title} - Vista padrão`}
          className="brightness-110 absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
        <img
          src={hoverImage || defaultImage}
          alt={`${title} - Vista em detalhe`}
          className="saturate-110 brightness-110 absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* INFO */}
      <div className="mt-3 text-left px-1 pb-1">
        <h3 className="font-barlow text-[13px] sm:text-[15px] font-bold text-preto leading-snug ">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-barlow text-[13px] sm:text-[15px] text-army font-extrabold">
            {price}
          </p>
          {oldPrice && (
            <p className="font-barlow text-[11px] sm:text-[13px] text-gray-500 line-through">
              {oldPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
