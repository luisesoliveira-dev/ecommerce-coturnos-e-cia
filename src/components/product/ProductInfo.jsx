import { useState, useEffect } from "react";
import { ShoppingBag, ChevronRight, Truck, AlertCircle } from "lucide-react";
import { useCart } from "../../context/useCart";
import { motion } from "framer-motion";

export function ProductInfo({ product, onOpenCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.id || "",
  );
  const [cep, setCep] = useState("");
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const { addToCart } = useCart();

  // Remove a notificação após 4 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCart = () => {
    // Se não selecionou tamanho, marca erro
    if (!selectedSize) {
      setNotification({ type: "error" });
      return;
    }

    // Se chegou aqui, o tamanho está selecionado.
    setNotification(null);

    const colorName =
      product.colors?.find((c) => c.id === selectedColor)?.name || "Padrão";
    addToCart(product, 1, selectedSize, colorName);

    if (onOpenCart) onOpenCart();
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setCep(value);
  };

  const productSizes = product.sizes || product.tamanhos || [];

  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-32 h-fit font-barlow">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <span className="text-army font-bold uppercase tracking-widest text-xs">
          Premium Collection
        </span>
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black uppercase tracking-tighter leading-none text-preto">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xl lg:text-2xl font-bold text-preto">
            {typeof product.price === "number"
              ? `R$ ${product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`
              : product.price}
          </span>
          {product.oldPrice && (
            <span className="text-base lg:text-lg text-gray-400 line-through">
              {typeof product.oldPrice === "number"
                ? `R$ ${product.oldPrice.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`
                : product.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Seletor de Cores */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-wider text-preto">
            Cor:
            <span className="text-gray-500 font-medium ml-2 uppercase">
              {product.colors.find((c) => c.id === selectedColor)?.name}
            </span>
          </span>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                  selectedColor === color.id
                    ? "border-gold scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Seletor de Tamanhos */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-bold uppercase tracking-wider transition-colors ${notification?.type === "error" ? "text-red-600" : "text-preto"}`}
          >
            Selecione o Tamanho
          </span>
          <button className="text-xs underline text-gray-500 hover:text-black uppercase cursor-pointer">
            Guia de Medidas
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {productSizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setNotification(null);
              }}
              className={`py-3 text-sm font-bold border transition-all cursor-pointer ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : notification?.type === "error"
                    ? "bg-white text-red-600 border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]"
                    : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {notification?.type === "error" && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[11px] font-bold uppercase tracking-widest text-red-600 mt-1 flex items-center gap-1"
          >
            <AlertCircle size={12} /> Seleção obrigatória: Escolha um número
          </motion.span>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-army hover:bg-black text-white py-6 flex items-center justify-center gap-3 transition-colors duration-300 group cursor-pointer"
      >
        <ShoppingBag
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
        <span className="font-bold uppercase tracking-widest">
          Adicionar ao Carrinho
        </span>
      </button>

      {/* Cálculo de Frete */}
      <div className="flex flex-col gap-4 p-5 bg-gray-50 border border-gray-100 rounded-sm">
        <div className="flex items-center gap-2 text-preto">
          <Truck size={18} strokeWidth={2.5} />
          <span className="text-sm font-bold uppercase tracking-wider">
            Calcular Frete
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="00000-000"
            maxLength={9}
            value={cep}
            onChange={handleCepChange}
            className="w-full min-w-0 bg-white border border-gray-200 px-3 xl:px-4 py-3 text-sm font-medium focus:border-army focus:outline-none transition-colors"
          />
          <button className="bg-preto text-white px-4 xl:px-6 py-3 text-[10px] xl:text-xs font-bold uppercase tracking-widest hover:bg-army transition-colors shrink-0 flex items-center justify-center leading-none pt-3.25 pb-2.75 cursor-pointer">
            Calcular
          </button>
        </div>
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold uppercase tracking-tight text-gray-400 hover:text-army transition-colors underline underline-offset-2"
        >
          Não sei meu CEP
        </a>
      </div>

      {/* Bloco de Informações Accordion */}
      <div className="border-t border-gray-100 mt-4">
        {/* 1. Características do Produto */}
        <div className="border-b border-gray-100 py-3.5">
          <button
            onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
            className="w-full flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-preto group cursor-pointer"
          >
            Características do Produto
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isFeaturesOpen ? "rotate-90" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${isFeaturesOpen ? "max-h-60 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="text-gray-500 text-[13px] leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* 2. Especificações Técnicas */}
        <div className="border-b border-gray-100 py-3.5">
          <button
            onClick={() => setIsSpecsOpen(!isSpecsOpen)}
            className="w-full flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-preto group cursor-pointer"
          >
            Especificações Técnicas
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isSpecsOpen ? "rotate-90" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${isSpecsOpen ? "max-h-60 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <ul className="text-gray-500 text-[13px] leading-relaxed space-y-1">
              {product.material && (
                <li>
                  <span className="font-bold text-preto uppercase text-[11px]">
                    Material:
                  </span>{" "}
                  {product.material}
                </li>
              )}
              {product.terreno && (
                <li>
                  <span className="font-bold text-preto uppercase text-[11px]">
                    Terreno Ideal:
                  </span>{" "}
                  {product.terreno}
                </li>
              )}
              {product.marca && (
                <li>
                  <span className="font-bold text-preto uppercase text-[11px]">
                    Marca:
                  </span>{" "}
                  {product.marca}
                </li>
              )}
              <li>
                <span className="font-bold text-preto uppercase text-[11px]">
                  Tipo:
                </span>{" "}
                {product.tipo || "Coturno Tático"}
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Devolução do Produto */}
        <div className="border-b border-gray-100 py-3.5">
          <button
            onClick={() => setIsReturnOpen(!isReturnOpen)}
            className="w-full flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-preto group cursor-pointer"
          >
            Devolução do Produto
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isReturnOpen ? "rotate-90" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${isReturnOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="text-gray-500 text-[13px] leading-relaxed">
              Nossa política de devolução é simples e rápida. Você tem até
              <span className="text-preto font-bold"> 7 dias corridos </span>
              após o recebimento para solicitar a devolução gratuita. O produto
              deve estar em sua embalagem original e sem sinais de uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
