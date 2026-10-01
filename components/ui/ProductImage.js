import Image from 'next/image';

// Product cut-out image centred on the soft grey card background.
export default function ProductImage({ src, alt, sizes = '(max-width: 768px) 50vw, 25vw', priority = false, className = '' }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`img-fallback ${className}`}
      style={{ objectFit: 'contain' }}
    />
  );
}
