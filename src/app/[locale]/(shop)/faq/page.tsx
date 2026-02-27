import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "The Iluxum Heritage",
    questions: [
      {
        q: "Where are Iluxum textiles sourced?",
        a: "Our textiles are exclusively sourced from sustainable farms that prioritize soil health and water conservation. We work with long-staple cotton from Giza and organic linen from the Nile Delta."
      },
      {
        q: "What makes the 'Heritage' weave unique?",
        a: "Our Heritage weave is a proprietary technique that balances breathability with structural integrity, ensuring your linens soften with age while maintaining their premium weight."
      }
    ]
  },
  {
    category: "Shipping & Private Delivery",
    questions: [
      {
        q: "Which regions do you deliver to?",
        a: "We currently offer specialized concierge delivery within Egypt, Switzerland, and selected EU regions. Global shipping is available via our premium logistics partners."
      },
      {
        q: "How long does delivery take?",
        a: "Domestic concierge delivery typically arrives within 2-3 business days. International orders are processed within 24 hours and delivered within 5-7 business days."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "Due to the intimate nature of luxury linens, we accept returns on unopened, original-packaging items within 14 days of delivery. Custom-tailored pieces are final sale."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-y-20 lg:gap-y-32 pb-20">
      {/* Hero */}
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom flex flex-col items-center text-center space-y-6">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary leading-tight">
            Assistance & Inquiries
          </h1>
          <p className="font-body text-lg text-primary/80 max-w-2xl leading-relaxed">
            Finding the answers you need to ensure your Iluxum experience is seamless.
          </p>
        </div>
      </section>

      <section className="container-custom max-w-4xl mx-auto">
        <div className="space-y-20">
          {faqs.map((group, idx) => (
            <div key={idx} className="space-y-8">
              <div className="flex items-center gap-x-6">
                <h2 className="font-heading text-2xl font-bold text-primary italic whitespace-nowrap">
                  {group.category}
                </h2>
                <div className="h-px w-full bg-surface" />
              </div>

              <Accordion type="single" collapsible className="w-full">
                {group.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border-surface py-2">
                    <AccordionTrigger className="font-heading text-lg font-bold text-primary hover:text-accent hover:no-underline text-start py-6">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-primary/80 text-base leading-relaxed pb-6 pr-12">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="container-custom">
        <div className="bg-primary p-16 lg:p-24 flex flex-col items-center text-center space-y-8">
           <h2 className="font-heading text-3xl lg:text-4xl font-bold text-background leading-tight">
             Still Have Questions?
           </h2>
           <p className="font-body text-background/80 max-w-lg">
             Our concierge is available for personalized assistance regarding selection, sizing, or care.
           </p>
           <button className="bg-accent text-primary px-12 py-5 font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-background hover:text-primary transition-all">
             Contact Advisor
           </button>
        </div>
      </section>
    </div>
  );
}
