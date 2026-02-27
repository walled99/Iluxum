import { getCollections, searchProducts, getMenu } from "@/lib/supabase/queries";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // 1. Fetch categories via a menu for full dynamic control
  const categoryMenu = await getMenu("home-categories");
  
  // Fetch some "Best Sellers" or featured products
  const { products: featuredProducts } = await searchProducts(""); 
  
  let categoryCollections = categoryMenu
    .filter(item => item.resource?.__typename === 'Collection')
    .map(item => ({
      id: item.resource!.id,
      title: item.title,
      handle: item.resource!.handle,
      image: item.resource!.image
    }));


  // 2. Fallback: Automatically show all collections if no menu is configured
  if (categoryCollections.length === 0) {
    const allCollections = await getCollections();
    categoryCollections = allCollections.filter(c => 
      !["frontpage", "all"].includes(c.handle.toLowerCase())
    );
  }

  const fallbackImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2000&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop", // Living
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop", // Sales
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
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-8 animate-fade-gold">
            <div className="space-y-4">
              <h2 className="font-body text-sm font-bold uppercase tracking-[0.4em] text-accent">
                The Heritage Collection
              </h2>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-background font-bold leading-[1.1] tracking-tight">
                Pure <br /> 
                <span className="ps-12 lg:ps-20">Elegance</span>
              </h1>
            </div>
            <p className="font-body text-lg text-background/90 max-w-xl leading-relaxed">
              Crafted from the finest sustainable materials, Iluxum brings unparalleled softness and timeless luxury to your most personal spaces.
            </p>
            <div className="pt-4">
              <Link 
                href={`/${locale}/search`}
                className="inline-flex items-center gap-x-4 bg-background text-primary px-10 py-5 font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-primary transition-all duration-500 shadow-2xl"
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
              <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary leading-tight">
                New Arrivals
              </h2>
              <p className="font-body text-sm text-primary/60 uppercase tracking-[0.2em]">
                The latest in luxury sustainable fashion
              </p>
            </div>
            <Link 
              href={`/${locale}/search`}
              className="font-body text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:text-primary hover:border-primary transition-all duration-300"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {featuredProducts.slice(0, 4).map((product: any) => (
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
              <h3 className="font-heading text-3xl lg:text-5xl font-bold text-primary leading-tight">
                A Thread <br /> of Time
              </h3>
            </div>
            <p className="font-body text-lg text-primary/80 leading-relaxed italic">
              "We believe that luxury shouldn't cost the earth. Our mission is to weave sustainability into the very fabric of everyday elegance."
            </p>
            <div className="pt-4">
              <Link 
                href={`/${locale}/story`}
                className="inline-flex items-center gap-x-4 bg-primary text-background px-10 py-5 font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-primary transition-all duration-500 shadow-xl hover:shadow-2xl"
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
