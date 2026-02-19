"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function IntroSection() {
  return (
    <section className="bg-[#DCD9D0] py-20 md:py-32 text-[#2A2A2A]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 text-center">
        {/* Location & Global Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase mb-4 opacity-70">
            BASÉS À KINSHASA, CONGO & PARIS, FRANCE
          </p>
          <p className="text-[14px] md:text-[16px] tracking-[0.2em] uppercase font-light">
            À VOTRE SERVICE PARTOUT DANS LE MONDE
          </p>
        </motion.div>

        {/* Short Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="flex-1 space-y-6">
              <p className="text-2xl md:text-3xl font-light italic leading-tight">
                Un regard avant l’autel.<br />
                Une main qui tremble.<br />
                Un sourire pour toujours.
              </p>
              <div className="h-px w-20 bg-black/10" />
              <p className="text-[14px] leading-relaxed opacity-70 uppercase tracking-widest">
                Chez Momento, nous racontons votre héritage.
              </p>
            </div>
            <div className="flex-1 text-[15px] leading-relaxed font-light opacity-80">
              <p>
                Spécialisés en photographie de mariage haut de gamme et en film cinématographique,
                nous capturons l&apos;élégance de vos émotions à travers le monde.
                Du désert de Dubaï aux rives d&apos;Europe, chaque instant devient une œuvre intemporelle.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <Link
            href="/portfolio/mariages"
            className="inline-block border border-black/20 px-12 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Explorer l&apos;univers
          </Link>
        </motion.div>

        {/* Split Layout: About Dave */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mt-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-4xl md:text-5xl mb-10 italic"
              style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
            >
              <span className="text-2xl not-italic uppercase tracking-widest block mb-2 opacity-60">À propos de</span>
              Momento
            </h3>
            <div className="space-y-6 text-[14px] md:text-[15px] leading-relaxed font-light opacity-80 max-w-lg">
              <p>
                Je suis Dave, l&apos;âme créative derrière Momento. Un conteur passionné par l&apos;art de capturer les moments les plus significatifs de votre vie.
              </p>
              <p>
                Mon parcours a commencé dans la musique, mais l&apos;amour et la famille ont redéfini ma vision du lien, de la beauté et de la romance.
              </p>
              <p>
                Aujourd&apos;hui, je capture les mariages avec un cœur sauvage, une touche artistique et une intentionnalité profonde — pour créer des images aussi vibrantes que vos souvenirs eux-mêmes.
              </p>
            </div>
            <div className="mt-12">
              <Link
                href="/portfolio/mariages"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-charcoal/50 hover:text-charcoal transition-colors duration-300"
              >
                Voir notre travail
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/home/home-8.jpg"
                alt="Momento Photographer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
