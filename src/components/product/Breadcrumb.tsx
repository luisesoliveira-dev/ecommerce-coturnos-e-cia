export interface BreadcrumbProps {
  productName: string;
}

export function Breadcrumb({ productName }: BreadcrumbProps) {
  return (
    <nav className="max-w-390 mx-auto w-full px-4 sm:px-8 py-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400">
      <span className="hover:text-black cursor-pointer">Home</span> /
      <span className="hover:text-black cursor-pointer mx-1">Produtos</span> /
      <span className="text-preto ml-1">{productName}</span>
    </nav>
  );
}
