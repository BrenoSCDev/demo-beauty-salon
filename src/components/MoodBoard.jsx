import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const TILES = [
  { key: 0, img: '/balayage.png',  span: 'tall' },
  { key: 1, img: '/bride.png',     span: 'normal' },
  { key: 2, img: '/lashes.png',    span: 'normal' },
  { key: 3, img: '/colormelt.png', span: 'wide' },
  { key: 4, img: '/blowout.png',   span: 'normal' },
  { key: 5, img: '/keratin.png',   span: 'normal' },
];

const ITEM = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
};

const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const spanClasses = {
  tall: 'row-span-2',
  wide: 'col-span-2 max-[600px]:col-span-1',
  normal: '',
};

const minHeightClasses = {
  tall: 'min-h-[440px] max-[900px]:min-h-[280px] max-[600px]:min-h-[220px]',
  wide: 'min-h-[220px]',
  normal: 'min-h-[200px]',
};

export default function MoodBoard() {
  const { t } = useLang();
  const mb = t.moodboard;

  return (
    <section className="py-[8rem] px-[6vw] max-[600px]:py-[5rem] max-[600px]:px-[1.25rem] bg-[var(--ivory)]" id="gallery">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-4 mb-14 items-start">
          <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]">
            {mb.eyebrow}
          </span>
          <h2
            className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold text-[var(--plum)] leading-none tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {mb.titleMain} <span className="italic text-[var(--champagne)]">{mb.titleAccent}</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[1.2rem]"
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.key}
              className={`group rounded-[1.25rem] overflow-hidden will-change-transform cursor-default ${spanClasses[tile.span]}`}
              variants={ITEM}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 200, damping: 22 } }}
            >
              <div
                className={`w-full h-full relative ${minHeightClasses[tile.span]}`}
                style={!tile.img ? { background: tile.gradient } : undefined}
              >
                {tile.img && (
                  <motion.img
                    src={tile.img}
                    alt={mb.tiles[i].label}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  />
                )}

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,26,46,0.55)] via-transparent to-transparent pointer-events-none" />

                {/* Hover blush tint */}
                {tile.img && (
                  <div className="absolute inset-0 bg-[rgba(242,212,200,0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className="text-[1.05rem] font-medium italic text-[rgba(250,247,242,0.92)] tracking-[0.04em]"
                    style={{ fontFamily: 'var(--font-serif)', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                  >
                    {mb.tiles[i].label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
