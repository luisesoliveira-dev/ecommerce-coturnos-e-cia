import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { Breadcrumb } from "../components/product/Breadcrumb";
import { ProductView } from "../components/product/ProductView";
import { NewsletterSection } from "../components/sections/NewsletterSection";
import { produtos } from "../data/produtos";
import { productMock } from "../data/productDetail";

export default function DetalheProduto() {
  const { id } = useParams();

  // No mundo real, você usaria o ID para buscar na API. 
  // Aqui, vamos mesclar os dados fixos do mock com o produto encontrado na lista.
  const productFound = produtos.find(p => p.id === parseInt(id));

  // Garantir que a página comece no topo ao entrar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!productFound) {
    return (
      <main className="min-h-screen bg-white font-barlow">
        <Navbar />
        <div className="max-w-390 mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Produto não encontrado</h1>
          <p className="text-gray-500 mt-4 mb-8">O item que você está procurando não existe ou foi removido.</p>
          <Link to="/produtos" className="bg-army text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors">
            Voltar para a Loja
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Mescla os dados da lista global com as especificações detalhadas do mock (descrição, cores extras, etc)
  const productData = {
    ...productMock, // Pega descrições e cores ricas do mock
    ...productFound, // Sobrescreve com nome, preço e imagens reais do produto clicado
  };

  return (
    <main className="min-h-screen bg-white font-barlow">
      <Navbar />
      
      <Breadcrumb productName={productData.name} />

      <ProductView product={productData} />

      <NewsletterSection />
      
      <Footer />
    </main>
  );
}
