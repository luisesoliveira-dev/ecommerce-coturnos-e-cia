# Changelog - Coturnos & Cia

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-06-05

### Adicionado
- Novo arquivo `CHANGELOG.md` para rastreamento de melhorias.
- Suporte a imagens diferenciadas para Mobile e Desktop no carrossel.
- Campo `link` e `mobileImage`/`desktopImage` na estrutura de dados dos slides.
- **HeroCarousel**: Sistema de autoplay com intervalo de 5s e pausa inteligente sob interação.
- **HeroCarousel**: Suporte a arraste com mouse (Desktop) e toque (Mobile).
- **HeroCarousel**: Feedback visual de cursor (`grab`/`grabbing`) para indicar arraste.

### Alterado
- **HeroCarousel**: Refatoração completa para usar `aspect-ratio` responsivo.
  - Mobile: Proporção `25:26` (ajustada para ~800px de altura em 768px de largura).
  - Desktop: Proporção `21:9` (panorâmica) a partir de 768px.
- **HeroCarousel**: Transformado o slide inteiro em um link dinâmico.
- **HeroCarousel**: Removidos textos e botões sobrepostos para permitir o uso de artes prontas.
- **HeroCarousel**: Sincronização dos breakpoints de imagem e proporção em 768px.
- **Navbar**: Implementado posicionamento `sticky` (fixo) no topo com sombra dinâmica para melhor usabilidade durante a rolagem.

### Corrigido
- **HeroCarousel**: Implementada lógica de distinção entre clique e arraste para evitar navegação acidental durante o slide.
- **HeroCarousel**: Problema de "travamento" da altura do carrossel (remoção de `max-height`).
- **HeroCarousel**: Erros de sintaxe e instabilidade nas animações de transição.
- **HeroCarousel**: Problemas de seleção de imagem/texto durante o arraste (`select-none` e `draggable={false}`).

---
## [1.0.0] - 2026-06-05
- Versão inicial do projeto com vitrine, filtros e login/cadastro.
