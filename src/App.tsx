import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogineCadastroPage from "./pages/LogineCadastroPage";
import ListagemProdutosPage from "./pages/ListagemProdutosPage";
import DetalheProdutoPage from "./pages/DetalheProdutoPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUsPage from "./pages/AboutUsPage";
import ExchangesReturnsPage from "./pages/ExchangesReturnsPage";
import FAQPage from "./pages/FAQPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import MinhaContaPage from "./pages/MinhaContaPage";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./constants/routes";
import { useAuth } from "./context/useAuth";

function PedidosRedirect() {
  const { user } = useAuth();
  const target = `${ROUTES.MINHA_CONTA}?secao=pedidos`;
  if (user) {
    return <Navigate to={target} replace />;
  }
  return (
    <Navigate
      to={`${ROUTES.LOGIN}?redirect=${encodeURIComponent(target)}`}
      replace
    />
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LogineCadastroPage />} />
        <Route path={ROUTES.PRODUTOS} element={<ListagemProdutosPage />} />
        <Route path={ROUTES.PRODUTO_DETALHE} element={<DetalheProdutoPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.SOBRE_NOS} element={<AboutUsPage />} />
        <Route
          path={ROUTES.TROCAS_DEVOLUCOES}
          element={<ExchangesReturnsPage />}
        />
        <Route path={ROUTES.FAQ} element={<FAQPage />} />
        <Route path={ROUTES.CENTRAL_AJUDA} element={<HelpCenterPage />} />
        <Route path={ROUTES.MINHA_CONTA} element={<MinhaContaPage />} />
        <Route path={ROUTES.MEUS_PEDIDOS} element={<PedidosRedirect />} />
      </Routes>
    </Layout>
  );
}

export default App;
