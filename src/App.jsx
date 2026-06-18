import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogineCadastro from "./pages/LogineCadastro";
import ListagemProdutos from "./pages/ListagemProdutos";
import DetalheProduto from "./pages/DetalheProduto";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogineCadastro />} />
      <Route path="/produtos" element={<ListagemProdutos />} />
      <Route path="/produto/:id" element={<DetalheProduto />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
