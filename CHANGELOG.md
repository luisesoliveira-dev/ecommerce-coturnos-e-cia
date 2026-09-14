# Changelog - Coturnos & Cia

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.4.0] - 2026-09-14

### Adicionado

- **Camada de Constantes de Rotas (`src/constants/routes.ts`)**:
  - Centralização de todas as rotas da aplicação em `ROUTES` (`HOME`, `LOGIN`, `PRODUTOS`, `PRODUTO_DETALHE`, `CHECKOUT`, `SOBRE_NOS`, `TROCAS_DEVOLUCOES`, `FAQ`, `CENTRAL_AJUDA`, `MEUS_PEDIDOS`, `MINHA_CONTA`, `CONTATO`, `LANCAMENTOS`).
- **Componente de Estrutura de Layout (`src/components/layout/Layout.tsx`)**:
  - Componente de layout global compartilhado (`Navbar + main + HelpWidget + Footer`).
- **Asset da Página Sobre Nós (`public/about_us.png`)**:
  - Imagem de alta qualidade integrada na página institucional Sobre Nós (`AboutUsContent.tsx`).
- **Tipagem de Navegação (`src/types/index.ts`)**:
  - Interface `NavbarLink` adicionada para tipagem consistente do menu de navegação.

### Alterado

- **Roteamento Global e Layout Unificado (`src/App.tsx`)**:
  - Envolvimento de todas as rotas com `<Layout>`, unificando o cabeçalho (`Navbar`), o widget de suporte (`HelpWidget`) e o rodapé (`Footer`).
  - Remoção de instâncias duplicadas de `HelpWidget`.
  - Substituição de strings literais de rotas pelas constantes centralizadas de `ROUTES`.
- **Limpeza das Páginas da Aplicação (`src/pages/`)**:
  - Eliminação de importações e chamadas redundantes de `<Navbar />` e `<Footer />` em todas as páginas (`HomePage`, `ListagemProdutosPage`, `DetalheProdutoPage`, `AboutUsPage`, `ExchangesReturnsPage`, `FAQPage`, `HelpCenterPage`, `LogineCadastroPage` e `MinhaContaPage`).
  - As páginas agora funcionam estritamente como _thin orchestrators_, delegando a estrutura visual ao `Layout`.
- **Desacoplamento Total do Carrinho (`src/context/CartContext.tsx`, `src/components/layout/Layout.tsx` e `src/components/navbar/Navbar.tsx`)**:
  - Estado de visibilidade do carrinho (`isCartOpen`, `openCart`, `closeCart`) promovido para o `CartContext`.
  - O componente `<CartDrawer />` foi removido de dentro da `Navbar` e agora é renderizado globalmente dentro do `Layout`.
  - O botão de carrinho na `Navbar` agora atua puramente como disparador chamando `openCart()`, desacoplando completamente a barra de navegação do modal.
  - Eliminação definitiva de prop drilling (`forcedCartOpen`) na aplicação.
- **Rodapé (`src/components/footer/Footer.tsx`)**:
  - Links institucionais e de atendimento agora apontam para as constantes `ROUTES` (`ROUTES.SOBRE_NOS`, `ROUTES.CENTRAL_AJUDA`, `ROUTES.MEUS_PEDIDOS`, `ROUTES.TROCAS_DEVOLUCOES`, `ROUTES.FAQ`).
- **Página Sobre Nós (`src/components/institucional/AboutUsContent.tsx`)**:
  - Atualização do caminho da imagem institucional para `/about_us.png` com bordas arredondadas (`rounded-lg`).

---

## [2.3.0] - 2026-09-14

### Adicionado

