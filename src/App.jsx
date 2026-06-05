import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogineCadastro from "./pages/LogineCadastro";
import ListagemProdutos from "./pages/ListagemProdutos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogineCadastro />} />
      <Route path="/produtos" element={<ListagemProdutos />} />
    </Routes>
  );
}

export default App;
