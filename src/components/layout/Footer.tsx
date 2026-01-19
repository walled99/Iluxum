export default function Footer() {
  return (
    <footer className="border-t border-surface bg-surface py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-12">
          <div className="flex flex-col gap-y-4">
            <div className="font-heading text-xl font-bold text-primary italic">ILUXUM</div>
            <p className="font-body text-xs text-ink/60 leading-relaxed">
              Curated luxury essentials for the modern connoisseur. Quality without compromise.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-ink">Shop</h4>
            <ul className="flex flex-col gap-y-2 font-body text-xs text-ink/70">
              <li><a href="#" className="hover:text-accent transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Collections</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-ink">Help</h4>
            <ul className="flex flex-col gap-y-2 font-body text-xs text-ink/70">
              <li><a href="#" className="hover:text-accent transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-ink">Join Us</h4>
            <p className="font-body text-xs text-ink/60">Subscribe for early access and collection drops.</p>
            <div className="flex gap-x-2">
              <input type="email" placeholder="Email Address" className="bg-background border border-ink/10 px-4 py-2 text-xs w-full focus:outline-none focus:border-accent" />
              <button className="bg-primary text-background px-4 py-2 text-xs font-bold uppercase tracking-widest">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="font-body text-[10px] text-ink/40">© 2026 ILUXUM. All Rights Reserved.</p>
          <div className="flex gap-x-6 font-body text-[10px] text-ink/40 uppercase tracking-widest">
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
