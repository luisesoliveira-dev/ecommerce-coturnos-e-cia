import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Bell,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { menuItems, linksNavbar } from "../../data/menu";
import logo from "../../assets/logo1.png";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "../search/SearchOverlay";
import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/useAuth";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const { cartItems, openCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu de usuário ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setActiveMobileMenu(null), 300);
  };

  const unreadCount = user?.notifications?.filter((n) => !n.read).length ?? 0;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR DESKTOP E BASE MOBILE — Fixa (Sticky) */}
      <nav className="bg-branco border-b-[3px] border-army font-barlow sticky top-0 z-50 shadow-md">
        <div className="max-w-390 mx-auto w-full h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-8 xl:gap-12 h-full">
            {/* LOGO */}
            <a href="/" className="flex items-center">
              <img
                src={logo}
                alt="Coturnos & Cia"
                className="h-10 sm:h-11 w-auto"
              />
            </a>

            {/* LINKS DESKTOP */}
            <ul className="hidden lg:flex gap-6 xl:gap-8 list-none m-0 p-0 items-center h-full">
              {menuItems.map((item) => (
                <NavDropdown key={item.title} item={item} />
              ))}

              {linksNavbar.map((link) => (
                <li key={link.label} className="flex items-center h-full">
                  <Link
                    to={link.href}
                    className="relative text-army text-[15px] font-bold uppercase tracking-[1.5px] hover:text-gold transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LADO DIREITO */}
          <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
            {/* PESQUISA DESKTOP */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="hidden xl:flex items-center bg-transparent border-[1.5px] border-army rounded px-3 py-1.5 gap-2 focus-within:border-gold transition-all duration-300 xl:w-62 2xl:w-78 shadow-inner cursor-pointer"
            >
              <Search size={14} className="text-army shrink-0" />
              <input
                type="text"
                placeholder="Procurar"
                readOnly
                onFocus={() => setIsSearchOpen(true)}
                className="bg-transparent border-none outline-none text-army text-sm font-barlow tracking-wide w-full placeholder-army/60 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden text-army hover:text-gold transition-colors p-1 cursor-pointer"
                aria-label="Abrir pesquisa"
              >
                <Search size={22} />
              </button>

              {/* ÍCONE DE USUÁRIO */}
              {user ? (
                /* — Logado: dropdown com avatar + menu */
                <div ref={userMenuRef} className="relative hidden lg:block">
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 text-army hover:text-gold transition-colors p-1 cursor-pointer"
                    aria-label="Menu do usuário"
                  >
                    {/* Avatar círculo com imagem ou inicial */}
                    <span className="w-8 h-8 rounded-full bg-army text-white flex items-center justify-center text-sm font-barlow font-bold uppercase select-none overflow-hidden border border-zinc-200">
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
                    {/* Badge de notificações não lidas */}
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-gold text-branco text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-56 bg-branco border border-gray-100 rounded shadow-lg py-2 z-50"
                      >
                        {/* Cabeçalho do dropdown */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs text-gray-400 uppercase tracking-widest font-barlow">
                            Olá,
                          </p>
                          <p className="font-barlow font-bold text-preto text-sm uppercase tracking-wide truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          to="/minha-conta"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-barlow font-semibold uppercase tracking-wide text-preto hover:bg-gray-50 hover:text-army transition-colors"
                        >
                          <Settings size={15} className="text-army" />
                          Minha Conta
                        </Link>

                        <Link
                          to="/minha-conta?secao=pedidos"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-barlow font-semibold uppercase tracking-wide text-preto hover:bg-gray-50 hover:text-army transition-colors"
                        >
                          <Package size={15} className="text-army" />
                          Meus Pedidos
                        </Link>

                        <Link
                          to="/minha-conta?secao=notificacoes"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-barlow font-semibold uppercase tracking-wide text-preto hover:bg-gray-50 hover:text-army transition-colors"
                        >
                          <Bell size={15} className="text-army" />
                          Notificações
                          {unreadCount > 0 && (
                            <span className="ml-auto bg-gold text-branco text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                              {unreadCount}
                            </span>
                          )}
                        </Link>

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-barlow font-semibold uppercase tracking-wide text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={15} />
                            Sair
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* — Não logado: link para /login */
                <Link
                  to="/login"
                  className="hidden lg:block text-army hover:text-gold transition-colors p-1"
                >
                  <User size={22} />
                </Link>
              )}

              {/* CARRINHO */}
              <button
                className="text-army hover:text-gold transition-colors p-1 relative cursor-pointer"
                onClick={openCart}
              >
                <ShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-branco text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* HAMBÚRGUER MOBILE */}
              <button
                className="lg:hidden text-army hover:text-gold p-1 cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={menuItems}
        activeMobileMenu={activeMobileMenu}
        onSetActiveMenu={setActiveMobileMenu}
      />

      {/* OVERLAY DE PESQUISA */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
      />
    </>
  );
}
