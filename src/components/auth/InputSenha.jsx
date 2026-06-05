import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function InputSenha({ label, required, error, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-extrabold tracking-wide">
        {label}
        {required && <span className="text-gold font-extrabold">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`border h-10 md:h-11 px-3 w-full outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-400 focus:border-preto"
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-army cursor-pointer"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
    </div>
  );
}
