import { useAuth } from "../../context/useAuth";
import { Package, MapPin, Settings, ArrowRight, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import type { AccountSection } from "./accountSections";

interface Props {
  onNavigate: (s: AccountSection) => void;
}

export function AccountDashboard({ onNavigate }: Props) {
  const { user } = useAuth();
  if (!user) return null;

  const lastOrder = user.orders[0];
  const doneStatuses = lastOrder?.status.filter((s) => s.done) || [];
  const lastStatus =
    doneStatuses.length > 0 ? doneStatuses[doneStatuses.length - 1] : undefined;

  const STATUS_LABELS: Record<string, { label: string; badge: string }> = {
    aprovado: {
      label: "Pagamento Aprovado",
      badge: "bg-army/10 text-army border-army/30",
    },
    separacao: {
      label: "Em Separação",
      badge: "bg-gold/15 text-[#8c6b48] border-gold/40",
    },
    enviado: {
      label: "Em Transporte",
      badge: "bg-blue-50 text-blue-800 border-blue-200",
    },
    entregue: {
      label: "Entregue",
      badge: "bg-green-50 text-green-800 border-green-200",
    },
  };

  const statusInfo = lastStatus
    ? STATUS_LABELS[lastStatus.step]
    : {
        label: "Processando",
        badge: "bg-gray-100 text-gray-700 border-gray-200",
      };

  return (
    <div className="space-y-8">
      {/* Boas-vindas */}
      <div className="border-b border-zinc-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] text-zinc-400 uppercase tracking-[2px] font-bold block mb-1">
            Painel Geral
          </span>
          <h1 className="font-bold text-2xl sm:text-3xl uppercase text-zinc-900 tracking-wide">
            Olá, {user.name}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Acompanhe o andamento dos seus pedidos e gerencie suas informações.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-zinc-50 px-3.5 py-1.5 rounded-full border border-zinc-200 text-xs text-zinc-700 font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Conta Ativa & Verificada</span>
        </div>
      </div>

      {/* Cards de Atalhos Rápidos */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate("pedidos")}
            className="flex flex-col justify-between p-5 border border-zinc-200 rounded-lg hover:border-army hover:shadow-md transition-all text-left group bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army cursor-pointer"
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 group-hover:bg-army group-hover:text-white transition-colors">
                <Package size={20} />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-100 group-hover:bg-army/10 group-hover:text-army px-2 py-0.5 rounded transition-colors">
                01
              </span>
            </div>
            <div>
              <p className="font-bold uppercase text-sm text-zinc-900 tracking-wide group-hover:text-army transition-colors">
                Meus Pedidos
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {user.orders.length} pedido(s) registrado(s)
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-army mt-4 group-hover:text-gold transition-colors">
              <span>Ver todos</span>
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>

          <button
            onClick={() => onNavigate("enderecos")}
            className="flex flex-col justify-between p-5 border border-zinc-200 rounded-lg hover:border-army hover:shadow-md transition-all text-left group bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army cursor-pointer"
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 group-hover:bg-army group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-100 group-hover:bg-army/10 group-hover:text-army px-2 py-0.5 rounded transition-colors">
                02
              </span>
            </div>
            <div>
              <p className="font-bold uppercase text-sm text-zinc-900 tracking-wide group-hover:text-army transition-colors">
                Endereços
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {user.addresses.length} local(is) cadastrado(s)
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-army mt-4 group-hover:text-gold transition-colors">
              <span>Gerenciar</span>
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>

          <button
            onClick={() => onNavigate("dados")}
            className="flex flex-col justify-between p-5 border border-zinc-200 rounded-lg hover:border-army hover:shadow-md transition-all text-left group bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army cursor-pointer"
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 group-hover:bg-army group-hover:text-white transition-colors">
                <Settings size={20} />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-100 group-hover:bg-army/10 group-hover:text-army px-2 py-0.5 rounded transition-colors">
                03
              </span>
            </div>
            <div>
              <p className="font-bold uppercase text-sm text-zinc-900 tracking-wide group-hover:text-army transition-colors">
                Dados Pessoais
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Editar cadastro e senha
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-army mt-4 group-hover:text-gold transition-colors">
              <span>Atualizar</span>
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Destaque do Último Pedido */}
      {lastOrder ? (
        <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Última Compra Realizada
              </span>
              <p className="font-bold uppercase text-base text-zinc-900 tracking-wide">
                Pedido #{lastOrder.id}
              </p>
              <p className="text-xs text-zinc-400">{lastOrder.date}</p>
            </div>

            <div className="self-start sm:self-auto">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${statusInfo.badge}`}
              >
                <Truck size={13} />
                {statusInfo.label}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <p className="text-xs text-zinc-600">
                {lastOrder.items.length} item(ns):{" "}
                <span className="font-semibold text-zinc-900">
                  {lastOrder.items.map((it) => it.name).join(", ")}
                </span>
              </p>
              <p className="text-sm font-bold text-zinc-900">
                Total:{" "}
                <span className="text-army">
                  R$ {lastOrder.total.toFixed(2).replace(".", ",")}
                </span>
              </p>
            </div>

            <button
              onClick={() => onNavigate("pedidos")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-800 font-bold text-xs uppercase tracking-wider rounded hover:bg-army hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army"
            >
              <span>Acompanhar Rastreio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-zinc-300 rounded-lg p-10 text-center space-y-3 bg-zinc-50/50">
          <Package size={36} className="text-zinc-400 mx-auto" />
          <p className="font-bold uppercase text-sm text-zinc-600">
            Nenhum pedido realizado ainda
          </p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Explore nossos coturnos táticos e equipamentos de alta resistência
            para equipar sua jornada.
          </p>
          <Link
            to="/produtos"
            className="inline-block mt-2 px-5 py-2.5 bg-army text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-army/90 transition-colors shadow-xs"
          >
            Ver Catálogo de Produtos
          </Link>
        </div>
      )}
    </div>
  );
}
