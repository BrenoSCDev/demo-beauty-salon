import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const CARD_ANIM = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section className="py-[8rem] px-[6vw] max-[600px]:py-[5rem] max-[600px]:px-[1.25rem] bg-[var(--ivory-dark)]" id="services">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-4 mb-16 items-start">
          <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]">
            {s.eyebrow}
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--plum)] leading-none tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {s.titleMain} <span className="italic text-[var(--champagne)]">{s.titleAccent}</span>
          </h2>
          <p className="text-[0.95rem] text-[var(--text-body)] max-w-[46ch] leading-[1.75]">
            {s.subtitle}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-[1.5rem]"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {s.items.map((item) => (
            <motion.div
              key={item.num}
              className="rounded-[1.75rem] p-[2px] bg-[rgba(61,26,46,0.05)] border border-[rgba(61,26,46,0.1)] cursor-default will-change-transform"
              variants={CARD_ANIM}
              whileHover="hover"
              initial="rest"
            >
              <motion.div
                className="rounded-[calc(1.75rem-2px)] p-[2.5rem_2.2rem] flex flex-col gap-[0.9rem] min-h-[260px]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)' }}
                variants={{
                  rest: { background: 'var(--ivory)' },
                  hover: { background: 'var(--plum)', transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <motion.span
                    className="text-[3.5rem] font-bold leading-none"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    variants={{
                      rest: { color: 'rgba(61,26,46,0.15)' },
                      hover: { color: 'rgba(212,175,122,0.35)' },
                    }}
                  >
                    {item.num}
                  </motion.span>
                  <motion.span
                    className="text-[1.2rem] font-medium text-right pt-[0.3rem]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    variants={{
                      rest: { color: 'var(--champagne)' },
                      hover: { color: 'var(--champagne-light)' },
                    }}
                  >
                    {item.price}
                  </motion.span>
                </div>

                <motion.h3
                  className="text-[1.9rem] font-semibold leading-[1.1]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                  variants={{
                    rest: { color: 'var(--plum)' },
                    hover: { color: 'var(--ivory)' },
                  }}
                >
                  {item.name}
                </motion.h3>

                <motion.p
                  className="text-[0.78rem] tracking-[0.08em] uppercase font-normal"
                  variants={{
                    rest: { color: 'var(--champagne)' },
                    hover: { color: 'rgba(212,175,122,0.8)' },
                  }}
                  dangerouslySetInnerHTML={{ __html: item.tagline }}
                />

                <motion.p
                  className="text-[0.9rem] leading-[1.75] flex-1"
                  variants={{
                    rest: { color: 'var(--text-body)' },
                    hover: { color: 'rgba(250,247,242,0.75)' },
                  }}
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
