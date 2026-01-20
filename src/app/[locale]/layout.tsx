import { Playfair_Display, Inter } from "next/font/google";
import { DirProvider } from "@/components/i18n/DirProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

import { cookies } from "next/headers";
import { getMenu } from "@/lib/shopify/client";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://iluxum.com";
  
  // Define available locales (should match middleware)
  const locales = ["eg-en", "eg-ar", "ch-fr"];
  const languages: Record<string, string> = {
    "eg-en": "en-EG",
    "eg-ar": "ar-EG",
    "ch-fr": "fr-CH",
  };

  const alternates = {
    canonical: `${baseUrl}/${locale}`,
    languages: Object.fromEntries(
      locales.map((l) => [languages[l], `${baseUrl}/${l}`])
    ),
  };

  return {
    title: {
      template: "%s | Iluxum Luxury",
      default: "Iluxum | The Pinnacle of Textiles",
    },
    description: "Premium Egyptian cotton and luxury textiles for the discerning home.",
    alternates,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale.endsWith('-ar') ? 'rtl' : 'ltr';
  const lang = locale.split('-')[1] || 'en';
  
  const cookieStore = await cookies();
  const token = cookieStore.get("iluxum_customer_token")?.value;

  // Fetch navigation menus from Shopify
  const [mainMenuItems, footerMenuItems] = await Promise.all([
    getMenu('main-menu', 'no-store'),
    getMenu('footer', 'no-store'),
  ]);

  // Robust URL transformation for Shopify links
  const transformUrl = (url: string, type?: string) => {
    if (!url) return "#";
    
    // 1. Remove Shopify domain if present
    let path = url.replace(/https:\/\/[^/]+/, "");
    
    // 2. Normalize collections to collection (to match folder structure)
    // If we know it's a collection, ensure /collection/ prefix exists
    if (type === 'Collection' && !path.includes('/collection')) {
      path = `/collection/${path.split('/').pop()}`;
    }
    path = path.replace("/collections/", "/collection/");
    
    // 3. Prevent double locale prefixing
    if (path.startsWith(`/${locale}`)) return path;
    
    // 4. Transform /pages/ to root for custom pages
    if (path.startsWith("/pages/")) path = path.replace("/pages/", "/");
    
    // 5. Ensure leading slash and prepend locale
    if (!path.startsWith("/")) path = `/${path}`;
    
    return `/${locale}${path}`.replace(/\/+/g, "/");
  };

  // Transform menu items for Header
  const headerMenuItems = mainMenuItems.map((item: any) => ({
    title: item.title,
    url: transformUrl(item.url, item.resource?.__typename),
  }));

  // Transform menu items for Footer (split into collections and concierge)
  const footerCollections = footerMenuItems
    .filter((item: any) => item.resource?.__typename === 'Collection' || item.url.includes('/collection'))
    .map((item: any) => ({
      title: item.title,
      url: transformUrl(item.url, item.resource?.__typename),
    }));

  const footerConcierge = footerMenuItems
    .filter((item: any) => item.resource?.__typename !== 'Collection' && !item.url.includes('/collection'))
    .map((item: any) => ({
      title: item.title,
      url: transformUrl(item.url, item.resource?.__typename),
    }));

  return (
    <html lang={lang} dir={dir} className="selection:bg-accent/30">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <DirProvider dir={dir}>
          <Header 
            locale={locale} 
            customerAccessToken={token} 
            menuItems={headerMenuItems}
          />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer 
            locale={locale} 
            collectionsMenu={footerCollections}
            conciergeMenu={footerConcierge}
          />
        </DirProvider>
      </body>
    </html>
  );
}

