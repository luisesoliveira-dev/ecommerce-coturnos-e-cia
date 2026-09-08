/**
 * Utilitário para formatação de valores monetários no padrão brasileiro (BRL).
 *
 * Utiliza o Intl.NumberFormat nativo do navegador, garantindo:
 * - O prefixo oficial "R$"
 * - Separação correta de milhar com ponto (ex: R$ 1.250,00)
 * - Exatamente 2 casas decimais separadas por vírgula
 * - Segurança caso o valor seja nulo ou indefinido
 */
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "";
  }
  return currencyFormatter.format(value);
}
