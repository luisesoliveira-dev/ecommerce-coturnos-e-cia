import { useState, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import {
  ChevronDown,
  Package,
  ExternalLink,
  Copy,
  Check,
  Truck,
  CheckCircle2,
  Clock,
  Box,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Order, OrderStatus } from "../../context/AuthContextObject";

const STATUS_META: Record<
  OrderStatus["step"],
  { label: string; color: string; textColor: string; icon: ReactNode }
> = {
  aprovado: {
    label: "Pagamento Aprovado",
    color: "bg-army",
    textColor: "text-army",
    icon: <CheckCircle2 size={14} />,
  },
  separacao: {
    label: "Em Separação no Centro Logístico",
    color: "bg-gold",
    textColor: "text-[#9c754d]",
    icon: <Box size={14} />,
  },
  enviado: {
    label: "Enviado / Em Trânsito",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    icon: <Truck size={14} />,
  },
  entregue: {
    label: "Entregue no Destino",
    color: "bg-green-600",
    textColor: "text-green-700",
    icon: <Check size={14} />,
  },
};

function OrderStepper({ status }: { status: OrderStatus[] }) {
  const steps = status;
  // Índice do último passo concluído
  const lastDoneIndex = steps.reduce(
    (max, s, idx) => (s.done ? Math.max(max, idx) : max),
    -1,
  );

  return (
    <div className="flex flex-col gap-0 mt-3 pt-2">
      {steps.map((s, i) => {
        const meta = STATUS_META[s.step];
        const isLast = i === steps.length - 1;
        const isCurrentActive = i === lastDoneIndex;

        return (
          <div key={s.step} className="flex items-start gap-3.5 group">
            {/* Linha vertical + nó indicador */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {isCurrentActive && (
                  <span className="absolute w-6 h-6 rounded-full bg-gold/40 animate-ping" />
                )}
                <div
                  className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 transition-all ${
                    s.done
                      ? `${meta.color} text-branco shadow-sm`
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  } ${isCurrentActive ? "ring-2 ring-gold ring-offset-1" : ""}`}
                >
                  {s.done ? (
                    meta.icon
                  ) : (
                    <Clock size={12} className="text-gray-400" />
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 min-h-8 my-1 transition-colors ${
                    s.done && steps[i + 1]?.done
                      ? "bg-army"
                      : s.done
                        ? "bg-linear-to-b from-army to-gray-200"
                        : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Texto da etapa */}
            <div className="pb-4 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`font-bold uppercase text-xs tracking-wider ${
                    s.done ? "text-preto" : "text-gray-400"
                  }`}
                >
                  {meta.label}
                </p>
                {isCurrentActive && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                    Atual
                  </span>
                )}
              </div>
              {s.done && s.date && (
                <p className="text-[11px] text-gray-500 mt-0.5 font-mono">
                  {s.date}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const doneStatuses = order.status.filter((s) => s.done);
  const lastDone: OrderStatus | undefined =
    doneStatuses.length > 0 ? doneStatuses[doneStatuses.length - 1] : undefined;
  const currentLabel = lastDone
    ? STATUS_META[lastDone.step].label
    : "Processando";
  const allDone = order.status.every((s) => s.done);

  const handleCopyTracking = (e: MouseEvent) => {
    e.stopPropagation();
    if (!order.trackingCode) return;
    navigator.clipboard.writeText(order.trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded bg-branco shadow-sm overflow-hidden transition-all hover:border-gray-300">
      {/* Cabeçalho do Card */}
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-zinc-50/80 transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase text-base text-zinc-900 tracking-wide">
              Pedido #{order.id}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                allDone
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-army/10 text-army border-army/20"
              }`}
            >
              {currentLabel}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>{order.date}</span>
            <span className="text-zinc-300">|</span>
            <span className="font-bold text-zinc-900">
              R$ {order.total.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
            {expanded ? "Ocultar" : "Detalhes"}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>

      {/* Conteúdo Expandido com Animação Suave */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-zinc-200 bg-zinc-50/50"
          >
            <div className="px-5 sm:px-6 pb-6 pt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coluna da Esquerda: Itens & Rastreio */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                    Itens Adquiridos
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-zinc-200 shadow-xs"
                      >
                        <div className="w-14 h-14 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0 border border-zinc-200 overflow-hidden">
                          <Package size={22} className="text-zinc-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm text-zinc-900 uppercase tracking-wide truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Tamanho:{" "}
                            <span className="font-semibold text-zinc-800">
                              {item.size}
                            </span>{" "}
                            · Quantidade:{" "}
                            <span className="font-semibold text-zinc-800">
                              {item.qty}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Código de Rastreio com botão Copiar */}
                {order.trackingCode && (
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                        Código de Rastreamento (Correios / Transportadora)
                      </span>
                      <p className="font-mono text-sm font-bold text-zinc-900 tracking-wider mt-0.5">
                        {order.trackingCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyTracking}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-zinc-50 hover:bg-army hover:text-white hover:border-army text-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      title="Copiar código de rastreamento"
                    >
                      {copied ? (
                        <>
                          <Check size={13} /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copiar
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="pt-1">
                  <Link
                    to="/produtos"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-army hover:text-gold transition-colors underline underline-offset-4"
                  >
                    <span>Comprar Novamente no Catálogo</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>

              {/* Coluna da Direita: Timeline de Status */}
              <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-xl border border-zinc-200 shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  Acompanhamento da Entrega
                </p>
                <OrderStepper status={order.status} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MyOrders() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
            Meus Pedidos
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">
            {user.orders.length} pedido(s) registrado(s) na sua conta
          </p>
        </div>

        <Link
          to="/produtos"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-army hover:text-gold transition-colors self-start sm:self-auto"
        >
          Explorar Catálogo →
        </Link>
      </div>

      {user.orders.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-xl p-12 text-center space-y-4 bg-zinc-50/50">
          <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <Package size={28} />
          </div>
          <div>
            <p className="font-bold uppercase text-base text-zinc-700">
              Você ainda não realizou nenhum pedido
            </p>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Quando você adquirir seus coturnos ou acessórios, eles aparecerão
              aqui com rastreio em tempo real.
            </p>
          </div>
          <Link
            to="/produtos"
            className="inline-block px-6 py-3 bg-army text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-army/90 transition-colors shadow-xs"
          >
            Ir para a Loja
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {user.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
