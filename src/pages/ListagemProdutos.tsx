import { ProductListingPage } from "../components/listagem/ProductListingPage";
import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";

export default function ListagemProdutos() {
  return (
    <main className="">
      <Navbar />
      <ProductListingPage />
      <Footer />
    </main>
  );
}
