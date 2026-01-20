"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
  className?: string;
}

export function Breadcrumbs({ items, locale, className }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-2 font-body text-[10px] uppercase tracking-widest text-ink/40", className)}
    >
      <Link 
        href={`/${locale}`} 
        className="hover:text-accent transition-colors flex items-center gap-1"
      >
        <Home className="w-3 h-3" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-2.5 h-2.5 shrink-0" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-accent transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-bold whitespace-nowrap">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
