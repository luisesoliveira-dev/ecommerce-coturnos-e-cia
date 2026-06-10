import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Componente PriceRange otimizado para performance e fluidez.
 * Utiliza estado local para o movimento visual e notifica o pai 
 * de forma controlada.
 */
export function PriceRange({ min = 0, max = 1000, value, onChange }) {
  // Estado local para garantir arraste suave (60fps)
  const [localMin, setLocalMin] = useState(value?.[0] ?? min);
  const [localMax, setLocalMax] = useState(value?.[1] ?? max);
  
  const rangeRef = useRef(null);

  // Sincroniza com props externas apenas se necessário
  useEffect(() => {
    if (value) {
      setLocalMin(value[0]);
      setLocalMax(value[1]);
    }
  }, [value]);

  // Cálculo de porcentagem para posicionamento visual
  const getPercent = useCallback(
    (val) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  // Atualiza a barra verde/army entre os seletores
  useEffect(() => {
    const minPercent = getPercent(localMin);
    const maxPercent = getPercent(localMax);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [localMin, localMax, getPercent]);

  // Manipuladores de eventos otimizados
  const handleMinChange = (e) => {
    const v = Math.min(Number(e.target.value), localMax - 1);
    setLocalMin(v);
  };

  const handleMaxChange = (e) => {
    const v = Math.max(Number(e.target.value), localMin + 1);
    setLocalMax(v);
  };

  // Notifica o componente pai apenas quando o usuário solta o mouse (onMouseUp)
  // ou termina a interação, para evitar processamento pesado de filtros a cada pixel
  const triggerChange = () => {
    onChange([localMin, localMax]);
  };

  // Funções para os inputs numéricos (com aplicação imediata no Enter ou Blur)
  const handleMinInputBlur = (e) => {
    let v = Number(e.target.value);
    if (v < min) v = min;
    if (v > localMax - 1) v = localMax - 1;
    setLocalMin(v);
    onChange([v, localMax]);
  };

  const handleMaxInputBlur = (e) => {
    let v = Number(e.target.value);
    if (v > max) v = max;
    if (v < localMin + 1) v = localMin + 1;
    setLocalMax(v);
    onChange([localMin, v]);
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "min") handleMinInputBlur(e);
      else handleMaxInputBlur(e);
      e.target.blur();
    }
  };

  return (
    <div className="px-1.5 pt-2 select-none">
      <style>
        {`
          .thumb-input {
            appearance: none;
            -webkit-appearance: none;
            pointer-events: none;
            position: absolute;
            height: 0;
            width: 100%;
            outline: none;
            background: transparent;
            margin: 0;
          }

          /* Estilo para Chrome/Safari/Edge */
          .thumb-input::-webkit-slider-thumb {
            appearance: none;
            -webkit-appearance: none;
            background-color: #ffffff;
            border: 2px solid #000000;
            border-radius: 50%;
            height: 18px;
            width: 18px;
            pointer-events: all;
            position: relative;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transition: transform 0.1s ease;
          }
          
          .thumb-input::-webkit-slider-thumb:active {
            transform: scale(1.2);
          }

          /* Estilo para Firefox */
          .thumb-input::-moz-range-thumb {
            appearance: none;
            background-color: #ffffff;
            border: 2px solid #000000;
            border-radius: 50%;
            height: 18px;
            width: 18px;
            pointer-events: all;
            position: relative;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            border: 2px solid black;
          }
        `}
      </style>

      <div className="relative h-1.5 bg-black/10 rounded-full mb-8 mt-4 flex items-center">
        {/* Barra Ativa (cor entre os handles) */}
        <div 
          ref={rangeRef} 
          className="absolute h-full bg-army z-10 rounded-full transition-all duration-75" 
        />

        {/* Sliders Reais (Invisíveis) */}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={triggerChange}
          onTouchEnd={triggerChange}
          className="thumb-input z-30"
          style={{ zIndex: localMin > max - 100 ? 50 : 30 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={triggerChange}
          onTouchEnd={triggerChange}
          className="thumb-input z-20"
        />
      </div>

      {/* Inputs Numéricos */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col flex-1">
          <span className="text-[10px] uppercase font-bold text-black/40 tracking-wider">
            Mínimo
          </span>
          <div className="flex items-center border-b border-black/5 focus-within:border-army transition-colors">
            <span className="text-[13px] font-black text-black mr-0.5">R$</span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              onBlur={handleMinInputBlur}
              onKeyDown={(e) => handleKeyDown(e, "min")}
              className="w-full text-[14px] font-black text-black bg-transparent border-none outline-none focus:ring-0 p-0"
            />
          </div>
        </div>
        
        <div className="w-4 h-px bg-black/10 mt-4" />
        
        <div className="flex flex-col text-right flex-1">
          <span className="text-[10px] uppercase font-bold text-black/40 tracking-wider">
            Máximo
          </span>
          <div className="flex items-center justify-end border-b border-black/5 focus-within:border-army transition-colors">
            <span className="text-[13px] font-black text-black mr-0.5">R$</span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              onBlur={handleMaxInputBlur}
              onKeyDown={(e) => handleKeyDown(e, "max")}
              className="w-16 text-[14px] font-black text-black bg-transparent border-none outline-none focus:ring-0 p-0 text-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
