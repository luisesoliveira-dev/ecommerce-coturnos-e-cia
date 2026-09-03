import { ROUTES } from "../constants/routes";

export const menuItems = [
  {
    title: "Coturnos e Sapatos",
    links: [
      { label: "Coturnos Militares", href: ROUTES.PRODUTOS },
      { label: "Botas de Trilha", href: ROUTES.PRODUTOS },
      { label: "Sapatos Sociais", href: ROUTES.PRODUTOS },
      { label: "Linha Tática", href: ROUTES.PRODUTOS },
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

export const linksNavbar = [
  { label: "Lançamentos", href: ROUTES.LANCAMENTOS },
  { label: "Contato", href: ROUTES.CONTATO },
];
