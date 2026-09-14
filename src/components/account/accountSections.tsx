import type { ReactNode } from "react";
import {
  Package,
  MapPin,
  Settings,
  RefreshCw,
  Bell,
  LayoutDashboard,
} from "lucide-react";

export type AccountSection =
  | "dashboard"
  | "pedidos"
  | "dados"
  | "enderecos"
  | "trocas"
  | "notificacoes";

export const ACCOUNT_SECTIONS: {
  id: AccountSection;
  label: string;
  icon: ReactNode;
}[] = [
  { id: "dashboard", label: "Painel", icon: <LayoutDashboard size={17} /> },
  { id: "pedidos", label: "Meus Pedidos", icon: <Package size={17} /> },
  { id: "dados", label: "Dados Pessoais", icon: <Settings size={17} /> },
  { id: "enderecos", label: "Endereços", icon: <MapPin size={17} /> },
  { id: "trocas", label: "Trocas e Devoluções", icon: <RefreshCw size={17} /> },
  { id: "notificacoes", label: "Notificações", icon: <Bell size={17} /> },
];
