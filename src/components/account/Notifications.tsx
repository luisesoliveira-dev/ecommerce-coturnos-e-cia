import type { ReactNode } from "react";
import { useAuth } from "../../context/useAuth";
import { Bell, CheckCheck, Truck, Box, ShieldCheck, Check } from "lucide-react";
import type { UserNotification } from "../../context/AuthContextObject";

const TYPE_CONFIG: Record<
  UserNotification["type"],
  {
    badge: string;
    label: string;
    icon: ReactNode;
  }
> = {
  success: {
    badge: "bg-emerald-50 border-emerald-200 text-emerald-800",
    label: "Envio",
    icon: <Truck size={15} className="text-emerald-600" />,
  },
  warning: {
    badge: "bg-zinc-100 border-zinc-300 text-zinc-800",
    label: "Separação",
    icon: <Box size={15} className="text-zinc-700" />,
  },
  info: {
    badge: "bg-blue-50 border-blue-200 text-blue-800",
    label: "Sistema",
    icon: <ShieldCheck size={15} className="text-blue-600" />,
  },
};

export function Notifications() {
  const { user, updateUser } = useAuth();
  if (!user) return null;

  const unreadCount = user.notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    updateUser({
      notifications: user.notifications.map((n) => ({ ...n, read: true })),
    });
  };

  const markOne = (id: string) => {
    updateUser({
      notifications: user.notifications.map((n) =>
        n.id === id ? { ...n, read: !n.read } : n,
      ),
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
            Notificações da Conta
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">
            {unreadCount > 0
              ? `${unreadCount} alerta(s) não lido(s)`
              : "Todas as mensagens foram lidas"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-army hover:text-gold transition-colors self-start sm:self-auto cursor-pointer"
          >
            <CheckCheck size={15} /> Marcar todas como lidas
          </button>
        )}
      </div>

      {user.notifications.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-xl p-10 text-center space-y-3 bg-zinc-50/50">
          <Bell size={32} className="text-zinc-400 mx-auto" />
          <p className="font-bold uppercase text-sm text-zinc-600">
            Nenhuma notificação no momento
          </p>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Avisos de envio, atualizações de pedidos e novidades aparecerão
            aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {user.notifications.map((notif) => {
            const config = TYPE_CONFIG[notif.type];
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 border rounded-xl p-4.5 transition-all bg-white ${
                  notif.read
                    ? "border-zinc-200/80 opacity-70 hover:opacity-90"
                    : "border-zinc-300 shadow-xs ring-1 ring-zinc-200"
                }`}
              >
                {/* Ícone com badge visual */}
                <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
                  {config.icon}
                </div>

                {/* Mensagem */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.badge}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {notif.date}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed font-sans ${
                      notif.read ? "text-zinc-600" : "text-zinc-900 font-medium"
                    }`}
                  >
                    {notif.message}
                  </p>
                </div>

                {/* Botão marcar lida/não lida */}
                <button
                  type="button"
                  onClick={() => markOne(notif.id)}
                  title={
                    notif.read ? "Marcar como não lida" : "Marcar como lida"
                  }
                  className={`shrink-0 p-1.5 rounded-lg transition-colors cursor-pointer ${
                    notif.read
                      ? "text-zinc-300 hover:text-army"
                      : "text-army hover:bg-army/10"
                  }`}
                >
                  <Check size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
