import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  {
    title: "Coturnos e Sapatos",
    links: [
      { label: "Coturnos Militares", href: "/produtos" },
      { label: "Botas de Trilha", href: "/produtos" },
      { label: "Sapatos Sociais", href: "/produtos" },
      { label: "Linha Tática", href: "/produtos" },
    ],
  },
  {
    title: "Acessórios",
    links: [
      { label: "Cintos e Coldres", href: "#" },
      { label: "Mochilas", href: "#" },
      { label: "Meias Térmicas", href: "#" },
      { label: "Bonés e Chapéus", href: "#" },
    ],
  },
];

export const linksNavbar: string[] = ["Lançamentos", "Contato"];
