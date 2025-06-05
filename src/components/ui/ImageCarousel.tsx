
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: ImageData[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Remove the first image to avoid duplication
  const displayImages = images.slice(1);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [displayImages.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Main Image Container - More Creative Design */}
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
        {/* Creative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-fem-gold/20 via-transparent to-fem-terracotta/20 z-0" />
        
        <img
          src={displayImages[currentIndex].src}
          alt={displayImages[currentIndex].alt}
          className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-105"
          draggable={false}
        />
        
        {/* Creative overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Navigation Controls - More Elegant */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-6 left-6 bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
          <span className="text-white text-sm font-mont">
            {currentIndex + 1} / {displayImages.length}
          </span>
        </div>
      </div>

      {/* Enhanced Thumbnail Strip */}
      <div className="flex justify-center gap-4 mt-8">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 border-2",
              index === currentIndex 
                ? "ring-4 ring-fem-gold shadow-lg border-fem-gold scale-110" 
                : "opacity-60 hover:opacity-100 border-white/30"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-fem-gold/20" />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Indicator */}
      <div className="flex justify-center gap-3 mt-6">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 hover:scale-125",
              index === currentIndex 
                ? "w-12 bg-fem-gold shadow-lg" 
                : "w-3 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
