export default function TermsPage() {
  return (
    <div className="flex flex-col gap-y-20 pb-20">
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom flex flex-col items-center text-center space-y-6">
          <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary italic leading-tight">
            Terms of Service
          </h1>
          <p className="font-body text-xs font-bold uppercase tracking-[0.4em] text-accent">
            The Iluxum Commitment
          </p>
        </div>
      </section>

      <section className="container-custom max-w-3xl mx-auto">
        <div className="prose prose-ink max-w-none space-y-12">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary italic">Agreement to Terms</h2>
            <p className="font-body text-primary/80 leading-relaxed">
              By accessing or using our Website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not access the Website or use any of our luxury services.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary italic">Product Quality & Authenticity</h2>
            <p className="font-body text-primary/80 leading-relaxed">
              Iluxum guarantees that all textiles sold on our Website are authentic heritage-grade materials. We make every effort to display the colors and textures of our products accurately, though variations may occur based on monitor settings and natural material batches.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary italic">Ordering & Payment</h2>
            <p className="font-body text-primary/80 leading-relaxed">
              All orders placed through the Website are subject to acceptance by Iluxum. We reserve the right to refuse service or cancel orders for any reason. Payments must be made using our approved secure payment methods.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary italic">Intellectual Property</h2>
            <p className="font-body text-primary/80 leading-relaxed">
              The Website and its original content, features, and functionality are owned by Iluxum and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </div>

          <div className="pt-12 border-t border-surface">
            <p className="font-body text-sm text-primary/50 italic text-center">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
