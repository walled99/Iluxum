"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { CartDrawer } from "../cart/CartDrawer";
import { PredictiveSearch } from "./PredictiveSearch";
import { CartSyncProvider } from "../cart/CartSyncProvider";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  title: string;
  url: string;
  handle?: string;
}

interface HeaderProps {
  locale: string;
  customerAccessToken?: string;
  menuItems?: MenuItem[];
}

export default function Header({ 
  locale, 
  customerAccessToken,
  menuItems = []
}: HeaderProps) {
  const { setCartOpen, lines } = useCartStore();
  const cartCount = lines.reduce((acc, line) => acc + line.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fallback navigation if no menu items provided
  const navItems = menuItems.length > 0 
    ? menuItems 
    : [
        { title: "Shop", url: `/${locale}/search` },
        { title: "Collections", url: `/${locale}/search` },
        { title: "Story", url: `/${locale}/story` },
        { title: "Contact", url: `/${locale}/contact` },
        { title: "FAQ", url: `/${locale}/faq` },
      ];

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-background/80 backdrop-blur-md py-4">
      <CartSyncProvider customerAccessToken={customerAccessToken} />
      <div className="container-custom flex items-center justify-between gap-x-8">
        <Link href={`/${locale}`} className="font-heading text-2xl font-bold text-primary italic shrink-0">
          ILUXUM
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-x-8 font-body text-[10px] font-bold text-ink/80 uppercase tracking-[0.3em] overflow-hidden">
          {navItems.map((item) => (
            <Link 
              key={item.title} 
              href={item.url} 
              className="hover:text-accent transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex-1 max-w-md hidden md:block">
          <PredictiveSearch locale={locale} />
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
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-ink hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-surface mt-4 pt-4 px-6 pb-2 bg-background">
          <div className="flex flex-col gap-y-4 font-body text-sm font-bold text-ink/80 uppercase tracking-[0.2em]">
            {navItems.map((item) => (
              <Link 
                key={item.title} 
                href={item.url} 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-surface">
            <PredictiveSearch locale={locale} />
          </div>
        </nav>
      )}
      
      <CartDrawer locale={locale} />
    </header>
  );
}
