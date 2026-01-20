import { Playfair_Display, Inter } from "next/font/google";
import { DirProvider } from "@/components/i18n/DirProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

import { cookies } from "next/headers";

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

  return (
    <html lang={lang} dir={dir} className="selection:bg-accent/30">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <DirProvider dir={dir}>
          <Header locale={locale} customerAccessToken={token} />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </DirProvider>
      </body>
    </html>
  );
}
