"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ProductImage } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ProductGalleryProps {
  images: Array<{ node: ProductImage }>;
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const currentImage = images[selectedImage]?.node;

  return (
    <div className="flex flex-col gap-y-4">
      {/* Main Image with Zoom */}
      <div 
        className={cn(
          "relative aspect-[4/5] overflow-hidden bg-surface cursor-zoom-in",
          isZoomed && "cursor-zoom-out"
        )}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isZoomed && setIsZoomed(false)}
      >
        {currentImage && (
          <Image
            src={currentImage.url}
            alt={currentImage.altText || "Product Image"}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isZoomed && "scale-[2.5]"
            )}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : undefined}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        
        {/* Zoom Hint */}
        {!isZoomed && images.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="font-body text-[10px] uppercase tracking-widest text-ink/60 font-bold">
              Click to zoom
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setIsZoomed(false);
              }}
              className={cn(
                "relative flex-shrink-0 w-20 h-24 overflow-hidden bg-surface transition-all",
                selectedImage === index 
                  ? "ring-2 ring-accent ring-offset-2" 
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image.node.url}
                alt={image.node.altText || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out lg:hidden"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-8 h-8" />
          </button>
          {currentImage && (
            <Image
              src={currentImage.url}
              alt={currentImage.altText || "Product Image"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          )}
        </div>
      )}
    </div>
  );
}
