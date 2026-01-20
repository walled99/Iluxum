export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-y-20 pb-20">
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom flex flex-col items-center text-center space-y-6">
          <h1 className="font-heading text-5xl lg:text-7xl font-bold text-ink italic leading-tight">
            Privacy Policy
          </h1>
          <p className="font-body text-xs font-bold uppercase tracking-[0.4em] text-accent">
            Protecting Your Heritage
          </p>
        </div>
      </section>

      <section className="container-custom max-w-3xl mx-auto">
        <div className="prose prose-ink max-w-none space-y-12">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-ink italic">Introduction</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              At Iluxum, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-ink italic">Data Collection</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, and telephone number. This information is primarily used to fulfill your luxury textile orders and provide the concierge level of service you expect from Iluxum.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-ink italic">Information Use</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              The information we collect is used to present our Website and its contents to you, to provide you with information, products, or services that you request from us, and to fulfill any other purpose for which you provide it.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-ink italic">Security</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are processed through encrypted, secure gateways.
            </p>
          </div>
          
          <div className="pt-12 border-t border-surface">
            <p className="font-body text-sm text-ink/40 italic text-center">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
