import { useEffect } from "react";

let lockCount = 0;

/**
 * Hook para travar a rolagem do corpo da página (body).
 * Resolve problemas de conflitos entre múltiplos modais e o "salto" de layout.
 */
export function useScrollLock(isOpen) {
  useEffect(() => {
    if (!isOpen) return;

    // Incrementa o contador de bloqueios ativos
    lockCount++;

    // Se for o primeiro bloqueio, aplica os estilos
    if (lockCount === 1) {
      // Calcula a largura da barra de rolagem para evitar o salto de layout
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    return () => {
      // Decrementa o contador ao desmontar ou fechar
      lockCount = Math.max(0, lockCount - 1);

      // Só restaura o estilo se não houver mais nenhum componente bloqueando
      if (lockCount === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  }, [isOpen]);
}
