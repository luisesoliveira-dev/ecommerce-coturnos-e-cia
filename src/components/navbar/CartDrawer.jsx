import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { useScrollLock } from "../../hooks/useScrollLock";

export function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Trava o scroll do body quando o carrinho está aberto
  useScrollLock(isOpen);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-100 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-110 shadow-2xl flex flex-col font-barlow"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-army" />
                <h2 className="text-lg font-black uppercase tracking-widest text-preto">
                  Meu Carrinho{" "}
                  <span className="text-gray-400 font-bold ml-1">
                    ({cartItems.length})
                  </span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={24} className="text-preto" />
              </button>
            </div>

            {/* Conteúdo do Carrinho */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar flex flex-col">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-24 h-24 bg-army/10 rounded-full flex items-center justify-center mb-8">
                    <ShoppingBag size={48} className="text-army" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-preto tracking-tighter">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-240px">
                    Explore nossa coleção e encontre o coturno ideal para sua
                    próxima missão.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-10 bg-army text-white px-10 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-preto transition-colors shadow-lg cursor-pointer"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartKey}
                      className="flex gap-4 group items-start"
                    >
                      <div className="w-32 h-38 bg-[#F5F0EA] shrink-0 overflow-hidden flex items-center justify-center p-2 shadow-sm group-hover:border-army/30 transition-colors">
                        <img
                          src={item.image || item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply brightness-110 saturate-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between h-38 py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-[13px] sm:text-sm font-black uppercase text-preto leading-tight pr-2">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.cartKey)}
                              className="text-preto hover:text-red-600 transition-colors cursor-pointer p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase mt-1 font-bold tracking-wider">
                            Tam: {item.size} | Cor: {item.color}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-gray-200 scale-95 sm:scale-100 origin-left">
                            <button
                              onClick={() => updateQuantity(item.cartKey, -1)}
                              className="p-1 hover:bg-gray-50 text-preto cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-[12px] font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartKey, 1)}
                              className="p-1 hover:bg-gray-50 text-preto cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-black text-army text-sm sm:text-base">
                            R${" "}
                            {(item.price * item.quantity).toLocaleString(
                              "pt-BR",
                              { minimumFractionDigits: 2 },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Resumo */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-8 bg-gray-50/50">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-center text-gray-500 text-sm font-bold uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span>
                      R${" "}
                      {subtotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-preto text-xl font-black uppercase tracking-tighter">
                    <span>Total</span>
                    <span className="text-army">
                      R${" "}
                      {subtotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center mt-2">
                    Frete e impostos calculados no checkout
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-preto text-white py-5 font-black uppercase tracking-[0.2em] text-[12px] sm:text-sm hover:bg-army transition-colors shadow-lg cursor-pointer"
                  >
                    Finalizar Compra
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-preto text-white py-5 font-black uppercase tracking-[0.2em] text-[12px] sm:text-sm hover:bg-army transition-colors shadow-lg cursor-pointer"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
