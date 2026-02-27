"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const displayCategories = categories.length > 0 
    ? categories 
    : ['Bedroom', 'Bathroom', 'Living Room', 'Sales'].map((name, idx) => ({
        id: `fallback-${idx}`,
        title: name,
        handle: name.toLowerCase().replace(' ', '-'),
        image: { url: fallbackImages[idx] || fallbackImages[0] }
      }));

  const getItemWidth = useCallback(() => {
    if (!scrollContainerRef.current?.children[0]) return 0;
    return (scrollContainerRef.current.children[0] as HTMLElement).offsetWidth;
  }, []);

  const getGap = () => 24; // gap-6

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const itemWidth = getItemWidth();
      const gap = getGap();
      if (itemWidth > 0) {
        const index = Math.round(scrollLeft / (itemWidth + gap));
        setActiveIndex(Math.min(index, displayCategories.length - 1));
      }
    }
  }, [getItemWidth, displayCategories.length]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const itemWidth = getItemWidth();
    const gap = getGap();
    const scrollStep = itemWidth + gap;

    if (direction === "right") {
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    } else {
      if (scrollLeft <= 10) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: -scrollStep, behavior: "smooth" });
      }
    }
  }, [getItemWidth]);

  const scrollTo = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const itemWidth = getItemWidth();
    const gap = getGap();
    scrollContainerRef.current.scrollTo({
      left: index * (itemWidth + gap),
      behavior: "smooth"
    });
  }, [getItemWidth]);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  // Auto-play (pause on hover or touch)
  useEffect(() => {
    if (isHovered || isTouching) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isTouching, scroll]);

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="container-custom space-y-8 lg:space-y-10 py-16 lg:py-20 relative overflow-visible"
    >
      {/* Section Header */}
      <div className="flex justify-between items-end pb-4 lg:pb-6">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Categories
          </h2>
          <p className="font-body text-[10px] text-primary/40 uppercase tracking-[0.3em] font-bold">
            Curated luxury for every room
          </p>
        </div>
        <Link 
          href={`/${locale}/search`}
          className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
        >
          View all 
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative group/carousel -mx-4 px-4 overflow-visible">
        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 -left-6 -right-6 hidden lg:flex items-center justify-between pointer-events-none z-30">
          <button
            onClick={() => scroll("left")}
            className={cn(
              "pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center",
              "bg-white/70 backdrop-blur-xl border border-white/50",
              "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
              "transition-all duration-500 hover:bg-white hover:scale-110 active:scale-95",
              "group/btn",
              displayCategories.length <= 1 ? "opacity-0 invisible" : "opacity-0 group-hover/carousel:opacity-100"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-primary transition-transform group-hover/btn:-translate-x-0.5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className={cn(
              "pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center",
              "bg-background/80 backdrop-blur-xl border border-primary/10",
              "shadow-[0_8px_32px_rgba(18,20,66,0.08)]",
              "transition-all duration-500 hover:bg-background hover:scale-110 active:scale-95 group-hover/btn:border-accent/40",
              "group/btn",
              displayCategories.length <= 1 ? "opacity-0 invisible" : "opacity-0 group-hover/carousel:opacity-100"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-primary transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => setTimeout(() => setIsTouching(false), 2000)}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ 
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
          }}
        >
          {displayCategories.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Link
                key={item.id}
                href={`/${locale}/collection/${item.handle}`}
                className={cn(
                  "relative flex-none aspect-[4/5] overflow-hidden bg-surface snap-center group/card",
                  "w-[75vw] sm:w-[45vw] lg:w-[calc(33.33%-1.25rem)] xl:w-[calc(25%-1.125rem)]",
                  "rounded-3xl lg:rounded-[2rem]",
                  "shadow-[0_15px_40px_rgba(18,20,66,0.06)]",
                  "transition-all duration-700 ease-out",
                  isActive ? "scale-100 shadow-[0_20px_50px_rgba(18,20,66,0.1)] group-hover/card:shadow-[0_0_20px_rgba(194,172,130,0.3)]" : "scale-[0.97] md:scale-100 opacity-90 md:opacity-100"
                )}
              >
                <Image
                  src={item.image?.url || fallbackImages[0]}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover/card:scale-110"
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover/card:from-black/70 transition-colors duration-700" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 lg:p-10">
                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center drop-shadow-2xl uppercase tracking-wide transition-transform duration-500 group-hover/card:-translate-y-2">
                    {item.title}
                  </h3>

                  {/* View Collection CTA — visible on hover */}
                  <span className="mt-4 font-body text-[10px] text-white/0 uppercase tracking-[0.25em] font-bold transition-all duration-500 group-hover/card:text-white/80 translate-y-4 group-hover/card:translate-y-0 flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="text-[10px] font-body font-bold text-primary/30 tracking-[0.2em] uppercase tabular-nums">
            {activeIndex + 1} / {displayCategories.length}
          </div>
          <div className="flex gap-1.5">
            {displayCategories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  activeIndex === idx 
                    ? "bg-accent w-8" 
                    : "bg-primary/10 w-1.5 hover:bg-primary/20"
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
