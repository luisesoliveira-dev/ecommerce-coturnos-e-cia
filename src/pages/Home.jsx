// Se a sua página estiver na pasta /src/pages e os componentes em /src/components/home,
// os caminhos ficam assim:
import { HeroCarousel } from "../components/home/HeroCarousel";
import { ColecaoBanner } from "../components/home/ColecaoBanner";
import { SizeFilter } from "../components/home/SizeFilter";
import { VitrineProdutos } from "../components/home/VitrineProdutos";
import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { AnnouncementBar } from "../components/home/AnnouncementBar";
import { ColecaoDestaque } from "../components/home/ColecaoDestaque";
import { NewsletterSection } from "../components/sections/NewsletterSection";
import { SecondaryCarousel } from "../components/home/SecondaryCarousel";

// Importando os dados para as coleções
import { colecaoBanner, colecaoItens } from "../data/colecao";
import { promoSlides } from "../data/promoSlides";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-preto font-barlow">
      <Navbar />

      <AnnouncementBar />

      {/* 1. Carrossel Principal */}
      <HeroCarousel />

      {/* 2. Filtro Rápido por Tamanhos */}
      <SizeFilter />

      {/* 3. Destaque Estilo Vans (Curadoria com setinhas e animação) */}
      <ColecaoDestaque 
        title="O Clássico Reimaginado"
        banner={colecaoBanner}
        items={colecaoItens}
      />

      {/* 4. Grade de Categorias Dinâmica */}
      <VitrineProdutos />

      <ColecaoDestaque 
        title="Nossa Linha Elite"
        banner={colecaoBanner}
        items={colecaoItens}
      />
      
      {/* 5. Banners de Coleções Finais (Com espaçamento no celular) */}
      <ColecaoBanner />

      {/* 6. Carrossel Secundário (Promoções/Banners menores) */}
      <SecondaryCarousel slides={promoSlides} />

      <NewsletterSection />

      <Footer />
    </main>
  );
}
