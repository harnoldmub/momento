"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function IntroSection() {
  return (
    <section className="bg-[#DCD9D0] py-20 md:py-32 text-[#2A2A2A]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase mb-4 opacity-70">
            BAS&Eacute;S &Agrave; KINSHASA, CONGO &amp; PARIS, FRANCE
          </p>
          <p className="text-[14px] md:text-[16px] tracking-[0.2em] uppercase font-light">
            &Agrave; VOTRE SERVICE PARTOUT DANS LE MONDE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start text-left">
            <div className="lg:flex-[1.2] space-y-6">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-[1.3]">
                Un regard avant l&apos;autel.
                <br />
                Une main qui tremble.
                <br />
                Un sourire pour toujours.
              </p>
              <div className="h-px w-20 bg-black/10" />
              <p className="text-[12px] md:text-[13px] leading-relaxed opacity-60 uppercase tracking-[0.2em]">
                Chez Momento, nous racontons votre h&eacute;ritage.
              </p>
            </div>
            <div className="lg:flex-1 text-[14px] md:text-[15px] leading-[1.8] font-light opacity-75 lg:pt-3">
              <p>
                Sp&eacute;cialis&eacute;s en photographie de mariage haut de
                gamme et en film cin&eacute;matographique, nous capturons
                l&apos;&eacute;l&eacute;gance de vos &eacute;motions &agrave;
                travers le monde. Du d&eacute;sert de Duba&iuml; aux rives
                d&apos;Europe, chaque instant devient une &oelig;uvre
                intemporelle.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <Link
            href="/portfolio"
            className="inline-block border border-black/20 px-12 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Explorer l&apos;univers
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mt-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-4xl md:text-5xl mb-10 italic"
              style={{
                fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif",
              }}
            >
              <span className="text-2xl not-italic uppercase tracking-widest block mb-2 opacity-60">
                &Agrave; propos de
              </span>
              Momento
            </h3>
            <div className="space-y-6 text-[14px] md:text-[15px] leading-relaxed font-light opacity-80 max-w-lg">
              <p>
                Momento, c&apos;est bien plus qu&apos;un studio de photographie et de film. C&apos;est une vision, un regard pos&eacute; sur l&apos;amour dans ce qu&apos;il a de plus vrai, de plus &eacute;l&eacute;gant, de plus intemporel.
              </p>
              <p>
                N&eacute; entre Kinshasa et Paris, Momento fusionne l&apos;&acirc;me africaine et le raffinement europ&eacute;en pour raconter chaque histoire avec profondeur, sensibilit&eacute; et une esth&eacute;tique cin&eacute;matographique.
              </p>
              <p>
                Chaque mariage est unique. Chaque couple porte en lui un h&eacute;ritage, une promesse, une &eacute;motion que nous nous engageons &agrave; immortaliser &mdash; avec passion, pr&eacute;cision et un sens inn&eacute; du beau.
              </p>
            </div>
            <div className="mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#2A2A2A]/50 hover:text-[#2A2A2A] transition-colors duration-300"
              >
                Voir notre travail
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="home/home-about.jpg"
                alt="Momento wedding Andrea"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
