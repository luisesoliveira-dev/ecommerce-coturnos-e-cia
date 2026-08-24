import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";

export default function ExchangeReturns() {
    return ( 
         <main className="min-h-screen bg-white text-preto font-barlow">
      <Navbar />

      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
          <article className="max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <p className="text-sm font-bold uppercase tracking-wider text-army mb-2">
                Atendimento
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-preto tracking-tight">
                Trocas e Devoluções
              </h1>
            </div>

            <div className="space-y-8 text-preto/80">
              <section>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-preto mb-3">
                  Política de Troca
                </h2>

                <p className="text-base sm:text-lg leading-relaxed">
                  Consulte as condições estabelecidas pela Coturnos &
                  Cia para realizar a troca de um produto adquirido.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-preto mb-3">
                  Política de Devolução
                </h2>

                <p className="text-base sm:text-lg leading-relaxed">
                  As solicitações de devolução devem seguir as condições
                  e os prazos definidos pela loja.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-preto mb-3">
                  Condições
                </h2>

                <p className="text-base sm:text-lg leading-relaxed">
                  Para informações detalhadas sobre prazos, condições
                  do produto e procedimentos, entre em contato com a
                  nossa Central de Ajuda.
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
     );
}
