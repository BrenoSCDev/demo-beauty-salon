import { Globe, Mail, Phone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-[var(--plum)] text-[var(--ivory)] pt-20 px-[6vw] pb-10 max-[560px]:pt-16 max-[560px]:px-5 max-[560px]:pb-8">
      <div className="max-w-[1320px] mx-auto grid grid-cols-[1.6fr_1fr_1fr_1fr] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 gap-12 max-[560px]:gap-8 pb-12 border-b border-[rgba(250,247,242,0.1)]">
        <div>
          <span
            className="block text-[2rem] font-bold italic text-[var(--champagne)] tracking-[-0.01em] mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Lumière
          </span>
          <p className="text-[0.82rem] text-[rgba(250,247,242,0.55)] leading-[1.6] max-w-[28ch] mb-6">
            {f.tagline}
          </p>
          <div className="flex gap-3">
            {[
              { icon: Globe, label: 'Website' },
              { icon: Mail, label: 'Email' },
              { icon: Phone, label: 'Phone' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-[34px] h-[34px] rounded-full border border-[rgba(250,247,242,0.18)] flex items-center justify-center text-[rgba(250,247,242,0.55)] transition-all duration-200 hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[0.9rem]">
          <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--champagne)] mb-1">{f.studioLabel}</p>
          <ul className="flex flex-col gap-[0.55rem]">
            {f.studioLinks.map(({ href, label }) => (
              <li key={label}>
                <a href={href} className="text-[0.82rem] text-[rgba(250,247,242,0.55)] leading-[1.5] transition-colors duration-200 hover:text-[var(--champagne)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[0.9rem]">
          <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--champagne)] mb-1">{f.bookingLabel}</p>
          <ul className="flex flex-col gap-[0.55rem]">
            {f.bookingLinks.map((label) => (
              <li key={label}>
                <a href="#appointment" className="text-[0.82rem] text-[rgba(250,247,242,0.55)] leading-[1.5] transition-colors duration-200 hover:text-[var(--champagne)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[0.9rem]">
          <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--champagne)] mb-1">{f.findUs}</p>
          <ul className="flex flex-col gap-[0.55rem]">
            {['212 Rue de Beauté', 'Chicago, IL 60614', '+1 (312) 555-0192', 'hello@lumierestudio.co'].map((item) => (
              <li key={item} className="text-[0.82rem] text-[rgba(250,247,242,0.55)] leading-[1.5]">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto pt-8 flex justify-between items-center gap-4 flex-wrap max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-[0.4rem]">
        <p className="text-[0.75rem] text-[rgba(250,247,242,0.35)] tracking-[0.03em]">
          © {new Date().getFullYear()} Lumière Studio. {f.copyright}
        </p>
        <p className="text-[0.75rem] text-[rgba(250,247,242,0.35)] tracking-[0.03em]">{f.byAppointment}</p>
      </div>
    </footer>
  );
}
