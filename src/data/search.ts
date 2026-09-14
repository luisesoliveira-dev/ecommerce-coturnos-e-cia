import { Product } from "../types";
import { produtos } from "./produtos";

// Termos populares exibidos no estado vazio da busca
export const trendingTerms: string[] = [
  "Coturno Tático",
  "Bota Militar",
  "Couro Legítimo",
  "Selva",
  "Urbano",
  "Preto",
  "Verde",
  "Trilha",
  "Promoção",
  "Coturno Desert",
  "Bota Tática",
];

/**
 * Filtra produtos pelo termo de busca.
 * Cruza query com name, tipo, cor, terreno, material, marca e category.
 * Suporta busca por frase exata ou por palavras individuais combinadas.
 */
export function searchProdutos(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(Boolean);

  return produtos.filter((p) => {
    const combined = [
      p.name,
      p.tipo,
      p.cor,
      p.terreno,
      p.material,
      p.marca,
      p.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return combined.includes(q) || words.every((w) => combined.includes(w));
  });
}

/**
 * Gera termos relacionados com base na query digitada.
 * Extrai valores únicos dos campos dos produtos que batem com a query.
 */
export function getRelatedTerms(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const termos = new Set<string>();

  produtos.forEach((p) => {
    const campos: (string | undefined)[] = [
      p.name,
      p.tipo,
      p.cor,
      p.terreno,
      p.material,
      p.marca,
    ];
    campos.forEach((campo) => {
      if (campo && campo.toLowerCase().includes(q) && campo !== p.name) {
        // Formata para exibição (primeira letra maiúscula por palavra)
        const formatted = campo
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
        termos.add(formatted);
      }
    });

    // Adiciona nomes de produtos relacionados (diferente da busca direta)
    if (
      [p.tipo, p.cor, p.terreno, p.material, p.marca].some((f) =>
        f?.toLowerCase().includes(q),
      )
    ) {
      termos.add(p.name);
    }
  });

  return Array.from(termos).slice(0, 8);
}
