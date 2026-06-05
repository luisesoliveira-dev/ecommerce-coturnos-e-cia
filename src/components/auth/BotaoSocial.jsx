import {
  GoogleIcon,
  FacebookIcon,
  AppleIconDesktop,
} from "../icons/IconsSocial";

export function BotaoSocial({ provider, label, onClick }) {
  const renderIcon = () => {
    switch (provider) {
      case "google":
        return <GoogleIcon />;
      case "facebook":
        return <FacebookIcon />;
      case "apple":
        return (
          <>
            <AppleIconDesktop />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-24 h-14 sm:w-30 sm:h-18 lg:h-13 lg:w-full flex items-center justify-center lg:justify-center gap-3 bg-branco border border-preto/20 rounded lg:rounded-none p-3 lg:px-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:bg-gray-100 transition-all cursor-pointer"
    >
      <div className="transform transition-transform sm:scale-[1.3] lg:scale-100 flex items-center justify-center">
        {renderIcon()}
      </div>
      <span className="hidden lg:block text-sm font-bold text-preto">
        {label}
      </span>
    </button>
  );
}
