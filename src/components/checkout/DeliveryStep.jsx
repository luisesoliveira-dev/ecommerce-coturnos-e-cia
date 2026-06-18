import { Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function DeliveryStep() {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Truck className="text-army" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Dados de Entrega
        </h2>
      </div>

      {/* Bloco de Endereço Salvo */}
      <div className="bg-white p-4 sm:p-8 border border-gray-100 relative group">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-army/10 rounded-full flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-army sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <span className="text-[12px] sm:text-sm font-black uppercase tracking-widest text-black">Casa</span>
              <span className="bg-army text-white text-[8px] sm:text-[9px] font-black px-1.5 sm:px-2 py-0.5 uppercase tracking-tighter">Principal</span>
            </div>
            <p className="text-[12px] sm:text-sm text-gray-500 font-medium leading-relaxed">
              Avenida das Missões, 1500 - Bloco C, Apto 42<br />
              Bairro Tático, São Paulo - SP<br />
              CEP: 01234-567
            </p>
            <div className="flex gap-4 mt-3 sm:mt-4">
              <button className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-army underline underline-offset-4 hover:text-black transition-colors cursor-pointer">
                Editar
              </button>
              <button className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 underline underline-offset-4 hover:text-black transition-colors cursor-pointer">
                Escolher outro...
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] sm:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
          Método de Envio
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Opção Entrega */}
          <label className="flex items-center justify-between p-3.5 sm:p-5 border-2 border-army bg-army/5 cursor-pointer group transition-all">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-army flex items-center justify-center">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-army"></div>
              </div>
              <div>
                <span className="block font-bold text-[12px] sm:text-sm uppercase tracking-widest group-hover:text-army transition-colors">Entrega Padrão</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-tight mt-0.5">Até 7 dias úteis • Correios / Loggi</span>
              </div>
            </div>
            <span className="font-black text-[12px] sm:text-sm text-army shrink-0 ml-2">R$ 25,90</span>
          </label>

          {/* Opção Retirada */}
          <label className="flex items-center justify-between p-3.5 sm:p-5 border border-gray-200 bg-white hover:border-army/50 cursor-pointer group transition-all">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-200 group-hover:border-army/50"></div>
              <div>
                <span className="block font-bold text-[12px] sm:text-sm uppercase tracking-widest group-hover:text-black">Retirada em Loja</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-tight mt-0.5">Pronto em até 2 horas • Loja Matriz</span>
              </div>
            </div>
            <span className="font-black text-[12px] sm:text-sm text-green-600 uppercase italic shrink-0 ml-2">Grátis</span>
          </label>
        </div>
      </div>

    </motion.div>
  );
}