- **Módulo e Componentes de Pesquisa em Overlay (`src/components/search/`)**:
  - `SearchOverlay.tsx`: Orquestrador de busca estilo Nike com transição via Framer Motion, bloqueio de scroll de fundo (`useScrollLock`), fechamento via tecla `Escape`, botão "Cancelar" e clique no backdrop escuro. Responsivo: tela cheia em dispositivos móveis e tablets (`< 1024px`), e painel compacto de até `~68vh` no desktop (`>= 1024px`).
  - `SearchInput.tsx`: Campo de busca controlado com auto-focus, ícone de lupa, botão para limpar termo (`X`) e classes elásticas com `min-w-0` prevenindo estouros no mobile.
  - `SearchEmpty.tsx`: Estado inicial sem termo digitado, exibindo a seção _"Termos mais buscados"_ com chips clicáveis.
  - `SearchTermChip.tsx`: Componente reutilizável de tag/pílula com borda militar e efeito hover invertido.
  - `SearchRelatedTerms.tsx`: Coluna de termos relacionados dinâmicos com adaptação responsiva (sidebar vertical fixa no desktop `lg:`, grade de 4 colunas em tablets `md:`, e 2 colunas no mobile), com preservação de largura de coluna para manter os cards perfeitamente estáveis no desktop e tipografia com +2px no mobile (`< 640px`).
  - `SearchResultsGrid.tsx`: Exibição adaptativa dos resultados. No desktop e tablet (`>= 768px`), grade com 4 colunas reutilizando `CardProduto`. No mobile (`< 768px`), lista horizontal em linhas com miniatura quadrada bege, título em negrito, preços calibrados, divisória sutil e botão de largura total _"Ver mais resultados"_.
  - `SearchResults.tsx`: Layout orquestrador integrando a barra lateral de termos e a grade de resultados com `w-full` responsivo e alinhamento milimétrico na mesma linha de base (`items-start`).
- **Camada de Dados e Lógica de Busca (`src/data/search.ts`)**:
  - `trendingTerms`: Lista com os termos mais buscados do catálogo.
  - `searchProdutos(query)`: Algoritmo de filtragem multi-campo (nome, tipo, cor, terreno, material, marca, categoria) com suporte a busca composta por múltiplas palavras.
  - `getRelatedTerms(query)`: Gerador dinâmico de sugestões de termos baseado nos produtos encontrados.

### Alterado

- **Navbar (`src/components/navbar/Navbar.tsx`)**:
  - Disparo do `SearchOverlay` integrado tanto ao campo de busca desktop quanto ao botão de lupa mobile.
  - Preservação rigorosa de layout, altura (`h-16`), tipografia e espaçamentos originais.
- **Página de Catálogo e Resultados (`src/components/listagem/ProductListingPage.tsx`)**:
  - Reconhecimento automático do parâmetro de URL `?busca=` ou `?q=`.
  - Cabeçalho dinâmico _"Você buscou por: \"{termo}\""_ com traço decorativo dourado e contagem de itens encontrados.
  - Breadcrumb atualizado para `Home / Produtos / Busca` com atalho direto _"Limpar busca e ver todos os produtos"_.
  - Conexão bidirecional com os filtros laterais (`FilterSidebar.tsx`) e drawer mobile (`FilterDrawerMobile.tsx`) para refinar os produtos encontrados pela pesquisa.

---

## [2.2.0] - 2026-09-14

### Alterado

