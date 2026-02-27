"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

export default function StoryPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-primary/40 z-10" />
          <Image
            src="/hero-in-our-story.png"
            alt="Luxury textiles heritage"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-heading text-5xl lg:text-7xl font-bold text-background leading-none drop-shadow-2xl tracking-tighter"
          >
            The Heritage
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 font-body text-sm lg:text-base text-background/80 uppercase tracking-[0.4em] max-w-lg mx-auto"
          >
            A legacy woven in the heart of the Nile
          </motion.p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="container-custom py-24 lg:py-40 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div {...fadeInUp} className="space-y-8">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary leading-tight">
            Giza 45: <br />The Golden Standard
          </h2>
          <div className="w-20 h-px bg-accent" />
          <p className="font-body text-sm lg:text-base text-primary/80 leading-relaxed max-w-md">
            Our journey begins in the alluvial soils of the Nile Delta. Here, specifically in the Giza 45 region, the world's most luxurious long-staple cotton is hand-harvested under the Mediterranean sun. 
          </p>
          <p className="font-body text-sm lg:text-base text-primary/80 leading-relaxed max-w-md">
            Only 0.01% of global cotton production meets the Iluxum standard—a fiber so rare, it is often referred to as "The Queen of Egypt."
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[4/5] bg-surface overflow-hidden"
        >
          <Image 
            src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=1000"
            alt="Organic cotton fibers"
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000"
          />
        </motion.div>
      </section>

      {/* Quote Break */}
      <section className="bg-primary py-24 lg:py-40 text-background">
        <div className="container-custom max-w-4xl text-center">
          <motion.p 
            {...fadeInUp}
            className="font-heading text-2xl lg:text-4xl italic leading-tight"
          >
            "Textiles are not just materials; they are the silent companions of our most intimate moments at home."
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            className="h-px bg-accent mx-auto mt-12"
          />
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="container-custom py-24 lg:py-40 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] bg-surface overflow-hidden order-2 lg:order-1"
        >
          <Image 
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000"
            alt="Artisanal weaving"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div {...fadeInUp} className="space-y-8 order-1 lg:order-2">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary leading-tight">
            Artisanal <br />Continuity
          </h2>
          <div className="w-20 h-px bg-accent" />
          <p className="font-body text-sm lg:text-base text-primary/80 leading-relaxed max-w-md">
            Iluxum bridges centuries-old Egyptian weaving techniques with contemporary European finishing. Our artisans handle every thread with the reverence it deserves, ensuring a 600 GSM weight that feels like a heavy embrace.
          </p>
          <p className="font-body text-sm lg:text-base text-primary/80 leading-relaxed max-w-md">
            It takes four weeks to complete a single Iluxum suite—a timeline dictated by quality, not commerce.
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-40 bg-surface/30">
        <div className="container-custom flex flex-col items-center text-center space-y-12">
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="font-heading text-3xl lg:text-5xl font-bold text-primary">Experience the Touch</h3>
            <p className="font-body text-sm text-primary/60 uppercase tracking-[0.2em]">Crafted for the few who know the difference</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="/"
              className="px-12 py-5 bg-primary text-background font-body text-xs uppercase tracking-[0.3em] hover:bg-accent hover:text-primary transition-all duration-500"
            >
              Shop Collection
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
