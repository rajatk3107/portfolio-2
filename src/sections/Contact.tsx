'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Floating label input ─────────────────────────────────────

function FloatingInput({
  id, label, type = 'text', isTextarea = false, value, onChange,
}: {
  id: string; label: string; type?: string; isTextarea?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const shared =
    'w-full bg-transparent outline-none resize-none font-body text-[var(--text)] text-sm ' +
    'pt-6 pb-3 px-4 peer'

  return (
    <div className="relative border border-[var(--border)] rounded-xl overflow-hidden
                    focus-within:border-[var(--accent)] transition-colors duration-300">
      {/* Subtle bg tint on focus */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: 'rgba(196,162,90,0.03)', opacity: focused ? 1 : 0 }}
      />

      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className="absolute left-4 font-mono text-[10px] tracking-widest uppercase pointer-events-none z-10"
        animate={{
          top:      lifted ? '10px' : '50%',
          y:        lifted ? 0 : '-50%',
          color:    lifted ? 'var(--accent)' : 'var(--muted)',
          fontSize: lifted ? '9px' : '11px',
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        {label}
      </motion.label>

      {isTextarea ? (
        <textarea
          id={id}
          rows={5}
          className={shared}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={shared}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

// ─── Social link ──────────────────────────────────────────────

function SocialLink({ href, label, handle }: { href: string; label: string; handle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 border-b border-[var(--border)]
                 hover:border-[var(--accent)] transition-all duration-300"
      data-hover
    >
      <div>
        <div className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase mb-0.5">
          {label}
        </div>
        <div className="font-body text-[var(--text)] text-sm group-hover:text-[var(--accent)] transition-colors duration-300">
          {handle}
        </div>
      </div>
      <motion.span
        className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-300"
        animate={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        ↗
      </motion.span>
    </a>
  )
}

// ─── Contact Section ──────────────────────────────────────────

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1400))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" ref={ref} className="section-pad">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">05</span>
          <div className="w-10 h-px bg-[var(--accent)]" />
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT — headline + socials ── */}
          <div>
            <motion.h2
              className="font-display font-medium leading-[1.08] mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', color: 'var(--text)' }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Let's create<br />
              <em className="italic font-light text-[var(--muted)]">something</em><br />
              remarkable.
            </motion.h2>

            <motion.p
              className="font-body text-[var(--muted)] text-base leading-relaxed max-w-md mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Whether you have a product idea, need a technical partner, or just want
              to talk about the craft — I'm always open to interesting conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <SocialLink href="#" label="GitHub"   handle="@rajatkumar" />
              <SocialLink href="#" label="LinkedIn"  handle="rajat-kumar" />
              <SocialLink href="#" label="Twitter/X" handle="@rajatdev" />
              <SocialLink href="#" label="Dribbble"  handle="rajatk" />

              <div className="mt-8 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase">
                  Open to work — response within 24h
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — form ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <FloatingInput
                id="name"
                label="Your name"
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
              />
              <FloatingInput
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
              />
              <FloatingInput
                id="message"
                label="Your message"
                isTextarea
                value={form.message}
                onChange={v => setForm(f => ({ ...f, message: v }))}
              />

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                className="relative mt-2 overflow-hidden group px-8 py-5
                           bg-[var(--accent)] text-[#080808] font-heading font-semibold text-sm
                           tracking-wide disabled:opacity-70 transition-opacity duration-300"
                whileHover={{ scale: status === 'idle' ? 1.01 : 1 }}
                whileTap={{  scale: 0.99 }}
                data-hover
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{   opacity: 0, y: -8 }}
                    >
                      Send message
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span
                      key="sending"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{   opacity: 0, y: -8 }}
                    >
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span
                      key="sent"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{   opacity: 0, y: -8 }}
                    >
                      ✓ Message sent — I'll reply soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="font-mono text-[10px] text-[var(--muted)] tracking-wide text-center">
                Or email directly at{' '}
                <a
                  href="mailto:hello@rajatk.dev"
                  className="text-[var(--accent)] hover:underline transition-all duration-200"
                  data-hover
                >
                  hello@rajatk.dev
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
