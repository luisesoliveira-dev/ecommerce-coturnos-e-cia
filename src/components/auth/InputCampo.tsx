import React from "react";

export interface InputCampoProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  type?: string;
  error?: string;
}

export function InputCampo({
  label,
  required,
  type = "text",
  error,
  ...props
}: InputCampoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-extrabold tracking-wide">
        {label}
        {required && <span className="text-gold font-extrabold">*</span>}
      </label>
      <input
        type={type}
        className={`border h-10 md:h-11 px-3 outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-preto"
        }`}
        {...props}
      />
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
    </div>
  );
}
