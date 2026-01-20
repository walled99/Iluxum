"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

async function contactAction(state: any, formData: FormData) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(contactAction, null);

  return (
    <div className="flex flex-col gap-y-20 lg:gap-y-32 pb-20">
      {/* Hero */}
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom flex flex-col items-center text-center space-y-6">
          <h1 className="font-heading text-5xl lg:text-7xl font-bold text-ink italic leading-tight">
            Connect With Us
          </h1>
          <p className="font-body text-lg text-ink/60 max-w-2xl leading-relaxed">
            Whether you have a question about our collections or need assistance with your order,
            our advisors are here to help.
          </p>
        </div>
      </section>

      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-bold text-ink italic">Get In Touch</h2>
              <div className="h-px w-12 bg-accent" />
            </div>

            <div className="space-y-8">
              <div className="flex gap-x-6 items-start">
                <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-ink/40">Email</p>
                  <p className="font-body text-lg text-ink">concierge@iluxum.com</p>
                </div>
              </div>

              <div className="flex gap-x-6 items-start">
                <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-ink/40">Phone</p>
                  <p className="font-body text-lg text-ink">+20 123 456 789</p>
                </div>
              </div>

              <div className="flex gap-x-6 items-start">
                <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-ink/40">Boutique</p>
                  <p className="font-body text-lg text-ink">123 Nile Road, Zamalek, Cairo, Egypt</p>
                </div>
              </div>
            </div>

            <div className="bg-surface p-10 space-y-4 shadow-sm border-s-4 border-accent">
              <h3 className="font-heading text-xl font-bold italic text-ink">Private Appointments</h3>
              <p className="font-body text-sm text-ink/70 leading-relaxed">
                Experience Iluxum in person with a guided private viewing of our latest textile collections.
              </p>
              <button className="font-body text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 inline-block pt-2">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-background">
            {state?.success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 border border-surface bg-surface/30">
                <div className="w-20 h-20 bg-green-50 flex items-center justify-center rounded-full shadow-inner">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-3xl font-bold text-ink italic">Message Received</h2>
                  <p className="font-body text-ink/60">Our advisors will contact you shortly.</p>
                </div>
                <Button 
                   onClick={() => window.location.reload()}
                   variant="outline"
                   className="rounded-none border-ink"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form action={formAction} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-body text-[10px] uppercase tracking-widest text-ink/40 font-bold ml-1">Name</label>
                    <Input 
                      name="name" 
                      placeholder="Your full name" 
                      required 
                      className="rounded-none border-0 border-b border-surface bg-transparent h-12 focus:border-accent ring-0 focus:ring-0 px-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-[10px] uppercase tracking-widest text-ink/40 font-bold ml-1">Email</label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      required 
                      className="rounded-none border-0 border-b border-surface bg-transparent h-12 focus:border-accent ring-0 focus:ring-0 px-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-widest text-ink/40 font-bold ml-1">Inquiry</label>
                  <Input 
                    name="subject" 
                    placeholder="General Inquiry, Shipping, Private Viewing..." 
                    className="rounded-none border-0 border-b border-surface bg-transparent h-12 focus:border-accent ring-0 focus:ring-0 px-1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-widest text-ink/40 font-bold ml-1">Message</label>
                  <Textarea 
                    name="message" 
                    placeholder="How can we assist you today?" 
                    required 
                    className="min-h-[150px] rounded-none border-0 border-b border-surface bg-transparent focus:border-accent ring-0 focus:ring-0 px-1 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-16 bg-primary text-background rounded-none font-body text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
