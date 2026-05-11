import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
};

function Stars({ count }) {
  return (
    <div className="flex gap-[0.2rem]">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1l1.43 2.9 3.2.47-2.32 2.26.55 3.19L6.5 8.27l-2.86 1.55.55-3.19L1.87 4.37l3.2-.47L6.5 1z"
            fill="#D4AF7A"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;

  return (
    <section className="py-[8rem] px-[6vw] max-[600px]:py-[5rem] max-[600px]:px-[1.25rem] bg-[var(--ivory-dark)]" id="testimonials">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-4 mb-16 items-start">
          <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]">
            {tm.eyebrow}
          </span>
          <h2
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold text-[var(--plum)] leading-none tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {tm.titleMain} <span className="italic text-[var(--champagne)]">{tm.titleAccent}</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[1.5rem]"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {tm.items.map((r) => (
            <motion.div
              key={r.name}
              className="rounded-[1.75rem] p-[2px] bg-[rgba(61,26,46,0.05)] border border-[rgba(61,26,46,0.1)]"
              variants={FADE_UP}
            >
              <div
                className="bg-[var(--ivory)] rounded-[calc(1.75rem-2px)] p-[2.2rem_2rem] flex flex-col gap-[1.2rem]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
              >
                <Stars count={r.rating} />
                <p
                  className="text-[1rem] italic text-[var(--plum)] leading-[1.75] flex-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  "{r.text}"
                </p>
                <div className="flex items-center gap-[0.9rem] pt-4 border-t border-[rgba(61,26,46,0.1)]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[0.72rem] font-semibold text-[var(--plum)] shrink-0 tracking-[0.02em]"
                    style={{ background: 'linear-gradient(135deg, var(--blush), var(--champagne))' }}
                  >
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-medium text-[var(--plum)]">{r.name}</p>
                    <p className="text-[0.72rem] text-[var(--text-body)] tracking-[0.04em]">{r.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
