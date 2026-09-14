import { X, ChevronRight, ChevronLeft, User, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useScrollLock } from "../../hooks/useScrollLock";
import { MenuItem } from "../../types";
import { useAuth } from "../../context/useAuth";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  activeMobileMenu: string | null;
  onSetActiveMenu: (menu: string | null) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  activeMobileMenu,
  onSetActiveMenu,
}: MobileMenuProps) {
  // Trava o scroll do body quando o menu mobile está aberto
  useScrollLock(isOpen);

  const { user, logout } = useAuth();

  const activeCategory = menuItems.find(
    (item: MenuItem) => item.title === activeMobileMenu,
  );

  return (
    <div
      className={`fixed inset-0 bg-branco z-50 transition-transform duration-100 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER DO MENU MOBILE */}
      <div className="h-16 px-4 flex items-center justify-between border-b-[3px] border-army">
        <a href="/" className="flex items-center">
          <img src={logo} alt="coturnos e cia" className="h-10 w-auto" />
        </a>
        <button
          onClick={onClose}
          className="text-army p-2 hover:text-gold transition-colors cursor-pointer"
        >
          <X size={30} />
        </button>
      </div>

      {/* CORPO DO MENU MOBILE */}
      <div className="flex flex-col h-[calc(100vh-68px)] bg-branco overflow-y-auto">
        {/* TELA 1: CATEGORIAS PRINCIPAIS */}
        {!activeMobileMenu ? (
          <div className="flex flex-col px-6 py-4 animate-in slide-in-from-left-4 duration-300">
            <ul className="flex flex-col w-full">
              {menuItems.map((item: MenuItem) => (
                <li key={item.title} className="border-b text-marrom">
                  <button
                    onClick={() => onSetActiveMenu(item.title)}
                    className="flex items-center justify-between w-full py-4 text-army text-base font-bold cursor-pointer"
                  >
                    {item.title}
                    <ChevronRight size={18} className="text-marrom" />
                  </button>
                </li>
              ))}

              {/* Links estáticos */}
              <li className="border-b text-marrom">
                <a
                  href="#"
                  className="flex items-center w-full py-4 text-army text-base font-bold"
                >
                  Lançamentos
                </a>
              </li>
              <li className="border-b text-marrom">
                <a
                  href="#"
                  className="flex items-center w-full py-4 text-army text-base font-bold"
                >
                  Contato
                </a>
              </li>
            </ul>

            {/* OPÇÕES DE UTILIDADE */}
            <div className="mt-8 flex flex-col gap-4 pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <Link
                    to="/minha-conta"
                    onClick={onClose}
                    className="flex items-center gap-3 text-army"
                  >
                    <span className="w-8 h-8 rounded-full bg-army text-white flex items-center justify-center text-xs font-bold uppercase overflow-hidden border border-zinc-200">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-preto uppercase">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400">Minha Conta</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-red-600 text-left pl-1 cursor-pointer"
                  >
                    Sair da Conta
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center gap-3 text-army"
                >
                  <User size={22} />
                  <span className="text-base font-bold uppercase">
                    Minha conta / Entrar
                  </span>
                </Link>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-5">
              <a
                href="/central-de-ajuda"
                onClick={onClose}
                className="flex items-center gap-3 text-army"
              >
                <HelpCircle size={22} />
                <span className="text-base font-bold uppercase">Ajuda</span>
              </a>
            </div>
          </div>
        ) : (
          /* TELA 2: SUB-CATEGORIAS */
          <div className="flex flex-col px-6 py-4 animate-in slide-in-from-right-4 duration-300">
            {/* Botão Voltar */}
            <button
              onClick={() => onSetActiveMenu(null)}
              className="flex items-center gap-1 text-marrom font-semibold text-sm mb-5 cursor-pointer"
            >
              <ChevronLeft size={18} />
              Voltar
            </button>

            <h2 className="text-xl font-bold text-army mb-3">
              {activeMobileMenu}
            </h2>

            <ul className="flex flex-col w-full">
              {activeCategory?.links.map(
                (link: { label: string; to?: string; href?: string }) => (
                  <li key={link.label} className="border-b border-marrom">
                    <Link
                      to={link.to || link.href || "/"}
                      className="flex items-center w-full py-4 text-army text-base font-semibold"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}

              <li className="border-b border-marrom">
                <Link
                  to="/produtos"
                  className="flex items-center w-full py-4 text-army text-base font-extrabold"
                  onClick={onClose}
                >
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
