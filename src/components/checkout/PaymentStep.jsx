import { CreditCard, QrCode, Barcode, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function PaymentStep({ paymentMethod, setPaymentMethod, total }) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="text-army" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Forma de Pagamento
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        <button
          onClick={() => setPaymentMethod("credit_card")}
          className={`p-4 sm:p-6 border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all cursor-pointer ${
            paymentMethod === "credit_card" ? "border-army bg-army/5" : "border-gray-100 bg-white hover:border-army/30"
          }`}
        >
          <CreditCard className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "credit_card" ? "text-army" : "text-gray-400"}`} />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Cartão de Crédito</span>
        </button>
        <button
          onClick={() => setPaymentMethod("pix")}
          className={`p-4 sm:p-6 border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all cursor-pointer ${
            paymentMethod === "pix" ? "border-army bg-army/5" : "border-gray-100 bg-white hover:border-army/30"
          }`}
        >
          <QrCode className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "pix" ? "text-army" : "text-gray-400"}`} />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">PIX (5% OFF)</span>
        </button>
        <button
          onClick={() => setPaymentMethod("boleto")}
          className={`p-4 sm:p-6 border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all cursor-pointer ${
            paymentMethod === "boleto" ? "border-army bg-army/5" : "border-gray-100 bg-white hover:border-army/30"
          }`}
        >
          <Barcode className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "boleto" ? "text-army" : "text-gray-400"}`} />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Boleto Bancário</span>
        </button>
      </div>

      {paymentMethod === "credit_card" && (
        <div className="bg-white p-5 sm:p-8 border border-gray-100 space-y-4 sm:space-y-6 animate-fadeUp">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Número do Cartão</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] sm:text-sm focus:border-army outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Nome no Cartão</label>
            <input
              type="text"
              placeholder="Como impresso no cartão"
              className="bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] sm:text-sm focus:border-army outline-none transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Validade</label>
              <input
                type="text"
                placeholder="MM/AA"
                className="bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] sm:text-sm focus:border-army outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] sm:text-sm focus:border-army outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Parcelamento</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] sm:text-sm focus:border-army outline-none transition-colors cursor-pointer appearance-none">
                <option>1x de R$ {total.toFixed(2).replace(".", ",")} sem juros</option>
                <option>2x de R$ {(total / 2).toFixed(2).replace(".", ",")} sem juros</option>
                <option>3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros</option>
                <option>6x de R$ {(total / 6).toFixed(2).replace(".", ",")} com juros</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>
      )}


      {paymentMethod === "pix" && (
        <div className="bg-white p-8 border border-gray-100 flex flex-col items-center text-center gap-6 animate-fadeUp">
          <div className="w-48 h-48 bg-gray-50 flex items-center justify-center p-4 border border-dashed border-gray-200">
            <QrCode size={120} strokeWidth={1} className="text-army" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest">
              Escaneie o QR Code
            </p>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              A confirmação é instantânea após o pagamento.
            </p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-army underline underline-offset-4 cursor-pointer">
            Copiar código PIX
          </button>
        </div>
      )}

      {paymentMethod === "boleto" && (
        <div className="bg-white p-8 border border-gray-100 flex flex-col items-center text-center gap-6 animate-fadeUp">
          <Barcode size={64} strokeWidth={1.5} className="text-gray-400" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest">
              Boleto Bancário
            </p>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              A compensação pode levar até 48 horas úteis.
            </p>
          </div>
          <button className="bg-gray-50 border border-gray-100 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors cursor-pointer">
            Visualizar Boleto
          </button>
        </div>
      )}
    </motion.div>
  );
}
