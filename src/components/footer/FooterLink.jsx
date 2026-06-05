export const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="relative text-gray-400 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2.5 group py-0.5"
    >
      <span className="w-1 h-1 rounded-full bg-army/60 group-hover:bg-gold group-hover:scale-125 transition-all duration-300 shrink-0" />
      <span className="group-hover:translate-x-0.5 transition-transform duration-300">
        {children}
      </span>
    </a>
  </li>
);
