export const ColecaoBanner = () => {
  const collections = [
    {
      image: "/Coleção.png",
      tag: "Para o Combate",
      title: "Coleção\nMissão",
      cta: "Explorar Produtos",
    },
    {
      image: "/Coleção2.png",
      tag: "Para o Dia a Dia",
      title: "Coleção\nPostura",
      cta: "Explorar Produtos",
    },
  ];

  return (
    <section className="w-full bg-pretoclaro mb-14 py-13">
      <div className="max-w-390 mx-auto w-full px-4 sm:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-8">
          <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-2">
            Nossas Coleções
          </p>
          <h2 className="text-xl sm:text-3xl font-black text-branco uppercase tracking-tight">
            Encontre o seu estilo
          </h2>
          <div className="w-10 h-0.5 bg-gold mx-auto mt-3" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {collections.map((col, i) => (
            <div
              key={i}
              className="relative overflow-hidden cursor-pointer group rounded-sm"
              style={{ height: "clamp(320px, 42vw, 560px)" }}
            >
              {/* Imagem */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                draggable={false}
              />

              {/* Gradiente - Mais denso na base para legibilidade */}
              <div className="absolute inset-0 bg-linear-to-t from-preto/90 via-preto/30 to-transparent" />
              <div className="absolute inset-0 bg-preto/0 group-hover:bg-preto/10 transition-colors duration-500" />

              {/* Conteúdo */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 xl:p-12">
                <p className="text-gold font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3">
                  {col.tag}
                </p>
                <h3 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-branco uppercase tracking-tighter leading-[0.9] mb-6 whitespace-pre-line">
                  {col.title}
                </h3>

                <span className="inline-flex items-center gap-3 text-branco group-hover:text-gold font-bold uppercase tracking-widest text-xs sm:text-sm transition-colors duration-300">
                  {col.cta}
                  <span className="block w-8 h-0.5 bg-current transition-all duration-500 group-hover:w-14" />
                </span>
              </div>

              {/* Borda hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
