"use client";

import { useState, useEffect, useRef } from "react";
import { getPredictiveSearch } from "@/lib/shopify/client";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useClickAway } from "react-use";

export function PredictiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => setIsOpen(false));

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const searchResults = await getPredictiveSearch(query);
        setResults(searchResults);
        setLoading(false);
        setIsOpen(true);
      } else {
        setResults(null);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm" ref={containerRef}>
      <div className="relative group">
        <Search className="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 group-focus-within:text-accent transition-colors" />
        <Input
          type="text"
          placeholder="Search collections, products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          className="ps-10 pe-10 h-10 bg-surface border-transparent rounded-none focus-visible:ring-1 focus-visible:ring-accent/20 focus-visible:border-accent/40 transition-all font-body text-xs"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin text-ink/30" /> : <X className="w-3 h-3 text-ink/30 hover:text-ink transition-colors" />}
          </button>
        )}
      </div>

      {isOpen && (results?.products?.length > 0 || results?.collections?.length > 0) && (
        <div className="absolute top-full inset-inline-start-0 w-full mt-2 bg-background border border-surface shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-6 flex flex-col gap-y-8">
            {results.products.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-ink/40 font-bold border-b border-surface pb-2">
                  Products
                </h4>
                <div className="flex flex-col gap-y-4">
                  {results.products.slice(0, 4).map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={() => setIsOpen(false)}
                      className="flex gap-x-4 group/item"
                    >
                      <div className="relative aspect-[3/4] w-12 bg-surface overflow-hidden">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-heading text-sm font-bold text-ink group-hover/item:text-accent transition-colors leading-tight">
                          {product.title}
                        </span>
                        <span className="font-body text-xs text-accent mt-1">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: product.priceRange.minVariantPrice.currencyCode,
                          }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-ink/40 font-bold border-b border-surface pb-2">
                  Collections
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.collections.map((collection: any) => (
                    <Link
                      key={collection.id}
                      href={`/collection/${collection.handle}`}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1 font-body text-[10px] uppercase tracking-widest bg-surface text-ink/60 hover:bg-primary hover:text-background transition-colors"
                    >
                      {collection.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link 
              href={`/search?q=${query}`}
              onClick={() => setIsOpen(false)}
              className="font-body text-[10px] uppercase tracking-[0.2em] text-center text-ink/40 hover:text-accent transition-colors pt-2 border-t border-surface"
            >
              View all results for "{query}"
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
