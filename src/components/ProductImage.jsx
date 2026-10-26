import React, { useState } from 'react';

// Reliable High-Res Fallbacks by Frame Shape
const FALLBACK_IMAGES = {
  'Square': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
  'Round': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
  'Geometric': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85',
  'Cat Eye': 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85',
  'Aviator': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85',
  'Rectangle': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
  'Contact Lenses': '/products/contact_lens_daily.jpg',
  'default': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85'
};

const ProductImage = ({
  src,
  alt = 'Eyewear Frame',
  frameShape = 'Geometric',
  category = '',
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-[4/3]',
  showShimmer = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const isContactLens = category === 'Contact Lenses' || (alt && alt.toLowerCase().includes('contact'));
  const fallbackSrc = isContactLens ? '/products/contact_lens_daily.jpg' : (FALLBACK_IMAGES[frameShape] || FALLBACK_IMAGES.default);
  const currentSrc = hasError ? fallbackSrc : (useFallback ? fallbackSrc : (src || fallbackSrc));

  const handleError = () => {
    if (!useFallback && currentSrc !== fallbackSrc) {
      setUseFallback(true);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#F6F3ED] flex items-center justify-center ${className}`}>
      {/* Skeleton Shimmer Loading Placeholder */}
      {showShimmer && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3EFE9] via-[#EAE3D8] to-[#F3EFE9] animate-pulse flex items-center justify-center">
          <div className="w-12 h-6 border-2 border-[#D8CEBE] rounded-sm opacity-40 animate-pulse" />
        </div>
      )}

      {/* Main Product Image with Smooth Fade-in & Scale Animation */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
