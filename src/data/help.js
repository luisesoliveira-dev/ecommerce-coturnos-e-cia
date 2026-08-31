export const helpContacts = {
  email: "contato@coturnosecia.com.br",
  whatsapp: "5511999999999",
};

export const helpLinks = [
  {
    label: "Meus Pedidos",
    to: "/pedidos",
    type: "route",
  },
  {
    label: "Devoluções",
    to: "/trocas-e-devolucoes",
    type: "route",
  },
  {
    label: "Perguntas Frequentes",
    to: "/faq",
    type: "route",
  },
];

export const faqItems = [
  {
    question: "Como faço um pedido?",
    answer:
      "Escolha o produto desejado, selecione as opções disponíveis e adicione o item ao carrinho. Depois, siga as etapas do checkout para finalizar sua compra.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "As formas de pagamento disponíveis serão apresentadas durante o processo de checkout.",
  },
  {
    question: "Como funciona a troca ou devolução?",
    answer:
      "Consulte nossa página de Trocas e Devoluções para verificar as condições, prazos e orientações para solicitar uma troca ou devolução.",
  },
  {
    question: "Como acompanho meu pedido?",
    answer:
      "Acesse a área de Meus Pedidos para consultar as informações e o status do seu pedido.",
  },
  {
    question: "Como entro em contato com a Coturnos & Cia?",
    answer:
      "Você pode entrar em contato conosco por e-mail ou pelo WhatsApp através da Central de Ajuda.",
  },
];

export const whatsappUrl = `https://wa.me/${helpContacts.whatsapp}`;

export const emailUrl = `mailto:${helpContacts.email}`;