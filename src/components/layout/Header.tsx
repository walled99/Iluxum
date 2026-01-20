"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { CartDrawer } from "../cart/CartDrawer";
import { PredictiveSearch } from "./PredictiveSearch";
import { CartSyncProvider } from "../cart/CartSyncProvider";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export default function Header({ 
  locale, 
  customerAccessToken 
}: { 
  locale: string; 
  customerAccessToken?: string; 
}) {
  const { setCartOpen, lines } = useCartStore();
  const cartCount = lines.reduce((acc, line) => acc + line.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-background/80 backdrop-blur-md py-4">
      <CartSyncProvider customerAccessToken={customerAccessToken} />
      <div className="container-custom flex items-center justify-between gap-x-8">
        <Link href={`/${locale}`} className="font-heading text-2xl font-bold text-primary italic shrink-0">
          ILUXUM
        </Link>
        
        <nav className="hidden lg:flex gap-x-8 font-body text-[10px] font-bold text-ink/80 uppercase tracking-[0.3em] overflow-hidden">
          <Link href={`/${locale}/collections`} className="hover:text-accent transition-colors">Collections</Link>
          <Link href={`/${locale}/story`} className="hover:text-accent transition-colors">Story</Link>
        </nav>

        <div className="flex-1 max-w-md hidden md:block">
          <PredictiveSearch />
        </div>

        <div className="flex items-center gap-x-6">
          <Link href={`/${locale}/account`} className="text-ink hover:text-accent transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => setCartOpen(true)}
            className="text-ink hover:text-accent transition-colors relative group"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-background text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
