import { FAQAccordion } from "../components/help/FAQAccordion";
import { faqItems } from "../data/help";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-white text-preto font-barlow">
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 sm:mb-10">
              <p className="text-sm font-bold uppercase tracking-wider text-army mb-2">
                Central de Ajuda
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-preto tracking-tight">
                Perguntas Frequentes
              </h1>

              <p className="mt-4 text-base sm:text-lg text-preto/70">
                Encontre respostas para as principais dúvidas sobre compras,
                pedidos, trocas e devoluções.
              </p>
            </div>

            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
