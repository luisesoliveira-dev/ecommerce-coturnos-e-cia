import { useState } from "react";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { menuItems, linksNavbar } from "../../data/menu";
import logo from "../../assets/logo1.png";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "../../context/useCart";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const { cartItems, isCartOpen, openCart, closeCart } = useCart();

  // Função para fechar o menu e resetar a navegação mobile
  const closeMenu = () => {
    setIsMenuOpen(false);
    // Aguarda a animação terminar para resetar o menu mobile
    setTimeout(() => setActiveMobileMenu(null), 300);
  };

  return (
    <>
      {/* NAVBAR DESKTOP E BASE MOBILE — Agora Fixa (Sticky) */}
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
                <li key={link} className="flex items-center h-full">
                  <a
                    href="#"
                    className="relative text-army text-sm font-semibold uppercase tracking-[1.5px] hover:text-gold transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LADO DIREITO: PESQUISA E ÍCONES */}
          <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
            {/* PESQUISA DESKTOP */}
            <div className="hidden xl:flex items-center bg-transparent border-[1.5px] border-army rounded px-3 py-1.5 gap-2 focus-within:border-gold transition-all duration-300 xl:w-62 2xl:w-78 shadow-inner">
              <Search size={14} className="text-army shrink-0" />
              <input
                type="text"
                placeholder="Procurar"
                className="bg-transparent border-none outline-none text-army text-[13px] font-barlow tracking-wide w-full placeholder-army/60"
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button className="xl:hidden text-army hover:text-gold transition-colors p-1 cursor-pointer">
                <Search size={22} />
              </button>

              <Link
                to="/login"
                className="hidden lg:block text-army hover:text-gold transition-colors p-1"
              >
                <User size={22} />
              </Link>

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

      {/* MENU OFF-CANVAS MOBILE */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={menuItems}
        activeMobileMenu={activeMobileMenu}
        onSetActiveMenu={setActiveMobileMenu}
      />

      {/* CARRINHO LATERAL (DRAWER) */}
      <CartDrawer isOpen={isCartOpen} onClose={() => closeCart} />
    </>
  );
}
