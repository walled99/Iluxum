export default function Header() {
  return (
    <header className="border-b border-surface bg-background py-4">
      <div className="container-custom flex items-center justify-between">
        <div className="font-heading text-2xl font-bold text-primary italic">ILUXUM</div>
        <nav className="hidden md:flex gap-x-8 font-body text-sm font-medium text-ink/80 uppercase tracking-widest">
          <a href="#" className="hover:text-accent transition-colors">Shop</a>
          <a href="#" className="hover:text-accent transition-colors">Collections</a>
          <a href="#" className="hover:text-accent transition-colors">Story</a>
        </nav>
        <div className="flex items-center gap-x-4">
          <button className="text-ink hover:text-accent transition-colors">Search</button>
          <button className="text-ink hover:text-accent transition-colors">Cart</button>
        </div>
      </div>
    </header>
  );
}
