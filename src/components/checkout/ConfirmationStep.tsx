import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ConfirmationStep() {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center space-y-8"
    >
      <div className="w-24 h-24 bg-army text-white rounded-full flex items-center justify-center shadow-[0_0_0_12px_rgba(74,92,58,0.1)]">
        <CheckCircle2 size={48} strokeWidth={2.5} />
      </div>
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Pedido Realizado!</h2>
        <p className="text-army font-bold uppercase tracking-widest text-xs mt-4">Nº do Pedido: #CC-92841</p>
      </div>
      <p className="text-gray-500 text-sm max-w-md mx-auto">
        Enviamos um e-mail de confirmação para <span className="text-black font-bold">seuemail@email.com</span> com todos os detalhes da sua compra.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          to="/produtos"
          className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-army transition-colors text-xs"
        >
          Continuar Comprando
        </Link>
        <button className="border-2 border-black px-10 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all text-xs cursor-pointer">
          Acompanhar Pedido
        </button>
      </div>
    </motion.div>
  );
}
