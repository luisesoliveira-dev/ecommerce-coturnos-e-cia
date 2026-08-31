import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";

export default function AboutUs() {
    return ( 
         <main className="min-h-screen bg-white text-preto font-barlow">
      <Navbar />

      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <p className="text-sm font-bold uppercase tracking-wider text-army mb-2">
                Coturnos & Cia
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-preto tracking-tight">
                Sobre Nós
              </h1>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-preto/80">
              <p>
                A Coturnos & Cia é uma loja especializada em coturnos
                e calçados táticos, oferecendo produtos voltados para
                diferentes estilos e necessidades.
              </p>

              <p>
                Nosso objetivo é oferecer produtos de qualidade,
                proporcionando uma experiência de compra simples,
                segura e prática.
              </p>

              <p>
                Trabalhamos para reunir diferentes opções de calçados
                em um único lugar, facilitando a escolha do produto
                ideal para cada cliente.
              </p>
            </div>

            <div className="mt-10 sm:mt-14">
              <img
                src="/images/sobre-nos.jpg"
                alt="Coturnos & Cia"
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
     );
}
