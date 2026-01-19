import { Playfair_Display, Inter } from "next/font/google";
import { DirProvider } from "@/components/i18n/DirProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

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

  return (
    <html lang={lang} dir={dir}>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <DirProvider dir={dir}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </DirProvider>
      </body>
    </html>
  );
}
