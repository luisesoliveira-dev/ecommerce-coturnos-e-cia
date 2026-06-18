import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "../context/useCart";
import logo from "../assets/logo1.png";

// Componentes do Checkout
import { CheckoutStepper } from "../components/checkout/CheckoutStepper";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { CartStep } from "../components/checkout/CartStep";
import { DeliveryStep } from "../components/checkout/DeliveryStep";
import { PaymentStep } from "../components/checkout/PaymentStep";
import { ConfirmationStep } from "../components/checkout/ConfirmationStep";

export default function Checkout() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1: Carrinho, 2: Entrega, 3: Pagamento, 4: Confirmação
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = currentStep > 1 ? 25.9 : 0;
  const total = subtotal + shipping;

  // Se o carrinho estiver vazio e não estivermos na tela de sucesso
  if (cartItems.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-barlow">
        <ShoppingBag size={64} className="text-gray-200 mb-4" />
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Seu carrinho está vazio
        </h1>
        <p className="text-gray-500 mb-8">
          Adicione alguns produtos antes de finalizar sua compra.
        </p>
        <Link
          to="/produtos"
          className="bg-army text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Ir para a Loja
        </Link>
      </div>
    );
  }

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-barlow">
      {/* Header Simples */}
      <header className="bg-white border-b border-gray-100 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Coturnos & Cia"
              className="h-10 sm:h-11 w-auto"
            />
          </Link>

          <CheckoutStepper 
            currentStep={currentStep} 
            onStepClick={(step) => setCurrentStep(step)} 
          />

          <Link
            to="/produtos"
            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-army flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          {/* LADO ESQUERDO: CONTEÚDO DINÂMICO (SCROLL) */}
          <div className="flex-1 space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <CartStep
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && <DeliveryStep />}

              {currentStep === 3 && (
                <PaymentStep
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  total={total}
                />
              )}

              {currentStep === 4 && <ConfirmationStep />}
            </AnimatePresence>
          </div>

          {/* LADO DIREITO: RESUMO DO PEDIDO (FIXO) */}
          {currentStep < 4 && (
            <div className="w-full lg:w-87.5 xl:w-100 lg:pt-14">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                paymentMethod={paymentMethod}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer Simples */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © 2026 COTURNOS & CIA • TODOS OS DIREITOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}