- **Padronização Arquitetural de Páginas (Page Shell Pattern & Nomenclatura \*Page.tsx)**:
  - Todas as páginas na pasta `src/pages/` foram convertidas em orquestradores enxutos (<15 linhas) e renomeadas uniformemente com o sufixo `Page.tsx` (`HomePage.tsx`, `AboutUsPage.tsx`, `CheckoutPage.tsx`, `DetalheProdutoPage.tsx`, `ExchangesReturnsPage.tsx`, `FAQPage.tsx`, `HelpCenterPage.tsx`, `ListagemProdutosPage.tsx`, `LogineCadastroPage.tsx`, `MinhaContaPage.tsx`).
  - **Área do Cliente (`src/pages/MinhaContaPage.tsx`)**: Delega para `src/components/account/AccountLayout.tsx`.
  - **Fluxo de Checkout (`src/pages/CheckoutPage.tsx`)**: Delega para `src/components/checkout/CheckoutFlow.tsx`.
  - **Detalhe do Produto (`src/pages/DetalheProdutoPage.tsx`)**: Delega para `src/components/product/ProductDetailContent.tsx`.
  - **Páginas Institucionais e de Suporte**:
    - `src/pages/AboutUsPage.tsx` ➔ delega para `src/components/institucional/AboutUsContent.tsx`.
    - `src/pages/ExchangesReturnsPage.tsx` ➔ delega para `src/components/institucional/ExchangesReturnsContent.tsx`.
    - `src/pages/FAQPage.tsx` ➔ delega para `src/components/help/FAQContent.tsx`.
    - `src/pages/HelpCenterPage.tsx` ➔ delega para `src/components/help/HelpCenterContent.tsx`.
    - `src/pages/LogineCadastroPage.tsx` e `src/pages/ListagemProdutosPage.tsx`: Padronizadas com tags semânticas `<main>` e ordem consistente de imports.
  - **Unificação de Estilos Globais (`src/App.css`)**:
    - Consolidação de todo o CSS do projeto em um único arquivo (`src/App.css`), eliminando o antigo `src/index.css`.
    - Migração das utilidades de scrollbar (`.custom-scrollbar`, `.no-scrollbar`) e remoção de declarações e tokens duplicados.
  - **Padronização e Carregamento Tipográfico Oficial (Google Fonts)**:
    - Adicionado pré-carregamento com `preconnect` e importação oficial no `index.html` das famílias **Barlow Condensed** (pesos 400, 600, 700, 800, 900) para Display/Headings/Labels/Botões e **Barlow** (pesos 400, 500, 600, 700) para leitura de corpo de texto.
    - Configurado `--font-body: "Barlow", sans-serif` e herdado no `body` em `App.css`, garantindo compatibilidade uniforme em 100% dos navegadores (mobile e desktop) e excelente conforto de leitura.
    - **Revisão de Espaçamento e Escala de Fontes**: Remoção de `tracking-tight`/`tracking-tighter` excessivos em títulos que causavam aglomeração de caracteres na fonte condensada (ajustados para `tracking-normal`), e elevação de fontes excessivamente pequenas (abaixo de 11px) para o padrão mínimo `text-xs` (12px), com normalização dos componentes globais (`Navbar`, `AnnouncementBar`, `MobileMenu`, `NavDropdown`, `Footer`, `CardProduto`, `VitrineProdutos`), aprimorando a legibilidade geral e consistência entre breakpoints sem alterar a identidade visual.
  - **Tipografia e Escala Fina**: Ajuste fino do tamanho da fonte dos links desktop da Navbar (`text-[15px] font-bold tracking-[1.5px]`), da `AnnouncementBar` (`text-[13px] sm:text-sm md:text-[15px]`) e ampliação calibrada no título e preço dos cards de produto (`CardProduto`: título `text-[15px] sm:text-base lg:text-[17px]` e preço desktop `lg:text-[18px]`), proporcionando excelente legibilidade em celular, tablet e desktop sem alterar o layout.
  - **Tipagem no React 19**: Substituição de referências globais de namespace `React.FormEvent`, `React.ChangeEvent`, `React.MouseEvent` e `React.ReactNode` por importações explícitas de tipos (`import { type FormEvent, type ChangeEvent } from "react"`).

---

## [2.1.0] - 2026-09-14

### Adicionado

- **Módulo de Autenticação e Contexto de Usuário (`src/context/`)**:
  - Implementação de `AuthContextObject.ts` e `AuthContext.tsx` com tipagem para `AuthUser`, `UserAddress`, `Order`, `OrderStatus`, `UserNotification` e `AuthContextType`.
  - Suporte a persistência no `localStorage`, login de demonstração (`loginDemo`), logout, atualização dinâmica de perfil e suporte a foto de perfil (`avatar`).
  - Criação do hook customizado `src/context/useAuth.ts`.
- **Camada de Dados da Conta (`src/data/account.ts`)**:
  - Criação do arquivo de dados `src/data/account.ts` centralizando todos os dados mockados da conta (`DEMO_USER`) e constantes de opções de motivos de troca (`EXCHANGE_REASONS`), mantendo os componentes e contextos desacoplados de dados estáticos.
- **Área do Cliente e Painel do Usuário (`src/pages/MinhaConta.tsx` e `src/components/account/`)**:
  - Nova página `/minha-conta` com roteamento dinâmico via query param `?secao=`.
  - **Sidebar Desktop & Tabs Mobile**: Navegação lateral completa para desktop e abas com scroll/arraste horizontal com detecção de movimento (`dragDistance`) e centralização automática no mobile.
  - **Painel Geral (`AccountDashboard.tsx`)**: Resumo da conta, atalhos rápidos numerados `01`, `02`, `03` e card de destaque do último pedido com status em tempo real.
  - **Gestão de Dados Pessoais (`PersonalData.tsx`)**: Upload e preview de foto de perfil (JPG/PNG/WebP até 2MB), grid de 2 colunas no desktop, e-mail protegido como somente leitura e fluxo isolado de alteração de senha com validações.
  - **Gestão de Endereços (`MyAddresses.tsx`)**: Cadastro e remoção de endereços, autocompletar via API do ViaCEP, definição de endereço principal e grid responsivo de 2 colunas no desktop.
  - **Acompanhamento de Pedidos (`MyOrders.tsx`)**: Accordion animado de detalhes do pedido, stepper com beacon de progresso e botão de cópia de código de rastreamento.
  - **Trocas e Devoluções Humanizado (`ExchangeGuarantee.tsx`)**: Formulário manual de solicitação de troca de numeração ou garantia com geração de protocolo e encaminhamento para atendimento via WhatsApp/e-mail.
  - **Central de Notificações (`Notifications.tsx`)**: Alertas categorizados com ações para marcar como lidas individualmente ou em lote.
