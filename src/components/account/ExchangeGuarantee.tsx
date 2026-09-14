import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import {
  RefreshCw,
  CheckCircle,
  Headphones,
  MessageSquare,
  Clock,
} from "lucide-react";
import { EXCHANGE_REASONS, type ExchangeReasonType } from "../../data/account";

export function ExchangeGuarantee() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(user?.orders[0]?.id || "");
  const [reason, setReason] = useState<ExchangeReasonType>("tamanho");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderId || !reason) return;
    const proto = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocol(proto);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="max-w-2xl space-y-6"
      >
        <div className="border-b border-zinc-200 pb-4">
          <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
            Trocas e Devoluções
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">
            Solicitação Registrada no Suporte
          </p>
        </div>

        <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-5 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
            <CheckCircle size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Protocolo: {protocol}
            </span>
            <h3 className="font-bold uppercase text-xl text-zinc-900 tracking-wide pt-1">
              Solicitação Enviada com Sucesso!
            </h3>
            <p className="text-xs text-zinc-600 max-w-lg leading-relaxed font-sans mx-auto">
              Recebemos sua solicitação de atendimento referente ao Pedido{" "}
              <strong className="text-zinc-900">#{orderId}</strong>.
            </p>
          </div>

          {/* Card com passos do atendimento manual */}
          <div className="w-full bg-white rounded-xl border border-zinc-200 p-5 space-y-4 text-left shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
              <MessageSquare size={16} className="text-army" />
              <span className="font-bold text-xs uppercase tracking-wider text-zinc-900">
                Como Funciona o Processo:
              </span>
            </div>

            <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  Nossa equipe de suporte entrará em contato via{" "}
                  <strong className="text-zinc-900">WhatsApp</strong> ou{" "}
                  <strong className="text-zinc-900">e-mail</strong> no prazo de
                  até 24 horas úteis.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  Você receberá as orientações detalhadas de envio e combinará a
                  troca pelo tamanho correto ou devolução.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  Acompanharemos todo o processo até a conclusão para garantir
                  sua satisfação total.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setDetails("");
            }}
            className="mt-2 text-xs font-bold uppercase tracking-wider text-army hover:text-gold transition-colors cursor-pointer"
          >
            ← Fazer Nova Solicitação
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
          Trocas e Devoluções
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">
          Atendimento humanizado para trocas de numeração ou garantias
        </p>
      </div>

      {/* Card informativo */}
      <div className="flex items-start gap-3.5 border border-zinc-200 bg-zinc-50 rounded-xl p-4.5">
        <Headphones size={20} className="text-army shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-600 leading-relaxed font-sans space-y-1">
          <p className="font-bold text-zinc-900 uppercase tracking-wider">
            Suporte Personalizado Coturnos & Cia
          </p>
          <p>
            O calçado não serviu perfeitamente ou precisa de assistência?
            Preencha as informações abaixo e nossa equipe entrará em contato
            para orientar seu atendimento com rapidez.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seletor de Pedido */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-2">
            1. Selecione o Pedido *
          </label>
          {user && user.orders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.orders.map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => setOrderId(ord.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    orderId === ord.id
                      ? "border-army bg-army/4 ring-1 ring-army/30 shadow-xs"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <span className="font-bold uppercase text-xs text-zinc-900 tracking-wide block">
                      Pedido #{ord.id}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {ord.date} · {ord.items[0]?.name}
                    </span>
                  </div>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      orderId === ord.id
                        ? "border-army bg-army text-white"
                        : "border-zinc-300"
                    }`}
                  >
                    {orderId === ord.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              required
              placeholder="Ex: COT-9842"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
            />
          )}
        </div>

        {/* Motivo */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-2">
            2. Motivo da Solicitação *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXCHANGE_REASONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setReason(r.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  reason === r.id
                    ? "border-army bg-army/4 ring-1 ring-army/30 text-army shadow-xs"
                    : "border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase text-xs tracking-wider text-zinc-900">
                    {r.label}
                  </span>
                  {reason === r.id && (
                    <RefreshCw size={13} className="text-army" />
                  )}
                </div>
                <span className="text-[11px] text-zinc-500 block mt-1 font-sans">
                  {r.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes Adicionais */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
            3. Detalhes da Solicitação (opcional)
          </label>
          <textarea
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Exemplo: Preciso trocar o coturno tamanho 42 para o tamanho 43. Meu telefone preferencial para contato é..."
            className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock size={14} className="text-zinc-400 shrink-0" />
          <span>Atendimento de segunda a sexta, das 09h às 18h.</span>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-army text-white font-bold uppercase tracking-wider rounded-lg text-xs hover:bg-army/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-all cursor-pointer shadow-xs w-full sm:w-auto"
        >
          <RefreshCw size={14} />
          Enviar Solicitação ao Suporte
        </button>
      </form>
    </div>
  );
}
