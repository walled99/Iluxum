import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
}

interface FooterProps {
  locale?: string;
  collectionsMenu?: MenuItem[];
  conciergeMenu?: MenuItem[];
}

export default function Footer({ locale, collectionsMenu = [], conciergeMenu = [] }: FooterProps) {
  const l = locale || "eg-en";
  
  // Fallback collections if no menu provided
  const collections = collectionsMenu.length > 0 
    ? collectionsMenu 
    : [
        { title: "New Arrivals", url: `/${l}/search` },
        { title: "Bedroom", url: `/${l}/collection/bedroom` },
        { title: "Bathroom", url: `/${l}/collection/bathroom` },
        { title: "All Products", url: `/${l}/search` },
      ];

  // Fallback concierge links if no menu provided
  const concierge = conciergeMenu.length > 0 
    ? conciergeMenu 
    : [
        { title: "Contact Advisor", url: `/${l}/contact` },
        { title: "Assistance & FAQ", url: `/${l}/faq` },
        { title: "The Heritage", url: `/${l}/story` },
        { title: "Private Account", url: `/${l}/account` },
      ];
  
  return (
    <footer className="border-t border-primary bg-primary pt-12 lg:pt-24 pb-8 lg:pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-12">
          <div className="flex flex-col gap-y-6">
            <div className="font-heading text-2xl font-bold text-accent italic tracking-tight">ILUXUM</div>
            <p className="font-body text-sm text-background/70 leading-relaxed max-w-xs">
              Curating high-heritage luxury textiles for the modern connoisseur. We believe in quality without compromise and sustainability in every thread.
            </p>
          </div>
          
          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-accent">Collections</h4>
            <ul className="flex flex-col gap-y-3 font-body text-sm text-background/80">
              {collections.map((item) => (
                <li key={item.title}>
                  <Link href={item.url} className="hover:text-accent transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-accent">Concierge</h4>
            <ul className="flex flex-col gap-y-3 font-body text-sm text-background/80">
              {concierge.map((item) => (
                <li key={item.title}>
                  <Link href={item.url} className="hover:text-accent transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-accent">Inner Circle</h4>
            <p className="font-body text-sm text-background/70">Subscribe for early access, private collection drops, and heritage stories.</p>
            <div className="flex flex-col gap-y-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-primary border border-background/20 px-4 py-3 text-sm text-background w-full focus:outline-none focus:border-accent transition-all placeholder:text-background/40" 
              />
              <button className="bg-accent text-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-background hover:text-primary transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-8">
            <p className="font-body text-[10px] text-background/40 uppercase tracking-widest">© 2026 ILUXUM HERITAGE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-x-6 font-body text-[10px] text-background/50 uppercase tracking-widest font-bold">
              <Link href={`/${l}/terms`} className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link href={`/${l}/privacy`} className="hover:text-accent transition-colors">Privacy Policy</Link>
            </div>
          </div>
          
          <div className="flex gap-x-4 opacity-50 hover:opacity-100 transition-all">
             {/* Payment Mockup Icons */}
             <div className="w-8 h-5 bg-background/20 rounded-sm" />
             <div className="w-8 h-5 bg-background/20 rounded-sm" />
             <div className="w-8 h-5 bg-background/20 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