- **Estilos Globais (`src/index.css`)**:
  - Utilitário `.no-scrollbar` compatível com Safari/Chrome/Firefox mantendo o comportamento de rolagem nativo.

### Alterado

- **Navbar & Menu Mobile (`src/components/navbar/`)**:
  - `Navbar.tsx`: Renderização da foto de perfil do usuário (ou inicial), badge dinâmico de notificações não lidas e dropdown de acesso rápido às seções da conta.
  - `MobileMenu.tsx`: Integração do usuário autenticado com avatar e botão de logout.
- **Roteamento Global (`src/App.tsx` e `src/main.tsx`)**:
  - Encapsulamento de toda a aplicação no `<AuthProvider>`.
  - Registro da rota `/minha-conta`.
- **Paleta de Cores e Padrão Visual**:
  - Eliminação de tons turvos/bege-marrom (`#F5F0EA`) na área do cliente, adotando padrão limpo de grandes e-commerces (branco puro, cinza neutro `zinc-50`, bordas `zinc-200` e acentos elegantes Army Green e Gold).

---

## [2.0.0] - 2026-09-08

### Alterado

- **Migração das Páginas Principais e Institucionais (`src/pages/`)**:
  - Migração completa de todas as 9 páginas para TypeScript (`Home.tsx`, `ListagemProdutos.tsx`, `DetalheProduto.tsx`, `Checkout.tsx`, `LogineCadastro.tsx`, `AboutUs.tsx`, `ExchangesReturns.tsx`, `FAQ.tsx`, `HelpCenter.tsx`).
  - Tipagem rigorosa de parâmetros de rota (`useParams<{ id: string }>()`), estados de carrinho e integração de componentes sem alteração de layout.
- **Migração dos Componentes de Ajuda e Atendimento (`src/components/help/`)**:
  - Implementação das interfaces `FAQAccordionProps`, `HelpFloatingButtonProps` e `HelpMenuProps`.
  - Migração de `FAQAccordion.tsx`, `HelpFloatingButton.tsx`, `HelpMenu.tsx` e `HelpWidget.tsx`.
- **Migração dos Componentes de Autenticação (`src/components/auth/`)**:
  - Implementação das interfaces `BotaoBordaDuplaProps`, `BotaoSocialProps`, `InputCampoProps` e `InputSenhaProps`.
  - Migração de `BotaoBordaDupla.tsx`, `BotaoSocial.tsx`, `InputCampo.tsx`, `InputSenha.tsx` e `LoginCadastro.tsx`.
  - Tipagem completa de estados de formulário, máscaras (CPF, Celular, Data, CEP), validações síncronas e consulta assíncrona ao ViaCEP.
- **Migração e Restauração dos Componentes de Checkout (`src/components/checkout/`)**:
  - Implementação das interfaces `CheckoutStepperProps`, `CartStepProps`, `PaymentStepProps` e `OrderSummaryProps`.
  - Migração e restauração 1:1 de `OrderSummary.tsx`, `PaymentStep.tsx` (QR Code grande + Boleto), `CartStep.tsx`, `DeliveryStep.tsx`, `CheckoutStepper.tsx` e `ConfirmationStep.tsx`.
- **Migração dos Componentes de Catálogo e Filtros (`src/components/listagem/`)**:
  - Implementação do contrato `ProductFilters` com suporte a tipos, marcas, tamanhos, cores, materiais, terrenos e faixa de preço.
  - Migração de `CategoryFilter.tsx`, `ColorFilter.tsx`, `SizeFilter.tsx`, `PriceRange.tsx`, `FilterSection.tsx`, `FilterSidebar.tsx`, `FilterDrawerMobile.tsx`, `TopBarProducts.tsx`, `ProductGrid.tsx` e `ProductListingPage.tsx`.
