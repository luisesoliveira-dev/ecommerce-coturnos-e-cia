import { Mail, MessageCircle } from "lucide-react";

import {
  emailUrl,
  whatsappUrl,
} from "../data/help";

export default function HelpCenter() {
    return (
      <main className="min-h-screen bg-white text-preto font-barlow">
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 sm:mb-14">
                <p className="text-sm font-bold uppercase tracking-wider text-army mb-2">
                  Atendimento
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-preto tracking-tight">
                  Central de Ajuda
                </h1>

                <p className="mt-4 text-base sm:text-lg text-preto/70">
                  Escolha uma das opções abaixo para entrar em contato com a
                  Coturnos & Cia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <a
                  href={emailUrl}
                  className="group border-2 border-preto p-6 sm:p-8 flex flex-col items-center text-center transition-colors hover:bg-army hover:text-branco"
                >
                  <Mail size={32} className="mb-4" />

                  <h2 className="text-xl sm:text-2xl font-black uppercase">
                    E-mail
                  </h2>

                  <p className="mt-2 text-sm sm:text-base opacity-70">
                    Envie sua dúvida para nossa equipe.
                  </p>

                  <span className="mt-6 inline-flex items-center justify-center border-2 border-current px-5 py-3 font-bold uppercase text-sm">
                    Enviar E-mail
                  </span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-2 border-preto p-6 sm:p-8 flex flex-col items-center text-center transition-colors hover:bg-army hover:text-branco"
                >
                  <MessageCircle size={32} className="mb-4" />

                  <h2 className="text-xl sm:text-2xl font-black uppercase">
                    WhatsApp
                  </h2>

                  <p className="mt-2 text-sm sm:text-base opacity-70">
                    Fale diretamente com nossa equipe.
                  </p>

                  <span className="mt-6 inline-flex items-center justify-center border-2 border-current px-5 py-3 font-bold uppercase text-sm">
                    Fale no WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
