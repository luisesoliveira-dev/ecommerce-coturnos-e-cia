import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogineCadastro from "./pages/LogineCadastro";
import ListagemProdutos from "./pages/ListagemProdutos";
import DetalheProduto from "./pages/DetalheProduto";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ExchangeReturns from "./pages/ExchangesReturns";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
// import { HelpWidget } from "./components/help/HelpWidget";
import Layout from "./components/layout/Layout";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogineCadastro />} />
          <Route path="/produtos" element={<ListagemProdutos />} />
          <Route path="/produto/:id" element={<DetalheProduto />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sobre-nos" element={<AboutUs />} />
          <Route path="/trocas-e-devolucoes" element={<ExchangeReturns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/central-de-ajuda" element={<HelpCenter />} />
        </Routes>
      </Layout>
  );
}

export default App;
