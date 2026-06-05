import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#F2F2F0] font-barlow border-t border-b border-gray-200">
      <div className="max-w-360 mx-auto px-4 sm:px-8 py-10 sm:py-12">
        {!submitted ? (
          <div className="flex flex-col lg:flex-row items-left justify-between gap-6 lg:gap-16">
            {/* TEXTO */}
            <div className="text-left">
              <h2 className="text-[15px] sm:text-xl md:text-2xl font-black uppercase text-preto tracking-tight leading-tight">
                Inscreva-se na nossa{" "}
                <span className="border-b-3 border-gold">Newsletter</span>
              </h2>
              <p className="text-preto text-[13px] sm:text-sm md:text-base mt-2">
                Receba novidades, lançamentos e promoções em seu email.{" "}
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto lg:min-w-95 xl:min-w-125 shrink-0"
            >
              <input
                type="email"
                placeholder="Digite seu e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 bg-branco border border-preto border-r-0 text-preto placeholder-gray-400 px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-army hover:bg-preto text-branco px-5 py-2.5 font-bold uppercase text-sm tracking-widest flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                Cadastrar
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-preto font-black uppercase tracking-tight text-lg">
              Você está no radar!
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Seu cupom de <span className="text-army font-bold">10% OFF</span>{" "}
              chegará em breve.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
