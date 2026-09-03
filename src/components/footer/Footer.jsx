import { useState } from "react";
import { FooterLink } from "./FooterLink";
import { FooterSection } from "./FooterSection";
import { PaymentIcons } from "./PaymentIcons";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "../icons/IconsSocial";
import { ROUTES } from "../../constants/routes";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Lock,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import logo from "../../assets/logo1.png";

const SOCIAL = [
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: YoutubeIcon, label: "YouTube", href: "#" },
];

const SELOS = [
  {
    icon: ShieldCheck,
    label: "Compra 100% Segura",
    desc: "Ambiente protegido",
  },
  { icon: Lock, label: "Criptografia SSL", desc: "Dados em trânsito seguros" },
  {
    icon: BadgeCheck,
    label: "Dados Protegidos",
    desc: "Privacidade garantida",
  },
];

export function Footer() {
  const [horarioOpen, setHorarioOpen] = useState(false);

  return (
    <footer className="bg-pretoclaro font-barlow w-full border-t border-gold/20">
      {/* ── GRID PRINCIPAL ── */}
      <div className="max-w-390 mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ── COLUNA ESQUERDA: Marca + Contato + Social ── */}
          <div className="lg:col-span-4 flex flex-col gap-7 lg:pr-10 lg:border-r lg:border-branco/8">
            <div>
              <img
                src={logo}
                alt="Coturnos & Cia"
                className="h-16 w-auto object-contain mb-4"
                style={{ filter: "brightness(1.1) contrast(1.05)" }}
              />
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Equipamentos táticos e calçados de alta performance para quem
                exige o máximo em resistência e durabilidade.
              </p>
            </div>

            {/* Contato */}
            <div className="flex flex-col gap-3">
              <h4 className="text-branco font-extrabold uppercase tracking-widest text-xs border-l-2 border-gold pl-3 mb-1">
                Contato
              </h4>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded bg-army/10 border border-army/20 group-hover:border-gold/40 transition-colors shrink-0">
                  <Phone
                    size={14}
                    className="text-army group-hover:text-gold"
                  />
                </div>
                <span className="text-[15px]">(11) 99999-9999</span>
              </a>
              <a
                href="mailto:contato@coturnosecia.com.br"
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded bg-army/10 border border-army/20 group-hover:border-gold/40 transition-colors shrink-0">
                  <Mail size={14} className="text-army group-hover:text-gold" />
                </div>
                <span className="text-[15px]">contato@coturnosecia.com.br</span>
              </a>
              <div className="flex items-start gap-3 text-gray-500">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-army/10 border border-army/20 shrink-0 mt-0.5">
                  <MapPin size={14} className="text-army" />
                </div>
                <span className="text-[15px] leading-snug mt-1.5">
                  Rua dos Táticos, 123 — Centro
                  <br />
                  São Paulo, SP
                </span>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-branco/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* ── COLUNAS DIREITA: Links + Infos Extras ── */}
          <div className="lg:col-span-8 flex flex-col gap-0">
            {/* Links Institucionais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-12">
              <FooterSection title="Institucional">
                <FooterLink href={ROUTES.SOBRE_NOS}>Quem Somos</FooterLink>
                <FooterLink href="#">Lojas Físicas</FooterLink>
                <FooterLink href="#">Blog Tático</FooterLink>
                <FooterLink href="#">Trabalhe Conosco</FooterLink>
                <FooterLink href="#">Seja um Revendedor</FooterLink>
              </FooterSection>

              <FooterSection title="Atendimento">
                <FooterLink href={ROUTES.CENTRAL_AJUDA}>
                  Central de Ajuda
                </FooterLink>
                <FooterLink href={ROUTES.MEUS_PEDIDOS}>Meus Pedidos</FooterLink>
                <FooterLink href={ROUTES.TROCAS_DEVOLUCOES}>
                  Trocas e Devoluções
                </FooterLink>
                <FooterLink href="#">Política de Frete</FooterLink>
                <FooterLink href="#">Garantia do Produto</FooterLink>
                <FooterLink href={ROUTES.FAQ}>Perguntas Frequentes</FooterLink>
              </FooterSection>
            </div>

            {/* Seção Inferior (Horário, Segurança e Pagamento) */}
            {/*
              Mobile (flex-col): Horário → Segurança → Pagamento
              Desktop (sm: grid 2 cols): col-esq = Horário + Pagamento, col-dir = Segurança (row-span-2)
            */}
            <div className="pt-0 sm:pt-8 flex flex-col sm:grid sm:grid-cols-2 sm:gap-12">
              {/* 1. Horário — mobile: 1º | desktop: col-esq linha 1 */}
              <div className="order-1 border-b border-branco/8 sm:border-none">
                <button
                  onClick={() => setHorarioOpen((v) => !v)}
                  className="flex items-center justify-between w-full py-4 sm:py-0 sm:cursor-default sm:pointer-events-none"
                  aria-expanded={horarioOpen}
                >
                  <h3 className="text-branco font-extrabold uppercase tracking-widest text-xs border-l-2 border-gold pl-3 text-left">
                    Horário de Atendimento
                  </h3>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 sm:hidden transition-transform duration-300 ${
                      horarioOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out sm:max-h-none! sm:opacity-100! sm:mt-5 ${
                    horarioOpen
                      ? "max-h-96 opacity-100 mt-2 pb-4 sm:pb-0"
                      : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
                  }`}
                >
                  <div className="flex flex-wrap gap-x-8 gap-y-1 pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-500">
                        Seg – Sex
                      </span>
                      <span className="text-[14px] text-gray-300 font-medium">
                        9h – 18h
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-500">Sábado</span>
                      <span className="text-[14px] text-gray-300 font-medium">
                        9h – 13h
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Segurança — mobile: 2º | desktop: col-dir row-span-2 */}
              <div className="order-2 sm:row-span-2 border-b border-branco/8 sm:border-none py-4 sm:py-0">
                <h3 className="text-branco font-extrabold uppercase tracking-widest text-xs border-l-2 border-gold pl-3 mb-5">
                  Segurança
                </h3>
                <div className="flex flex-col gap-2">
                  {SELOS.map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-3 py-2.5 border border-branco/8 bg-branco/3 hover:border-gold/20 hover:bg-branco/5 transition-all"
                    >
                      <Icon size={14} className="text-army shrink-0" />
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[13px] font-semibold text-gray-300">
                          {label}
                        </span>
                        <span className="text-[11px] text-gray-600 hidden lg:inline">
                          — {desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Pagamento — mobile: 3º | desktop: col-esq linha 2 */}
              <div className="order-3 py-4 sm:py-0">
                <h3 className="text-branco font-extrabold uppercase tracking-widest text-xs border-l-2 border-gold pl-3 mb-5">
                  Formas de Pagamento
                </h3>
                <div className="pl-3">
                  <PaymentIcons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RODAPÉ INFERIOR (Copyright) ── */}
      <div className="border-t border-branco/8 bg-preto/20">
        <div className="max-w-390 mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left order-2 sm:order-1">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Coturnos &amp; Cia — Todos os
              direitos reservados.
            </p>
            <p className="text-gray-600 text-[11px] mt-0.5">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
          <div className="flex gap-5 order-1 sm:order-2">
            {["Privacidade", "Termos de Uso", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
