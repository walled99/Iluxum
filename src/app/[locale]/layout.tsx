import { DirProvider } from "@/components/i18n/DirProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale.endsWith('-ar') ? 'rtl' : 'ltr';

  return (
    <DirProvider dir={dir}>
      {children}
    </DirProvider>
  );
}
