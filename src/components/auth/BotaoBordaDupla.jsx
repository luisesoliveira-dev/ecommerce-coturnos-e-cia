export function BotaoBordaDupla({
  children,
  variant = "dark",
  onClick,
  type = "button",
  noMargin = false,
}) {
  const isArmy = variant === "Army";

  return (
    <div className={`${noMargin ? "" : "mt-2"} relative`}>
      {/* Borda de fundo (deslocada) */}
      <div className="absolute top-0.75 left-0.75 w-full h-full border border-black z-0"></div>

      {/* Botão principal */}
      <button
        type={type}
        onClick={onClick}
        className={`relative z-10 w-full font-bold uppercase text-sm py-3.5 px-5 flex justify-between items-center border border-black transition-all active:translate-y-px active:translate-x-px cursor-pointer ${
          isArmy
            ? "bg-army text-branco hover:text-gray-200"
            : "bg-branco text-preto hover:bg-preto hover:text-branco"
        }`}
      >
        {children}
      </button>
    </div>
  );
}
