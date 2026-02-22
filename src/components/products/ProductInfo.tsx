"use client";

import { useState, useMemo } from "react";
import { Product, ProductVariant } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, setCartOpen } = useCartStore();
  const { title, description, priceRange, options, variants } = product;

  // Track selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    options?.reduce((acc, option) => ({ ...acc, [option.name]: option.values[0] }), {}) || {}
  );

  // Find the matching variant
  const selectedVariant = useMemo(() => {
    return variants.edges.find((edge) =>
      edge.node.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    )?.node;
  }, [variants, selectedOptions]);

  const price = selectedVariant?.price || priceRange.minVariantPrice;

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(selectedVariant, {
        id: product.id,
        title: product.title,
        handle: product.handle,
        featuredImage: product.featuredImage,
      });
      setCartOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-8 px-6 lg:px-0">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-3">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-ink italic leading-tight">
            {title}
          </h1>
          {selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
            <span className="bg-accent px-3 py-1 text-[10px] uppercase tracking-widest text-background font-bold h-fit mt-1">
              Sale
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-x-3 font-body">
          <p className="text-xl font-medium text-accent">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currencyCode,
            }).format(parseFloat(price.amount))}
          </p>
          {selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
            <p className="text-ink/30 line-through text-base">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currencyCode,
              }).format(parseFloat(selectedVariant.compareAtPrice.amount))}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        {options?.map((option) => (
          <div key={option.id} className="flex flex-col gap-y-3">
            <h3 className="font-heading text-[10px] uppercase tracking-[0.3em] font-bold text-ink/40">
              {option.name}
            </h3>
            <RadioGroup
              value={selectedOptions[option.name]}
              onValueChange={(value) =>
                setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
              }
              className="flex flex-wrap gap-2"
            >
              {option.values.map((value) => (
                <div key={value}>
                  <RadioGroupItem
                    value={value}
                    id={`${option.name}-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${option.name}-${value}`}
                    className="flex h-10 min-w-[3rem] items-center justify-center border border-surface px-4 py-2 font-body text-xs uppercase tracking-widest text-ink/60 transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background peer-data-[state=checked]:border-primary hover:border-accent cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      <div className="prose prose-sm font-body text-ink/70 leading-relaxed max-w-none">
        {description}
      </div>

      <div className="pt-4">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          className="w-full h-14 bg-primary text-background rounded-none font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all disabled:bg-surface disabled:text-ink/20 shadow-xl shadow-primary/10"
        >
          {selectedVariant?.availableForSale ? "Add to Bag" : "Out of Stock"}
        </Button>
      </div>

      <div className="flex flex-col gap-y-4 border-t border-surface pt-8">
        <p className="font-body text-sm text-ink/60 uppercase tracking-widest">
          Composition & Care
        </p>
        <p className="font-body text-xs text-ink/50 leading-relaxed">
          The materials in this product are sourced responsibly. Please refer to our sustainability report for further information.
        </p>
      </div>
    </div>
  );
}
