"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { lines, isCartOpen, setCartOpen, updateQuantity, removeItem } = useCartStore();

  const total = lines.reduce(
    (acc, line) => acc + parseFloat(line.merchandise.price.amount) * line.quantity,
    0
  );
  const currency = lines[0]?.merchandise.price.currencyCode || "USD";

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 border-inline-start bg-background">
        <SheetHeader className="px-6 py-4 border-b border-surface">
          <SheetTitle className="font-heading text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            Shopping Bag ({lines.reduce((acc, l) => acc + l.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        {lines.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-y-6 py-6">
                {lines.map((line) => (
                  <div key={line.id} className="flex gap-x-4">
                    <div className="relative aspect-[3/4] w-20 bg-surface overflow-hidden">
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex flex-col gap-y-1">
                        <h4 className="font-heading text-sm font-bold text-ink leading-tight">
                          {line.merchandise.product.title}
                        </h4>
                        <p className="font-body text-[10px] text-ink/60 uppercase tracking-widest">
                          {line.merchandise.title !== "Default Title" ? line.merchandise.title : "Standard Edition"}
                        </p>
                        <p className="font-body text-xs font-medium text-accent">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: line.merchandise.price.currencyCode,
                          }).format(parseFloat(line.merchandise.price.amount))}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-surface rounded-sm">
                          <button
                            onClick={() => updateQuantity(line.id, Math.max(1, line.quantity - 1))}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-body font-medium min-w-[24px] text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(line.id)}
                          className="text-ink/40 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="px-6 py-6 border-t border-surface flex flex-col gap-y-4">
              <div className="flex justify-between items-center w-full">
                <span className="font-body text-sm font-medium text-ink/60 uppercase tracking-widest">Subtotal</span>
                <span className="font-heading text-lg font-bold text-ink">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                  }).format(total)}
                </span>
              </div>
              <Button className="w-full bg-primary text-background h-12 rounded-none font-body text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all">
                Checkout
              </Button>
              <p className="text-[10px] text-center text-ink/40 font-body">
                Shipping and taxes calculated at checkout
              </p>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-y-4 px-6">
            <ShoppingBag className="w-12 h-12 text-surface" />
            <p className="font-body text-sm italic text-ink/40 text-center">
              Your luxury collection is currently empty.
            </p>
            <Button
              variant="outline"
              onClick={() => setCartOpen(false)}
              className="mt-4 rounded-none border-primary text-primary font-body text-xs uppercase tracking-widest hover:bg-primary hover:text-background"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
