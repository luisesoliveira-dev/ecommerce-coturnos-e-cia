import { useState } from "react";
import { ShoppingBag, ChevronRight, Truck } from "lucide-react";

export function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].id);
  const [cep, setCep] = useState("");

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove o que não é dígito
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setCep(value);
  };

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
              className={`w-10 h-10 rounded-full border-2 transition-all ${
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

      {/* Seletor de Tamanhos */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-preto">
            Selecione o Tamanho
          </span>
          <button className="text-xs underline text-gray-500 hover:text-black uppercase">
            Guia de Medidas
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm font-bold border transition-all ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-army hover:bg-black text-white py-6 flex items-center justify-center gap-3 transition-colors duration-300 group">
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
          <button className="bg-preto text-white px-4 xl:px-6 py-3 text-[10px] xl:text-xs font-bold uppercase tracking-widest hover:bg-army transition-colors shrink-0 flex items-center justify-center leading-none pt-3.25 pb-2.75">
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

      {/* Descrição */}
      <div className="border-t border-gray-100 pt-8 mt-4">
        <p className="text-gray-600 leading-relaxed font-medium">
          {product.description}
        </p>
        <button className="flex items-center gap-1 mt-6 text-sm font-bold uppercase tracking-tighter hover:gap-2 transition-all">
          Especificações Técnicas <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
