import { useRef, useEffect, type MouseEvent } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import { ACCOUNT_SECTIONS, type AccountSection } from "./accountSections";
import { AccountDashboard } from "./AccountDashboard";
import { MyOrders } from "./MyOrders";
import { PersonalData } from "./PersonalData";
import { MyAddresses } from "./MyAddresses";
import { ExchangeGuarantee } from "./ExchangeGuarantee";
import { Notifications } from "./Notifications";
import { User, Zap, ArrowLeft, LogOut, ShieldCheck } from "lucide-react";

export function AccountLayout() {
  const { user, loginDemo, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPageX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const secaoQuery = searchParams.get("secao") as AccountSection | null;
  const activeSection: AccountSection =
    secaoQuery && ACCOUNT_SECTIONS.some((s) => s.id === secaoQuery)
      ? secaoQuery
      : "dashboard";

  const handleSectionChange = (section: AccountSection) => {
    setSearchParams({ secao: section });
  };

  const handleTabClick = (section: AccountSection) => {
    if (dragDistance.current > 6) {
      return;
    }
    handleSectionChange(section);
  };

  // Auto-centraliza a aba ativa no scroll horizontal mobile
  useEffect(() => {
    const activeEl = mobileTabsRef.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!mobileTabsRef.current) return;
    isDragging.current = true;
    startPageX.current = e.pageX;
    startX.current = e.pageX - mobileTabsRef.current.offsetLeft;
    scrollLeft.current = mobileTabsRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !mobileTabsRef.current) return;
    e.preventDefault();
    const diff = Math.abs(e.pageX - startPageX.current);
    if (diff > 5) {
      dragDistance.current = diff;
    }
    const x = e.pageX - mobileTabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    mobileTabsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setTimeout(() => {
      dragDistance.current = 0;
    }, 120);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const unreadCount = user?.notifications?.filter((n) => !n.read).length ?? 0;

  // Estado Não Autenticado
  if (!user) {
    return (
      <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md w-full border border-zinc-200 rounded-2xl bg-white shadow-lg p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
          {/* Faixa decorativa superior */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-army via-gold to-army" />

          <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center mx-auto shadow-xs">
            <User size={30} />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-army block mb-1">
              Acesso Seguro
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase text-zinc-900 tracking-wide">
              Área do Cliente
            </h1>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Identifique-se para consultar seus pedidos, rastreamento em tempo
              real, endereços e dados cadastrais.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={loginDemo}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-army text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-army/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-all cursor-pointer shadow-xs"
            >
              <Zap size={16} className="text-gold" />
              Entrar com Conta de Demonstração
            </button>

            <Link
              to="/login"
              className="w-full block py-3.5 px-4 border border-zinc-300 text-zinc-800 font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-all text-center"
            >
              Fazer Login ou Cadastrar
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 pt-3 border-t border-zinc-100">
            <ShieldCheck size={14} className="text-army" />
            <span>Ambiente seguro com criptografia de ponta</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Cabeçalho / Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6 sm:mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-army transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-army rounded px-1"
          >
            <ArrowLeft size={12} /> Início
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="text-xs uppercase tracking-widest text-army font-bold">
            Minha Conta
          </span>
        </nav>

        <button
          onClick={handleLogout}
          className="flex lg:hidden items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700 py-1 px-2.5 rounded-lg hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition-colors"
        >
          <LogOut size={13} /> Sair
        </button>
      </div>

      {/* NAVEGAÇÃO MOBILE (Tabs horizontais com scroll e suporte a drag) */}
      <div
        ref={mobileTabsRef}
        role="tablist"
        aria-label="Seções da Conta"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="lg:hidden mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 flex gap-2 border-b border-zinc-200 pb-3 touch-pan-x overscroll-x-contain select-none cursor-grab active:cursor-grabbing"
      >
        {ACCOUNT_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army ${
                isActive
                  ? "bg-army text-white shadow-xs border border-army"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === "notificacoes" && unreadCount > 0 && (
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-gold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* LAYOUT PRINCIPAL (Sidebar Desktop + Conteúdo) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          {/* Perfil Header */}
          <div className="pb-5 border-b border-zinc-200">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-army text-white flex items-center justify-center text-lg font-bold uppercase shadow-xs shrink-0 overflow-hidden border border-zinc-200">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm uppercase text-zinc-900 truncate tracking-wide">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Lista de Seções */}
          <nav
            role="tablist"
            aria-label="Navegação da Conta"
            className="flex flex-col gap-1.5 py-4"
          >
            {ACCOUNT_SECTIONS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSectionChange(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army ${
                    isActive
                      ? "bg-army text-white shadow-xs"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={isActive ? "text-gold" : "text-zinc-500"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </span>

                  {item.id === "notificacoes" && unreadCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-gold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Botão Sair */}
          <div className="pt-4 border-t border-zinc-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3.5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <LogOut size={16} />
              Sair da Conta
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <section
          aria-live="polite"
          className="flex-1 w-full bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 min-h-125 shadow-xs overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {activeSection === "dashboard" && (
                <AccountDashboard onNavigate={handleSectionChange} />
              )}
              {activeSection === "pedidos" && <MyOrders />}
              {activeSection === "dados" && <PersonalData />}
              {activeSection === "enderecos" && <MyAddresses />}
              {activeSection === "trocas" && <ExchangeGuarantee />}
              {activeSection === "notificacoes" && <Notifications />}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
