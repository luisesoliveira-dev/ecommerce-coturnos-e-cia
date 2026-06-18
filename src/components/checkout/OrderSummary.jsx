import { ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";

export function OrderSummary({
  subtotal,
  shipping,
  total,
  paymentMethod,
  currentStep,
  onNextStep,
  onPrevStep,
}) {
  const pixDiscount =
    paymentMethod === "pix" && currentStep >= 3 ? subtotal * 0.05 : 0;
  const finalTotal = total - pixDiscount;

  return (
    <div className="lg:sticky lg:top-32 space-y-6">
      <div className="bg-white p-6 sm:p-8 border border-gray-100 rounded-sm">
        <h3 className="text-lg font-black uppercase tracking-tighter mb-6 border-b border-gray-50 pb-4">
          Resumo do Pedido
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>Subtotal</span>
            <span className="text-black">
              R${" "}
              {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>Frete</span>
            <span className="text-black">
              {shipping > 0
                ? `R$ ${shipping.toFixed(2).replace(".", ",")}`
                : "A calcular"}
            </span>
          </div>
          {pixDiscount > 0 && (
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-army">
              <span>Desconto PIX (5%)</span>
              <span>- R$ {pixDiscount.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
            <span className="font-black uppercase tracking-widest text-sm">
              Total
            </span>
            <span className="font-black text-2xl sm:text-3xl leading-none">
              R$ {finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {currentStep === 1 && (
            <button
              onClick={onNextStep}
              className="w-full bg-army hover:bg-black text-white py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              Continuar
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
          {currentStep === 2 && (
            <button
              onClick={onNextStep}
              className="w-full bg-army hover:bg-black text-white py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              Continuar
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
          {currentStep === 3 && (
            <button
              onClick={onNextStep}
              className="w-full bg-black hover:bg-army text-white py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              Finalizar
              <CheckCircle2
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          )}

          <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-50">
            {currentStep > 1 && (
              <button
                onClick={onPrevStep}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1 transition-colors cursor-pointer mb-2"
              >
                <ArrowLeft size={12} /> Voltar para etapa anterior
              </button>
            )}
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-gray-100 rounded-sm"></div>
              <div className="w-8 h-5 bg-gray-100 rounded-sm"></div>
              <div className="w-8 h-5 bg-gray-100 rounded-sm"></div>
              <div className="w-8 h-5 bg-gray-100 rounded-sm"></div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
              <CheckCircle2 size={12} className="text-army" /> Compra 100% Segura
            </span>
          </div>
        </div>
      </div>

      <div className="bg-black p-6 text-white flex items-center justify-between group cursor-pointer">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-widest opacity-60">Dúvidas?</span>
          <span className="block text-xs font-bold uppercase tracking-widest">Fale com um especialista</span>
        </div>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
