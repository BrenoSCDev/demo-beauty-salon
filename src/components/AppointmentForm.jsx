import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const INITIAL = { name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' };

export default function AppointmentForm() {
  const { t } = useLang();
  const f = t.form;

  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!fields.name.trim()) e.name = f.errors.name;
    if (!fields.email.trim()) e.email = f.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = f.errors.emailInvalid;
    if (!fields.phone.trim()) e.phone = f.errors.phone;
    if (!fields.service) e.service = f.errors.service;
    if (!fields.date) e.date = f.errors.date;
    if (!fields.time) e.time = f.errors.time;
    return e;
  }

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  const inputWrapBase = "rounded-[0.75rem] border bg-[var(--ivory)] transition-colors duration-200 relative flex items-center focus-within:border-[var(--champagne)]";
  const inputNormal = "border-[rgba(61,26,46,0.18)]";
  const inputError = "border-[#c0392b]";

  return (
    <section className="py-[8rem] px-[6vw] max-[700px]:py-[5rem] max-[700px]:px-[1.25rem] bg-[var(--ivory)]" id="appointment">
      <div className="max-w-[1320px] mx-auto grid grid-cols-[1fr_1fr] gap-20 items-start max-[960px]:grid-cols-1 max-[960px]:gap-14">

        {/* Form column */}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4 items-start">
            <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(61,26,46,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--plum-mid)] bg-[rgba(61,26,46,0.04)]">
              {f.eyebrow}
            </span>
            <h2
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-[var(--plum)] leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {f.titleMain} <span className="italic text-[var(--champagne)]">{f.titleAccent}</span>
            </h2>
            <p className="text-[0.9rem] text-[var(--text-body)] max-w-[44ch]">
              {f.subtitle}
            </p>
          </div>

          <div className="rounded-[2rem] p-[2px] bg-[rgba(61,26,46,0.06)] border border-[rgba(61,26,46,0.1)]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="bg-[var(--ivory-dark)] rounded-[calc(2rem-2px)] py-20 px-14 flex flex-col items-center gap-5 text-center"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="w-16 h-16 rounded-full bg-[rgba(212,175,122,0.1)] flex items-center justify-center mb-2">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" stroke="#D4AF7A" strokeWidth="1.5"/>
                      <path d="M8 14.5l4 4 8-8" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[2rem] font-bold text-[var(--plum)]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {f.success.title}
                  </h3>
                  <p className="text-[0.9rem] text-[var(--text-body)] max-w-[38ch] leading-[1.7]">{f.success.body}</p>
                  <button
                    className="mt-2 py-[0.65rem] px-[1.6rem] border border-[rgba(61,26,46,0.25)] rounded-full text-[0.8rem] tracking-[0.06em] text-[var(--plum-mid)] transition-all duration-200 hover:bg-[rgba(61,26,46,0.06)] hover:border-[var(--champagne)]"
                    onClick={() => { setSubmitted(false); setFields(INITIAL); setErrors({}); }}
                  >
                    {f.success.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="bg-[var(--ivory-dark)] rounded-[calc(2rem-2px)] p-[3rem_3.5rem] max-[700px]:p-[2rem_1.5rem] flex flex-col gap-6"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  noValidate
                >
                  <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-name">{f.fields.name}</label>
                      <div className={`${inputWrapBase} ${errors.name ? inputError : inputNormal}`}>
                        <input id="bs-name" name="name" type="text" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] placeholder-[rgba(61,26,46,0.3)]" placeholder={f.fields.namePlaceholder} value={fields.name} onChange={handleChange} autoComplete="name" />
                      </div>
                      {errors.name && <span className="text-[0.72rem] text-[#c0392b]">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-email">{f.fields.email}</label>
                      <div className={`${inputWrapBase} ${errors.email ? inputError : inputNormal}`}>
                        <input id="bs-email" name="email" type="email" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] placeholder-[rgba(61,26,46,0.3)]" placeholder={f.fields.emailPlaceholder} value={fields.email} onChange={handleChange} autoComplete="email" />
                      </div>
                      {errors.email && <span className="text-[0.72rem] text-[#c0392b]">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-phone">{f.fields.phone}</label>
                      <div className={`${inputWrapBase} ${errors.phone ? inputError : inputNormal}`}>
                        <input id="bs-phone" name="phone" type="tel" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] placeholder-[rgba(61,26,46,0.3)]" placeholder={f.fields.phonePlaceholder} value={fields.phone} onChange={handleChange} autoComplete="tel" />
                      </div>
                      {errors.phone && <span className="text-[0.72rem] text-[#c0392b]">{errors.phone}</span>}
                    </div>
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-service">{f.fields.service}</label>
                      <div className={`${inputWrapBase} ${errors.service ? inputError : inputNormal}`}>
                        <select id="bs-service" name="service" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] appearance-none cursor-pointer pr-10" value={fields.service} onChange={handleChange}>
                          <option value="">{f.fields.serviceDefault}</option>
                          {f.serviceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <span className="absolute right-4 pointer-events-none flex items-center text-[var(--plum-mid)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4.5l4 3.5 4-3.5" stroke="#5C2B47" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      {errors.service && <span className="text-[0.72rem] text-[#c0392b]">{errors.service}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-date">{f.fields.date}</label>
                      <div className={`${inputWrapBase} ${errors.date ? inputError : inputNormal}`}>
                        <input id="bs-date" name="date" type="date" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)]" value={fields.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                      </div>
                      {errors.date && <span className="text-[0.72rem] text-[#c0392b]">{errors.date}</span>}
                    </div>
                    <div className="flex flex-col gap-[0.45rem]">
                      <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-time">{f.fields.time}</label>
                      <div className={`${inputWrapBase} ${errors.time ? inputError : inputNormal}`}>
                        <select id="bs-time" name="time" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] appearance-none cursor-pointer pr-10" value={fields.time} onChange={handleChange}>
                          <option value="">{f.fields.timeDefault}</option>
                          <option value="9:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                        <span className="absolute right-4 pointer-events-none flex items-center text-[var(--plum-mid)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4.5l4 3.5 4-3.5" stroke="#5C2B47" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      {errors.time && <span className="text-[0.72rem] text-[#c0392b]">{errors.time}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[0.45rem]">
                    <label className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-[var(--plum-mid)]" htmlFor="bs-notes">
                      {f.fields.notes} <span className="font-light normal-case tracking-normal text-[var(--text-body)]">{f.fields.notesOptional}</span>
                    </label>
                    <div className={`${inputWrapBase} ${inputNormal} items-start`}>
                      <textarea id="bs-notes" name="notes" className="w-full py-3 px-4 bg-transparent text-[0.9rem] text-[var(--plum)] placeholder-[rgba(61,26,46,0.3)] resize-y min-h-[100px]" placeholder={f.fields.notesPlaceholder} value={fields.notes} onChange={handleChange} rows={4} />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="self-start mt-2 inline-flex items-center gap-[0.6rem] py-[0.85rem] px-[2.2rem] bg-[var(--plum)] text-[var(--ivory)] rounded-full text-[0.85rem] font-medium tracking-[0.06em]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    {f.submit}
                    <span className="flex items-center opacity-70">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M7.5 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Map column */}
        <div className="flex flex-col gap-6 sticky top-10 max-[960px]:static">
          <div className="rounded-[1.5rem] overflow-hidden border border-[rgba(61,26,46,0.12)] shadow-[0_8px_40px_rgba(61,26,46,0.1)]" style={{ height: '480px' }}>
            <iframe
              title="Lumière Studio location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-87.6600%2C41.9100%2C-87.6200%2C41.9350&layer=mapnik&marker=41.9230%2C-87.6430"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                filter: 'saturate(0.6) sepia(0.18) brightness(1.04)',
                display: 'block',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none rounded-[1.5rem] shadow-[inset_0_0_0_1px_rgba(61,26,46,0.08)]" />
          </div>

          <div className="rounded-[1.25rem] border border-[rgba(61,26,46,0.1)] bg-[var(--ivory-dark)] divide-y divide-[rgba(61,26,46,0.08)]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
            <div className="flex items-start gap-4 p-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-[2px]" style={{ background: 'linear-gradient(135deg, var(--blush), var(--champagne-light))' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 7 3.5a1.5 1.5 0 0 1 0 3z" fill="var(--plum)"/>
                </svg>
              </span>
              <div className="flex flex-col gap-[0.15rem]">
                <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-[var(--champagne)]">{f.address}</span>
                <span className="text-[0.85rem] text-[var(--text-body)] leading-[1.6]">212 Rue de Beauté</span>
                <span className="text-[0.85rem] text-[var(--text-body)]">Chicago, IL 60614</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-[2px]" style={{ background: 'linear-gradient(135deg, var(--blush), var(--champagne-light))' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="var(--plum)" strokeWidth="1.2"/>
                  <path d="M7 4v3.5l2 1.5" stroke="var(--plum)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
              <div className="flex flex-col gap-[0.15rem]">
                <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-[var(--champagne)]">{f.hours}</span>
                {f.schedule.map((row) => (
                  <span key={row.days} className="text-[0.85rem] text-[var(--text-body)]">{row.days} &nbsp;{row.time}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
