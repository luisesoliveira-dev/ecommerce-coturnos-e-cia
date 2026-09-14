import { createContext } from "react";

export interface UserNotification {
  id: string;
  type: "success" | "warning" | "info";
  message: string;
  date: string;
  read: boolean;
}

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  isPrimary: boolean;
}

export interface OrderStatus {
  step: "aprovado" | "separacao" | "enviado" | "entregue";
  date: string;
  done: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: { name: string; size: string | number; qty: number; image: string }[];
  status: OrderStatus[];
  trackingCode?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: string;
  avatar?: string;
  addresses: UserAddress[];
  orders: Order[];
  notifications: UserNotification[];
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  loginDemo: () => void;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  loginDemo: () => {},
  logout: () => {},
  updateUser: () => {},
});
