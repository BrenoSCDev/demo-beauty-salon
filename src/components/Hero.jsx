import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  const scrollToForm = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[100dvh] flex items-center px-[6vw] relative overflow-hidden bg-[var(--ivory)]">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hf_20260422_194118_2ac9a3e1-483e-4812-b130-1a4b9f6f6689.mp4"
        autoPlay muted loop playsInline aria-hidden="true"
      />

      {/* Blush colour-scheme overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(250,232,223,0.72) 0%, rgba(250,247,242,0.62) 55%, rgba(237,232,223,0.68) 100%)' }}
      />
      {/* Soft plum edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(61,26,46,0.08) 100%)' }}
      />

      {/* Decorative rings */}
      <motion.div
        className="absolute top-1/2 right-[-10vw] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] rounded-full border border-[rgba(61,26,46,0.1)] pointer-events-none -translate-y-1/2 max-[900px]:hidden z-[1]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-[-4vw] w-[36vw] h-[36vw] max-w-[480px] max-h-[480px] rounded-full border border-dashed border-[rgba(212,175,122,0.35)] pointer-events-none -translate-y-1/2 max-[900px]:hidden z-[1]"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      />

      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-[1.1fr_0.9fr] max-[900px]:grid-cols-1 items-center gap-20 max-[900px]:gap-14 py-28 relative z-[1]">
        <motion.div
          className="flex flex-col items-start gap-[1.6rem]"
          variants={STAGGER}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.16em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]"
            variants={FADE_UP}
          >
            {h.eyebrow}
          </motion.span>

          <motion.h1
            className="font-[var(--font-serif)] flex flex-col gap-[0.1rem]"
            style={{ fontFamily: 'var(--font-serif)' }}
            variants={FADE_UP}
          >
            <span className="text-[clamp(3rem,6vw,5.5rem)] font-normal italic text-[var(--plum)] leading-[1.05]">
              {h.titleLine1}
            </span>
            <span className="text-[clamp(3.5rem,7vw,6.5rem)] font-bold text-[var(--plum)] leading-[0.95] tracking-[-0.02em]">
              {h.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            className="text-[1.1rem] font-normal text-[var(--champagne)] tracking-[0.18em] uppercase"
            style={{ fontFamily: 'var(--font-serif)' }}
            variants={FADE_UP}
          >
            {h.studio}
          </motion.p>

          <motion.p className="text-[0.98rem] text-[var(--text-body)] max-w-[46ch] leading-[1.75]" variants={FADE_UP}>
            {h.body}
          </motion.p>

          <motion.div variants={FADE_UP}>
            <button
              className="inline-flex items-center gap-3 py-[0.95rem] px-[1.8rem] bg-[var(--plum)] text-[var(--ivory)] rounded-full text-[0.87rem] font-medium tracking-[0.06em] transition-all duration-300 hover:bg-[var(--plum-mid)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] will-change-transform"
              style={{ boxShadow: '0 4px 24px rgba(61,26,46,0.2), inset 0 1px 0 rgba(255,255,255,0.08)' }}
              onClick={scrollToForm}
            >
              <span>{h.cta}</span>
              <span className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[rgba(255,255,255,0.12)] shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex justify-center max-[900px]:justify-start"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.5 }}
        >
          <div className="rounded-[2rem] p-[2px] bg-[rgba(61,26,46,0.06)] border border-[rgba(61,26,46,0.1)] w-full max-w-[340px] max-[600px]:max-w-full">
            <div
              className="bg-[var(--ivory)] rounded-[calc(2rem-2px)] overflow-hidden"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
            >
              <div
                className="p-10 flex flex-col gap-[0.6rem]"
                style={{ background: 'linear-gradient(160deg, rgba(242,212,200,0.3) 0%, transparent 60%)' }}
              >
                <span className="text-[1.4rem] font-semibold text-[var(--plum)]" style={{ fontFamily: 'var(--font-serif)' }}>
                  Isabelle Fontaine
                </span>
                <span className="text-[0.78rem] text-[var(--text-body)] tracking-[0.06em]">
                  Master Colorist &amp; Stylist
                </span>
                <div
                  className="h-px my-[0.8rem]"
                  style={{ background: 'linear-gradient(90deg, rgba(61,26,46,0.12), transparent)' }}
                />
                <div className="flex gap-[1.8rem]">
                  {[
                    { num: '11', label: h.stats.years },
                    { num: '5★', label: h.stats.rated },
                    { num: '2.3k', label: h.stats.clients },
                  ].map(({ num, label }) => (
                    <div key={label} className="flex flex-col gap-[0.15rem]">
                      <span className="text-[1.8rem] font-bold text-[var(--champagne)] leading-none" style={{ fontFamily: 'var(--font-serif)' }}>
                        {num}
                      </span>
                      <span className="text-[0.68rem] tracking-[0.1em] uppercase text-[var(--text-body)]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute bottom-[-1.2rem] right-[-1rem] flex items-center gap-2 py-[0.55rem] px-4 bg-white border border-[rgba(61,26,46,0.1)] rounded-full"
            style={{ boxShadow: '0 8px 24px rgba(61,26,46,0.1)' }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <span className="text-[0.72rem] font-medium text-[var(--plum)] tracking-[0.04em]">{h.badge}</span>
            <span
              className="w-[7px] h-[7px] rounded-full bg-[#6dbf7e] shrink-0"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
