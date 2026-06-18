import { CheckCircle2, ChevronRight } from "lucide-react";

export function CheckoutStepper({ currentStep, onStepClick }) {
  const steps = [
    { id: 1, label: "Carrinho" },
    { id: 2, label: "Entrega" },
    { id: 3, label: "Pagamento" },
    { id: 4, label: "Confirmação" },
  ];

  return (
    <div className="hidden md:flex items-center gap-4">
      {steps.map((step) => {
        const isPast = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isFuture = currentStep < step.id;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => !isFuture && onStepClick(step.id)}
              disabled={isFuture || isCurrent || currentStep === 4}
              className={`flex items-center gap-2 group transition-all ${
                isFuture || currentStep === 4
                  ? "cursor-default"
                  : "cursor-pointer hover:opacity-70"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                  currentStep >= step.id
                    ? "bg-army text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isPast ? <CheckCircle2 size={12} /> : step.id}
              </div>
              <span
                className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  isCurrent ? "text-black" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </button>
            {step.id < 4 && (
              <ChevronRight size={14} className="text-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}
