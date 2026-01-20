import { getCollections, getSearchResults } from "@/lib/shopify/client";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Fetch collections for the category grid
  const allCollections = await getCollections();
  
  // Fetch some "Best Sellers" or featured products (using search for now as a filter)
  const featuredProducts = await getSearchResults(""); // Empty query returns recent products

  // Filter specific collections for the bento-lite grid
  const categoryCollections = allCollections.filter(c => 
    ["bedroom", "bathroom", "living", "essentials"].includes(c.handle.toLowerCase())
  ).slice(0, 4);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2000&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop", // Essentials
  ];

  return (
    <div className="flex flex-col gap-y-20 lg:gap-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Linens"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-8 animate-fade-gold">
            <div className="space-y-4">
              <h2 className="font-body text-sm font-bold uppercase tracking-[0.4em] text-background">
                The Heritage Collection
              </h2>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-[7rem] text-background font-bold italic leading-[1.1]">
                Pure <br /> 
                <span className="ps-20 lg:ps-32">Elegance</span>
              </h1>
            </div>
            <p className="font-body text-lg text-background/90 max-w-xl leading-relaxed">
              Crafted from the finest sustainable materials, Iluxum brings unparalleled softness and timeless luxury to your most personal spaces.
            </p>
            <div className="pt-4">
              <Link 
                href={`/${locale}/search`}
                className="inline-flex items-center gap-x-4 bg-background text-ink px-10 py-5 font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-500 shadow-2xl"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category (Horizontal Showcase) */}
      <div className="bg-[#FAF9F6]">
        <CategoryCarousel 
          categories={categoryCollections} 
          locale={locale} 
          fallbackImages={fallbackImages} 
        />
      </div>

      {/* 3. Featured Products */}
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-y-6">
            <div className="space-y-4">
              <h2 className="font-heading text-4xl lg:text-6xl font-bold text-ink italic leading-tight">
                New Arrivals
              </h2>
              <p className="font-body text-sm text-ink/40 uppercase tracking-[0.2em]">
                The latest in luxury sustainable fashion
              </p>
            </div>
            <Link 
              href={`/${locale}/search`}
              className="font-body text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:text-ink hover:border-ink transition-all"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Narrative Teaser */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20">
          <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-square overflow-hidden">
             <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2000&auto=format&fit=crop"
              alt="Brand Heritage"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-body text-xs font-bold uppercase tracking-[0.4em] text-accent">
                Our Heritage
              </h2>
              <h3 className="font-heading text-4xl lg:text-6xl font-bold text-ink italic leading-tight">
                A Thread <br /> of Time
              </h3>
            </div>
            <p className="font-body text-lg text-ink/70 leading-relaxed italic">
              "We believe that luxury shouldn't cost the earth. Our mission is to weave sustainability into the very fabric of everyday elegance."
            </p>
            <div className="pt-4">
              <Link 
                href={`/${locale}/story`}
                className="inline-flex items-center gap-x-4 border border-ink px-10 py-5 font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-background hover:border-primary transition-all duration-500"
              >
                Discover The Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
