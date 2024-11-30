'use client';

import Image from 'next/image';
import { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  fill,
  sizes,
  className,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Generate blur data URL for placeholder
  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <div className={`relative ${className} ${isLoading ? 'animate-pulse' : ''}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={90}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        placeholder="blur"
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default OptimizedImage;
