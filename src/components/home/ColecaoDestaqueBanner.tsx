export interface ColecaoDestaqueBannerProps {
  image: string;
  alt: string;
}

export function ColecaoDestaqueBanner({
  image,
  alt,
}: ColecaoDestaqueBannerProps) {
  return (
    <div className="relative w-full h-full overflow-hidden group">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
