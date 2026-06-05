import { useState } from "react";

export function PriceRange({ min = 0, max = 1000, value, onChange }) {
  const [localMin, setLocalMin] = useState(value?.[0] ?? min);
  const [localMax, setLocalMax] = useState(value?.[1] ?? max);

  const handleMin = (e) => {
    const v = Math.min(Number(e.target.value), localMax - 50);
    setLocalMin(v);
    onChange([v, localMax]);
  };

  const handleMax = (e) => {
    const v = Math.max(Number(e.target.value), localMin + 50);
    setLocalMax(v);
    onChange([localMin, v]);
  };

  const pctMin = ((localMin - min) / (max - min)) * 100;
  const pctMax = ((localMax - min) / (max - min)) * 100;

  return (
    <div>
      {/* Valores */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-army">
          R$ {localMin.toLocaleString("pt-BR")}
        </span>
        <span className="text-[12px] font-bold text-army">
          R$ {localMax.toLocaleString("pt-BR")}
        </span>
      </div>

      {/* Trilha com range duplo */}
      <div className="relative h-1.5 bg-gray-200 rounded-full mb-4">
        {/* Faixa ativa */}
        <div
          className="absolute h-full bg-army rounded-full"
          style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }}
        />
        {/* Thumb min */}
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={localMin}
          onChange={handleMin}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
        />
        {/* Thumb max */}
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={localMax}
          onChange={handleMax}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        {/* Thumbs visuais */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-white shadow pointer-events-none"
          style={{ left: `calc(${pctMin}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-white shadow pointer-events-none"
          style={{ left: `calc(${pctMax}% - 8px)` }}
        />
      </div>
    </div>
  );
}
