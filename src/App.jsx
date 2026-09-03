import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/Home";
import LogineCadastro from "./pages/LogineCadastro";
import ListagemProdutos from "./pages/ListagemProdutos";
import DetalheProduto from "./pages/DetalheProduto";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ExchangeReturns from "./pages/ExchangesReturns";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<LogineCadastro />} />
        <Route path={ROUTES.PRODUTOS} element={<ListagemProdutos />} />
        <Route path={ROUTES.PRODUTO_DETALHE} element={<DetalheProduto />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.SOBRE_NOS} element={<AboutUs />} />
        <Route path={ROUTES.TROCAS_DEVOLUCOES} element={<ExchangeReturns />} />
        <Route path={ROUTES.FAQ} element={<FAQ />} />
        <Route path={ROUTES.CENTRAL_AJUDA} element={<HelpCenter />} />
      </Routes>
    </Layout>
  );
}

export default App;