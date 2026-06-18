# Changelog - Coturnos & Cia

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.8.0] - 2026-06-11

### Corrigido
- **React 19 Stability**: Correção de erros de "cascading renders" nos componentes `ProductInfo`, `ProductGallery` e `PriceRange`.
  - Implementação do padrão de `key={product.id}` para reset de estado nativo e performático.
  - Remoção de `useEffect` redundantes que causavam loops de renderização síncrona.
- **ProductInfo Details**: 
  - Ativação do accordion de "Especificações Técnicas" com preenchimento dinâmico.
  - Normalização de propriedades (`sizes` vs `tamanhos`) para suporte a diferentes fontes de dados.
  - Implementação de `null safety` em seletores de cores e tamanhos para evitar crashes.
- **PriceRange Component**:
  - Correção de bug de sincronização de estado ao limpar filtros.
  - Migração de estilos inline para o arquivo global `App.css`, melhorando a manutenção e performance.

### Alterado
- **Navigation UX**: Reset automático de galeria e seletores ao navegar entre diferentes produtos, garantindo consistência visual imediata.
- **CSS Architecture**: Centralização de estilos de componentes complexos no `App.css` e uso extensivo de Tailwind CSS para layout.

## [1.7.0] - 2026-06-11

### Adicionado
- **Cart Engine (Global State)**: Implementação de gerenciamento de carrinho usando `React Context`.
  - Persistência de dados via `localStorage` (carrinho não é perdido ao recarregar).
  - Estado global acessível em toda a aplicação (Navbar, Página de Produto, Drawer).
- **CartDrawer (Sidebar)**: Novo painel lateral interativo.
  - Funcionalidade de aumentar/diminuir quantidades e remover itens.
  - Exibição de subtotal/total em tempo real.
  - Interface responsiva com rolagem customizada.
- **Scroll Lock System**: Implementação do hook `useScrollLock` para gerenciamento robusto de modais.
  - Resolve conflitos de sobreposição entre modais e bloqueia a rolagem do fundo automaticamente.
  - Elimina "saltos de layout" (layout shift) ao bloquear o scroll.

### Alterado
- **Cart UX Flow**: Fluxo de compra otimizado.
  - Abertura automática do carrinho após adicionar um item com sucesso.
  - Substituição de avisos de sistema por validações visuais (bordas vermelhas e textos de alerta no seletor de tamanhos) na página do produto.
- **Cart Drawer UI**: Refinamento estético completo.
  - Imagens com proporção aumentada (`w-32 h-38`), com restauração do efeito `mix-blend-multiply` para fidelidade visual.
  - Tipografia responsiva: fontes menores no mobile para melhor encaixe (`text-[12px]`) e fontes maiores no desktop (`text-sm`).
  - Botões "Finalizar Compra" e "Continuar Comprando" unificados com design premium.

### Corrigido
- **Bug de Incremento**: Corrigido bug onde itens eram adicionados em dobro (1+1=3) em ambiente de desenvolvimento.
- **Fast Refresh/ESLint**: Correção de avisos de `react-refresh` através da separação atômica entre Contexto, Provedor (Provider) e Hook.
- **Scroll Issues**: Corrigidos bugs de sobreposição de modais (z-index) e falhas no bloqueio de rolagem no `MobileMenu` e `ProductGallery`.

## [1.6.0] - 2026-06-11

### Adicionado
- **Product Gallery Lightbox**: Implementação de um sistema de visualização em tela cheia (Lightbox) customizado.
  - Galeria de miniaturas interativa (lateral no desktop, inferior no mobile).
  - Navegação via setas direcionais e controle de fechamento intuitivo.
  - Bloqueio inteligente de rolagem da página (body scroll lock) durante o uso.
- **Accordion Info System**: Novo sistema de informações expansíveis no sidebar do produto.
  - Seção "Características do Produto" integrando a descrição principal.
  - Seção "Devolução do Produto" com política de 7 dias detalhada.
  - Ícones interativos (Chevron) com animação de rotação e transições suaves de altura.

### Alterado
- **Product Gallery (Visual)**: Refinamento estético e funcional da galeria principal.
  - **Proporção Vertical**: Ajuste da proporção das imagens de quadrada para `4:5.12`, ganhando destaque vertical.
  - **Mobile Full-Width**: Galeria mobile agora ocupa de borda a borda da tela (`w-screen`) para maior imersão.
  - **Smart Peek**: Implementação de cálculo dinâmico com `clamp(32px, 10vw, 80px)` para garantir que a próxima imagem no carrossel mobile seja sempre visível de forma padronizada em qualquer aparelho.
- **Product Info Typography**: Padronização de fontes para `13px` nos blocos de informação, otimizando o espaço vertical e a legibilidade.

## [1.5.0] - 2026-06-08

### Adicionado
- **Product Detail Page**: Implementação de uma página de produto completa e dinâmica.
  - Arquitetura modular: `Breadcrumb`, `ProductView`, `ProductGallery` e `ProductInfo`.
  - Galeria de imagens inspirada no padrão premium/streetwear (grid de 2 colunas no desktop).
  - Simulador de frete integrado com máscara automática de CEP (`00000-000`).
  - Navegação dinâmica: cards de produtos agora redirecionam para a página de detalhes via `react-router-dom`.

