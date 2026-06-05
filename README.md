# Coturnos & Cia - E-commerce Tático 🥾

Este é um projeto de e-commerce moderno e responsivo focado na venda de coturnos e calçados táticos. Desenvolvido com as tecnologias mais recentes do ecossistema React, o projeto oferece uma experiência de usuário fluida, com filtros avançados e uma interface intuitiva.

## 🚀 Sobre o Projeto

O **Coturnos & Cia** foi construído para servir como uma plataforma robusta de vendas online. Ele conta com uma página inicial dinâmica, listagem de produtos com filtros em tempo real e uma área de autenticação (Login/Cadastro).

## ✨ Funcionalidades Principais

- **Página Inicial Dinâmica**:
  - Carrossel de banners principais.
  - Filtro rápido por tamanhos.
  - Vitrines de produtos categorizadas (Lançamentos, Mais Vendidos, Promoções).
  - Seção de Newsletter e banners promocionais.
- **Listagem de Produtos**:
  - Filtros laterais por Categoria, Preço, Cor e Tamanho.
  - Barra de ordenação e visualização em grade responsiva.
  - Drawer de filtros otimizado para dispositivos móveis.
- **Autenticação**:
  - Interface completa para Login e Cadastro de novos usuários.
- **Design Responsivo**: Totalmente adaptado para smartphones, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build ultra-rápida.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework CSS para estilização moderna e eficiente.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones elegantes.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação.

## 📂 Estrutura de Pastas

```text
src/
├── assets/       # Imagens e vetores estáticos
├── components/   # Componentes reutilizáveis (Navbar, Footer, UI)
│   ├── auth/     # Componentes da área de login/cadastro
│   ├── home/     # Componentes exclusivos da landing page
│   ├── listagem/ # Componentes da página de produtos e filtros
│   └── ui/       # Elementos de interface genéricos
├── data/         # Mock de dados (produtos, menus, slides)
├── pages/        # Páginas principais da aplicação
├── App.jsx       # Configuração de rotas
└── main.jsx      # Ponto de entrada da aplicação
```

## 🔧 Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ecommerce-coturnos-e-cia.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd ecommerce-coturnos-e-cia
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:5173`.

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a versão de produção na pasta `dist/`.
- `npm run lint`: Executa a verificação do ESLint para garantir a qualidade do código.
- `npm run preview`: Visualiza localmente a build de produção.

---
Desenvolvido como parte do Projeto Integrador.