- **Auditoria de Fidelidade Visual 1:1**:
  - Validação automatizada contra o Git original (`9c4958a`) em todos os 61 arquivos do projeto, garantindo 100% de correspondência visual.

### Corrigido

- **Configuração ESLint (`eslint.config.js`)**: Remoção de importação não instalada (`eslint-plugin-react`) e ativação da análise estática com `typescript-eslint`, `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`.

---

## [1.9.0] - 2026-09-06

### Adicionado

- **Formatador Monetário Centralizado**: Implementação do utilitário `src/utils/formatPrice.ts` com `Intl.NumberFormat` para padronização de moeda (BRL - "R$ 649,90") com 2 casas decimais e separador de milhar.
- **TypeScript Architecture**: Configuração inicial do ecossistema TypeScript com suporte híbrido (convivência entre JS e TS via `allowJs: true`).
  - Criação de `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` e `src/vite-env.d.ts`.
  - Instalação e integração do `typescript`, `@types/react`, `@types/react-dom` e `typescript-eslint`.
  - Criação do repositório central de tipos em `src/types/index.ts` contendo as interfaces: `Product`, `CartItem`, `CartContextType`, `ColecaoItem`, `Banner`, `FaqItem`, `ProductDetail` e `MenuItem`.
- **Validação de Build**: Atualização do script `build` no `package.json` para incluir verificação estática de tipos (`tsc -b && vite build`).

### Alterado

- **Migração da Camada de Configuração e Raiz**:
  - Migração de `vite.config.js` para `vite.config.ts`.
  - Migração do ponto de entrada `index.html`, `src/main.jsx` -> `src/main.tsx` (com verificação estrita de elemento `#root`) e `src/App.jsx` -> `src/App.tsx`.
- **Normalização de Dados e Preços (Data Layer)**:
  - Migração de todos os arquivos de `src/data/*.js` para `src/data/*.ts`.
  - Conversão dos valores monetários de texto (ex: `"R$ 649,90"`) para formato numérico decimal puro (`number`), alinhando o frontend com a modelagem do banco MySQL (`DECIMAL`).
  - Aplicação de tipagem estrita em todas as listas de dados (`produtos.ts`, `colecao.ts`, `help.ts`, `menu.ts`, `productDetail.ts`, `promoSlides.ts`, `slides.ts`).
- **Migração de Contextos e Hooks (Global State)**:
  - Migração de `CartContextObject.js` para `CartContextObject.ts` com tipagem explícita `createContext<CartContextType | undefined>`.
  - Migração de `CartContext.jsx` para `CartContext.tsx`, com tipagem de `CartProviderProps`, `useState<CartItem[]>` e limpeza da lógica de parse de string no preço do produto.
  - Migração de `useCart.js` para `useCart.ts` com assinatura de tipo `CartContextType`.
  - Migração de `useScrollLock.js` para `useScrollLock.ts` com parâmetro `(isOpen: boolean)`.
- **Migração dos Componentes Base e Globais**:
  - Migração dos componentes de rodapé (`src/components/footer/`): `Footer.tsx`, `FooterLink.tsx`, `FooterSection.tsx`, `PaymentIcons.tsx`.
  - Migração dos componentes de navegação (`src/components/navbar/`): `Navbar.tsx`, `NavDropdown.tsx`, `MobileMenu.tsx`, `CartDrawer.tsx`.
  - Migração dos componentes da Home (`src/components/home/`): `HeroCarousel.tsx`, `SecondaryCarousel.tsx`, `ColecaoDestaque.tsx`, `ColecaoDestaqueBanner.tsx`, `ColecaoBanner.tsx`, `SizeFilter.tsx`, `VitrineProdutos.tsx`, `AnnouncementBar.tsx`.
  - Migração dos componentes de Detalhes do Produto (`src/components/product/`): `ProductGallery.tsx`, `ProductInfo.tsx`, `ProductView.tsx`, `Breadcrumb.tsx`.
  - Migração da UI Base e Seções (`src/components/ui/`, `icons/`, `sections/`): `CardProduto.tsx`, `HorizontalDragScroll.tsx`, `IconsSocial.tsx`, `NewsletterSection.tsx`.

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
