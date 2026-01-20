"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
  };
}

interface CategoryCarouselProps {
  categories: Category[];
  locale: string;
  fallbackImages: string[];
}

export function CategoryCarousel({ categories, locale, fallbackImages }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Update active index based on scroll position
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const index = Math.round(scrollLeft / (itemWidth + 32)); // 32 is the gap (gap-8)
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      scrollContainerRef.current.scrollTo({
        left: index * (itemWidth + 32),
        behavior: "smooth"
      });
    }
  };

  const displayCategories = categories.length > 0 
    ? categories 
    : ['Bedroom', 'Bathroom', 'Living', 'Bed Fillers', 'Essentials', 'Decor'].map((name, idx) => ({
        id: `fallback-${idx}`,
        title: name,
        handle: name.toLowerCase(),
        image: { url: fallbackImages[idx] || fallbackImages[0] }
      }));

  return (
    <section className="container-custom space-y-10 py-16 relative overflow-visible">
      <div className="flex justify-between items-end border-b border-ink/5 pb-6">
        <div className="space-y-1">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-ink italic leading-tight">
            Shop By Category
          </h2>
          <p className="font-body text-[10px] text-ink/40 uppercase tracking-[0.3em] font-bold">
            Curated luxury for every room
          </p>
        </div>
        <Link 
          href={`/${locale}/search`}
          className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors flex items-center gap-2 group"
        >
          View all 
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative group/carousel -mx-4 px-4 overflow-visible">
        {/* Navigation Arrows - Modern Glassmorphism */}
        <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none z-30">
          <button
            onClick={() => scroll("left")}
            className={cn(
              "pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-white/90 hover:scale-110 active:scale-95 group/btn",
              !canScrollLeft ? "opacity-0 translate-x-4 invisible" : "opacity-100 translate-x-0"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-ink transition-transform group-hover/btn:-translate-x-0.5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className={cn(
              "pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-white/90 hover:scale-110 active:scale-95 group/btn",
              !canScrollRight ? "opacity-0 -translate-x-4 invisible" : "opacity-100 translate-x-0"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-ink transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
        >
          {displayCategories.map((item, idx) => (
            <Link
              key={item.id}
              href={`/${locale}/collection/${item.handle}`}
              className="relative flex-none w-[80vw] sm:w-[40vw] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-surface snap-start shadow-[0_20px_50px_rgba(0,0,0,0.05)] group/card"
            >
              <Image
                src={item.image?.url || fallbackImages[0]}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white text-center drop-shadow-2xl translate-y-2 opacity-90 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 uppercase italic tracking-wider">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="text-[10px] font-body font-bold text-ink/40 tracking-[0.2em] uppercase">
            {activeIndex + 1} / {displayCategories.length}
          </div>
          <div className="flex gap-2">
            {displayCategories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  activeIndex === idx ? "bg-accent w-6" : "bg-ink/10"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
