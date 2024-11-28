import Image from 'next/image';
import { useEffect, useState } from 'react';
import Script from 'next/script';

const SEOImage = ({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 450, 
  priority = false,
  className = '',
  author = 'SportzPoint'
}) => {
  const [loaded, setLoaded] = useState(false);

  // Generate structured data for the image
  const imageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: src,
    caption: caption || alt,
    width,
    height,
    author: {
      '@type': 'Organization',
      name: author
    }
  };

  return (
    <figure className="relative w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}

      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageStructuredData)
        }}
      />
    </figure>
  );
};

export default SEOImage;
