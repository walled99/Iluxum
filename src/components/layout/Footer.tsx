import Link from "next/link";

export default function Footer({ locale }: { locale?: string }) {
  const l = locale || "eg-en";
  
  return (
    <footer className="border-t border-surface bg-surface pt-12 lg:pt-24 pb-8 lg:pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-12">
          <div className="flex flex-col gap-y-6">
            <div className="font-heading text-2xl font-bold text-primary italic tracking-tight">ILUXUM</div>
            <p className="font-body text-sm text-ink/60 leading-relaxed max-w-xs">
              Curating high-heritage luxury textiles for the modern connoisseur. We believe in quality without compromise and sustainability in every thread.
            </p>
          </div>
          
          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-ink">Collections</h4>
            <ul className="flex flex-col gap-y-3 font-body text-sm text-ink/70">
              <li><Link href={`/${l}/search`} className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link href={`/${l}/collection/bedroom`} className="hover:text-accent transition-colors">Bedroom</Link></li>
              <li><Link href={`/${l}/collection/bathroom`} className="hover:text-accent transition-colors">Bathroom</Link></li>
              <li><Link href={`/${l}/search`} className="hover:text-accent transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-ink">Concierge</h4>
            <ul className="flex flex-col gap-y-3 font-body text-sm text-ink/70">
              <li><Link href={`/${l}/contact`} className="hover:text-accent transition-colors">Contact Advisor</Link></li>
              <li><Link href={`/${l}/faq`} className="hover:text-accent transition-colors">Assistance & FAQ</Link></li>
              <li><Link href={`/${l}/story`} className="hover:text-accent transition-colors">The Heritage</Link></li>
              <li><Link href={`/${l}/account`} className="hover:text-accent transition-colors">Private Account</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-ink">Inner Circle</h4>
            <p className="font-body text-sm text-ink/60">Subscribe for early access, private collection drops, and heritage stories.</p>
            <div className="flex flex-col gap-y-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-background border border-ink/5 px-4 py-3 text-sm w-full focus:outline-none focus:border-accent transition-all" 
              />
              <button className="bg-primary text-background px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-8">
            <p className="font-body text-[10px] text-ink/40 uppercase tracking-widest">© 2026 ILUXUM HERITAGE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-x-6 font-body text-[10px] text-ink/40 uppercase tracking-widest font-bold">
              <Link href={`/${l}/terms`} className="hover:text-ink transition-colors">Terms of Service</Link>
              <Link href={`/${l}/privacy`} className="hover:text-ink transition-colors">Privacy Policy</Link>
            </div>
          </div>
          
          <div className="flex gap-x-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             {/* Payment Mockup Icons */}
             <div className="w-8 h-5 bg-ink/20 rounded-sm" />
             <div className="w-8 h-5 bg-ink/20 rounded-sm" />
             <div className="w-8 h-5 bg-ink/20 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
