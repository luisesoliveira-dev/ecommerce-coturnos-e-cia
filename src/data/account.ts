import type { AuthUser } from "../context/AuthContextObject";

export type ExchangeReasonType = "tamanho" | "defeito" | "cor" | "devolucao";

export interface ExchangeReason {
  id: ExchangeReasonType;
  label: string;
  desc: string;
}

export const EXCHANGE_REASONS: ExchangeReason[] = [
  {
    id: "tamanho",
    label: "Troca de Numeração",
    desc: "O calçado ficou apertado ou largo",
  },
  {
    id: "defeito",
    label: "Defeito ou Garantia",
    desc: "Falha aparente de material ou fabricação",
  },
  {
    id: "cor",
    label: "Modelo ou Cor",
    desc: "Deseja trocar por outro modelo",
  },
  {
    id: "devolucao",
    label: "Devolução / Arrependimento",
    desc: "Devolução em até 7 dias após o recebimento",
  },
];

export const DEMO_USER: AuthUser = {
  id: "demo-001",
  name: "Operador Silva",
  email: "silva@coturnos.com.br",
  cpf: "123.456.789-00",
  phone: "(11) 99999-0001",
  birthdate: "15/03/1990",
  avatar: undefined,
  addresses: [
    {
      id: "addr-1",
      label: "Casa",
      street: "Rua das Palmeiras",
      number: "142",
      complement: "Ap 23",
      neighborhood: "Vila Militar",
      city: "São Paulo",
      state: "SP",
      zip: "01310-000",
      isPrimary: true,
    },
    {
      id: "addr-2",
      label: "Trabalho",
      street: "Av. Paulista",
      number: "1000",
      complement: "Sala 55",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zip: "01310-100",
      isPrimary: false,
    },
  ],
  orders: [
    {
      id: "COT-9842",
      date: "08/09/2026",
      total: 649.9,
      items: [
        {
          name: "Coturno Tático Airstrike",
          size: 42,
          qty: 1,
          image: "/coturno1.jpeg",
        },
      ],
      trackingCode: "XP123456789BR",
      status: [
        { step: "aprovado", date: "08/09/2026 10:32", done: true },
        { step: "separacao", date: "08/09/2026 14:45", done: true },
        { step: "enviado", date: "09/09/2026 09:10", done: true },
        { step: "entregue", date: "", done: false },
      ],
    },
    {
      id: "COT-9831",
      date: "01/09/2026",
      total: 529.9,
      items: [
        {
          name: "Bota Anfíbia X",
          size: 43,
          qty: 1,
          image: "/coturno1.jpeg",
        },
      ],
      status: [
        { step: "aprovado", date: "01/09/2026 09:00", done: true },
        { step: "separacao", date: "01/09/2026 16:20", done: true },
        { step: "enviado", date: "", done: false },
        { step: "entregue", date: "", done: false },
      ],
    },
  ],
  notifications: [
    {
      id: "notif-1",
      type: "success",
      message: "Seu pedido #COT-9842 foi enviado! Rastreie: XP123456789BR",
      date: "09/09/2026",
      read: false,
    },
    {
      id: "notif-2",
      type: "warning",
      message: "Seu pedido #COT-9831 está em separação.",
      date: "01/09/2026",
      read: false,
    },
    {
      id: "notif-3",
      type: "info",
      message: "Bem-vindo à Área do Cliente! Seus dados estão protegidos.",
      date: "15/08/2026",
      read: true,
    },
  ],
};
