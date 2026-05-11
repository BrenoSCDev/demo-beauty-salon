import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -50, filter: 'blur(5px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.32, 0.72, 0, 1] },
  },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } },
};

export default function About() {
  const { t } = useLang();
  const a = t.about;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={sectionRef}
      className="py-[9rem] px-[6vw] max-[600px]:py-[5rem] max-[600px]:px-[1.25rem] bg-[var(--blush-light)] relative overflow-hidden"
      id="about"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-[1.2fr_0.9fr] max-[960px]:grid-cols-1 gap-20 max-[960px]:gap-14 items-center">

        {/* Text column */}
        <motion.div
          className="flex flex-col gap-6"
          variants={SLIDE_LEFT}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="inline-flex w-fit px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]">
            {a.eyebrow}
          </span>
          <h2
            className="text-[clamp(3rem,5.5vw,5rem)] font-bold text-[var(--plum)] leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Isabelle
            <br />
            <span className="italic text-[var(--champagne)]">Fontaine</span>
          </h2>

          <blockquote className="border-l-2 border-[var(--champagne)] pl-6 flex flex-col gap-[0.7rem]">
            <p
              className="text-[1.05rem] italic font-normal text-[var(--plum)] leading-[1.75]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {a.quote}
            </p>
            <cite className="text-[0.75rem] not-italic tracking-[0.1em] uppercase text-[var(--champagne)]">
              {a.cite}
            </cite>
          </blockquote>

          <p className="text-[0.95rem] text-[var(--text-body)] leading-[1.8] max-w-[56ch]">{a.body1}</p>
          <p className="text-[0.95rem] text-[var(--text-body)] leading-[1.8] max-w-[56ch]">{a.body2}</p>
        </motion.div>

        {/* Portrait column */}
        <motion.div
          className="relative flex items-end justify-center"
          initial={{ opacity: 0, x: 50, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
        >
          {/* Photo card */}
          <div className="relative rounded-[2rem] overflow-hidden w-full max-w-[400px] max-[960px]:max-w-[360px] shadow-[0_24px_80px_rgba(61,26,46,0.18),0_0_0_1px_rgba(61,26,46,0.1)]">
            <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <motion.img
                src="/isabelle.png"
                alt="Isabelle Fontaine"
                className="w-full h-full object-cover object-top"
                style={{ y: imgY }}
              />
            </div>

            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,26,46,0.6)] via-[rgba(61,26,46,0.08)] to-transparent pointer-events-none" />

            {/* Stats overlay — bottom of photo */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4">
              <motion.div
                className="flex gap-6"
                variants={STAGGER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {a.stats.map(({ num, label }) => (
                  <motion.div key={label} className="flex flex-col gap-[0.1rem]" variants={FADE_UP}>
                    <span
                      className="text-[1.8rem] font-bold text-[var(--champagne)] leading-none"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {num}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.09em] uppercase text-[rgba(250,247,242,0.7)]">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-[0.72rem] text-[rgba(250,247,242,0.55)] leading-[1.6] border-t border-[rgba(250,247,242,0.12)] pt-3">
                {a.press}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
