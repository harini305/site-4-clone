import Image from 'next/image';

// Product photo centred on the soft grey card background.
export default function ProductImage({ src, alt, sizes = '(max-width: 768px) 50vw, 25vw', priority = false, className = '' }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className || undefined}
      // multiply blends the photos' light studio backgrounds into the grey product cards
      style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
    />
  );
}
