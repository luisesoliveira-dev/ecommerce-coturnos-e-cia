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
    <section className="w-full bg-pretoclaro mb-16 py-10 px-4 sm:px-8 lg:px-12">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl lg:max-w-400 mx-auto">
        {collections.map((col, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group rounded-sm"
            style={{ height: "clamp(280px, 38vw, 520px)" }}
          >
            {/* Imagem */}
            <img
              src={col.image}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
            />

            {/* Gradiente */}
            <div className="absolute inset-0 bg-linear-to-t from-preto/85 via-preto/20 to-transparent" />
            <div className="absolute inset-0 bg-preto/0 group-hover:bg-preto/20 transition-colors duration-500" />

            {/* Conteúdo */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-gold font-bold tracking-[0.3em] text-xs uppercase mb-2">
                {col.tag}
              </p>
              <h3 className="text-2xl sm:text-4xl font-black text-branco uppercase tracking-tight leading-none mb-5 whitespace-pre-line">
                {col.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-branco group-hover:text-gold font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors duration-300">
                {col.cta}
                <span className="block w-6 h-0.5 bg-current transition-all duration-300 group-hover:w-10" />
              </span>
            </div>

            {/* Borda hover */}
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none rounded-sm" />
          </div>
        ))}
      </div>
    </section>
  );
};