### Alterado
- **Global Layout**: Aumento da largura máxima do container para **1560px** (`max-w-390`), proporcionando uma experiência de visualização mais ampla e moderna.
- **ColecaoBanner**: Unificação do alinhamento com o container global e refatoração da tipografia responsiva para maior impacto visual em telas grandes.
- **UI/UX Optimization**:
  - **Shipping Simulator**: Refatoração do input de frete para evitar quebras de layout em resoluções entre 1024px e 1280px.
  - **Optical Alignment**: Ajuste fino de padding no botão "Calcular" para compensar o desenho da fonte Barlow Condensed, garantindo centralização vertical perfeita.
  - **Product Gallery**: Implementação de carrossel de arraste (Snap Scroll) no mobile com indicadores de quantidade.

## [1.4.0] - 2026-06-08

### Alterado
- **SizeFilter (Home)**: Refatoração profunda focada em responsividade e UX.
  - **Safe Centering Strategy**: Implementada centralização inteligente usando `mx-auto` e `min-w-max`, garantindo que o primeiro item (tamanho 35) nunca seja cortado em resoluções intermediárias (~990px).
  - **Drag-to-Scroll**: Adicionada funcionalidade de arrastar com o mouse para navegação horizontal em desktops, com feedback visual de cursores `grab` e `grabbing`.
  - **Layout**: Forçado o comportamento de linha única com scroll horizontal em todas as resoluções onde o conteúdo transborda, evitando quebras de linha indesejadas.
- **Refatoração de Código**: Remoção total de estilos inline (`style` props) e tags `<style>` internas.
  - Migração de animações para utilitários do Tailwind e `App.css`.
  - Uso de classes nativas do Tailwind para cursores, eliminando redundâncias no CSS global.

### Adicionado
- **Animações**: Nova animação `fadeUp` adicionada ao `App.css` e disponível via classe utilitária `animate-fadeUp`.

## [1.3.0] - 2026-06-08

### Adicionado
- **Catalog Engine**: Transformação da `ProductListingPage` em um componente 100% reutilizável.
  - Suporte a props `title` e `initialProducts` para criação dinâmica de categorias.
  - Filtros inteligentes que se adaptam automaticamente ao conjunto de dados fornecido.
- **Load More System**: Implementado carregamento progressivo de produtos na listagem.
  - Limite inicial de 12 produtos, expandindo em mais 12 a cada clique.
  - Indicador textual de progresso ("Mostrando X de Y itens").
  - Lógica de reset automático do contador via `key` prop (Melhor Prática React 19).
- **Custom Sort Dropdown**: Novo componente de ordenação customizado substituindo o seletor nativo do navegador.
  - Controle total de cores (Preto/Branco/Verde Army no hover).
  - Remoção do destaque azul padrão do sistema operacional.
  - Animações suaves de abertura/fechamento com `framer-motion`.
- **Global Styles**: Implementada regra global de cursor no `App.css`.
  - Elementos interativos (`button`, `label`, `select`, `input[type="range"]`, etc.) agora exibem o cursor `pointer` automaticamente.

### Alterado
- **TopBarProducts**: Refatoração completa da responsividade.
  - **Mobile (< 768px)**: O breadcrumb (HOME/PRODUTOS) agora ocupa uma linha própria no topo.
  - **Mobile (< 768px)**: Botões de Filtro e Ordenação agora são expansíveis (`flex-1`), ocupando 50% da largura cada um.
  - **Ícones**: Adicionado ícone `SlidersHorizontal` para o botão de filtros no mobile.
- **PriceRange**: Refatoração focada em performance e UX.
  - Máxima fluidez (60 FPS) durante o arraste usando estado local desacoplado.
  - Adicionado suporte a inputs numéricos com validação inteligente.
  - Suporte à tecla **Enter** para aplicar preços digitados.
  - Correção de conflito de `z-index` que bloqueava o arraste em certas posições.
- **Filtros de Listagem**: Área de clique ampliada para todo o label (texto + ícone/quadrado).
  - **ColorFilter**: Seleção visual personalizada em **Dourado (gold)**.
  - **CategoryFilter**: Seleção em **Preto**.
  - **SizeFilter**: Destaque em **Army**.

### Corrigido
- **React 19 Stability**: Eliminado o erro "Calling setState synchronously within an effect" através da refatoração para sub-componentes e controle de estado via `key`.
- **PriceRange**: Problema de bloqueio de interação em uma das extremidades da barra de preço.
- **UX**: Corrigida a necessidade de clicar exatamente no checkbox para ativar os filtros.

## [1.2.0] - 2026-06-07

### Adicionado
- **SecondaryCarousel**: Novo componente de carrossel "slim" para banners promocionais.
  - Ocupa a largura total da tela.
  - Proporção responsiva ultra-fina (Mobile: `2.2/1`, Desktop: `21/3`).
  - Lógica de autoplay, arraste e navegação independente.
- **promoSlides.js**: Novo arquivo de dados dedicado ao carrossel secundário.

### Alterado
- **ColecaoDestaque**: Refatoração completa para torná-lo reutilizável.
  - Agora aceita `title`, `banner` e `items` via props.
  - Preparado para integração dinâmica com painel administrativo.
- **ColecaoDestaque**: Removido subtítulo para um design mais minimalista.
- **HeroCarousel**: Botões de navegação agora exibem borda preta apenas no estado `hover`.
- **NewsletterSection**: Removidas as bordas superior e inferior para uma transição mais fluida com as seções adjacentes.
- **Home**: Implementada passagem de dados dinâmicos para múltiplas instâncias da `ColecaoDestaque`.

### Corrigido
- **ColecaoDestaque**: Adicionada proteção para não renderizar o componente caso a lista de itens esteja vazia.

---
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
