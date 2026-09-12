export interface Product {
  id: number;
  category: string;
  tipo: string;
  marca: string;
  cor: string;
  material: string;
  terreno: string;
  tamanhos: number[];
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  hoverImage: string;
  rating?: number;
  badge?: string;
}

export interface CartItem extends Product {
  cartKey: string;
  quantity: number;
  size: number | string;
  color: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    size: number | string,
    color: string,
  ) => void;
  updateQuantity: (cartKey: string, delta: number) => void;
  removeFromCart: (cartKey: string) => void;
  clearCart: () => void;
}

export interface ColecaoItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  hoverImage: string;
  badge?: string;
}

export interface Banner {
  id: number;
  mobileImage: string;
  desktopImage: string;
  link: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  description: string;
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
  images: string[];
}

export interface MenuItem {
  title: string;
  links: { label: string; href: string }[];
}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface ProductFilters {
  tipos: string[];
  destaques: string[];
  marcas: string[];
  tamanhos: number[];
  cores: string[];
  materiais: string[];
  terrenos: string[];
  preco: [number, number];
}
