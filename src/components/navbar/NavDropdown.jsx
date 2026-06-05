import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export function NavDropdown({ item }) {
  return (
    <li className="group relative flex items-center h-full">
      <button className="relative flex items-center gap-1 text-army text-sm font-semibold uppercase tracking-[1.5px] group-hover:text-gold transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
        {item.title}
        <ChevronDown
          size={14}
          className="group-hover:rotate-180 transition-transform duration-300"
        />
      </button>

      {/* DROPDOWN DESKTOP */}
      <div className="absolute top-12.5 left-0 w-60 bg-branco border-b-4 border-army shadow-[0_15px_35px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0">
        <ul className="py-3">
          {item.links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="block px-6 py-2.5 text-army text-[13px] font-bold uppercase tracking-wider hover:bg-gray-50 hover:text-gold transition-colors border-l-2 border-transparent hover:border-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
