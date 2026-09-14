import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem } from "../../types";
import { formatPrice } from "../../utils/formatPrice";

export interface CartStepProps {
  cartItems: CartItem[];
  updateQuantity: (cartKey: string, delta: number) => void;
  removeFromCart: (cartKey: string) => void;
}

export function CartStep({
  cartItems,
  updateQuantity,
  removeFromCart,
}: CartStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="text-army" />
        <h2 className="text-2xl font-black uppercase tracking-normal">
          Seu Carrinho
        </h2>
      </div>

      <div className="bg-white rounded-sm border border-gray-100 divide-y divide-gray-50">
        {cartItems.map((item) => (
          <div key={item.cartKey} className="p-3 sm:p-6 flex gap-3 sm:gap-8">
            <div className="w-24 h-32 sm:w-44 sm:h-56 bg-[#F5F0EA] shrink-0 flex items-center justify-center p-2 sm:p-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain mix-blend-multiply brightness-110 saturate-110"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-0.5 sm:py-1">
              <div>
                <div className="flex justify-between items-start gap-2 sm:gap-4">
                  <h3 className="font-bold uppercase tracking-normal text-xs sm:text-base leading-tight">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase underline tracking-widest transition-colors cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                  TAM: {item.size} • COR: {item.color}
                </p>
              </div>

              <div className="flex justify-between items-end mt-2 sm:mt-4">
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => updateQuantity(item.cartKey, -1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 cursor-pointer text-xs"
                  >
                    -
                  </button>
                  <span className="w-6 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartKey, 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 cursor-pointer text-xs"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest line-through leading-none mb-1">
                    {formatPrice(item.price * 1.2)}
                  </span>
                  <span className="font-black text-sm sm:text-lg leading-none">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
