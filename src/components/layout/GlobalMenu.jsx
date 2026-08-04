import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useMenu } from '@/context/MenuContext';
import { navLinks } from '@/config/navLinks';
import { siteConfig } from '@/config/siteConfig';
import { buildContactWhatsAppLink } from '@/utils/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '@/components/SocialIcons/SocialIcons';
import { cn } from '@/lib/utils';

const panelEase = [0.16, 1, 0.3, 1];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: panelEase } },
  exit: { opacity: 0, transition: { duration: 0.28, ease: panelEase } },
};

const panelVariants = {
  hidden: { x: '100%', opacity: 1 },
  visible: {
    x: 0,
    transition: { duration: 0.55, ease: panelEase },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.38, ease: panelEase },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.14 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: panelEase },
  },
};

function GlobalMenu() {
  const location = useLocation();
  const { isHome, isOpen, isClosing, closeMenu } = useMenu();
  const whatsappLink = buildContactWhatsAppLink();
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const visible = !isHome && isOpen;

  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (isHome) {
    return null;
  }

  const motionState = isClosing ? 'exit' : 'visible';

  return createPortal(
    <AnimatePresence mode="wait">
      {visible && (
        <div
          key="global-menu"
          className="contents"
          role="presentation"
        >
          <motion.button
            type="button"
            className="fixed inset-0 z-[190] border-0 bg-[rgba(26,26,26,0.42)] backdrop-blur-md"
            aria-label="Cerrar menú"
            variants={reducedMotion ? undefined : overlayVariants}
            initial={reducedMotion ? false : 'hidden'}
            animate={reducedMotion ? false : motionState}
            onClick={closeMenu}
          />

          <motion.aside
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className={cn(
              'fixed top-0 right-0 z-[210] flex h-[100dvh] flex-col',
              'w-[min(100%,420px)] md:w-[25vw] md:min-w-[280px] md:max-w-[360px]',
              'border-l border-brand-border bg-brand-bg',
              'bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(232,97,45,0.08),transparent_65%)]',
              'px-[var(--header-gutter)] pb-8',
              'shadow-[-20px_0_48px_rgba(26,26,26,0.12)]',
              isClosing && 'pointer-events-none',
            )}
            variants={reducedMotion ? undefined : panelVariants}
            initial={reducedMotion ? false : 'hidden'}
            animate={reducedMotion ? false : motionState}
          >
            <div className="relative z-[1] mb-6 flex min-h-[var(--header-height)] shrink-0 items-center justify-between border-b border-brand-border">
              <span className="font-body text-base font-bold lowercase tracking-[-0.02em] text-brand-muted">
                menú
              </span>
              <button
                type="button"
                className="group inline-flex items-center gap-2 border-0 bg-transparent font-body text-sm font-bold uppercase tracking-[0.1em] text-brand-text transition-colors hover:text-brand-accent"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                cerrar
                <X
                  size={20}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="origin-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                />
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col gap-0.5 overflow-y-auto pt-2"
              aria-label="Navegación principal"
              variants={reducedMotion ? undefined : listVariants}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? false : 'visible'}
            >
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.to;

                return (
                  <motion.div key={link.to} variants={reducedMotion ? undefined : itemVariants}>
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className={cn(
                        'group flex items-baseline gap-2.5 py-1.5 no-underline transition-transform duration-200',
                        'hover:-translate-x-1',
                        isActive ? 'text-brand-accent' : 'text-brand-text/85 hover:text-brand-text',
                      )}
                    >
                      <span className="min-w-[1.5rem] font-body text-xs font-semibold tracking-[0.08em] opacity-75">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(1.5rem,4vw,2.25rem)] uppercase leading-[0.92] tracking-[0.02em]">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              className="mt-auto flex flex-col gap-3 border-t border-brand-border pt-6"
              variants={reducedMotion ? undefined : itemVariants}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? false : 'visible'}
            >
              <p className="m-0 font-body text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted">
                Seguime
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-brand-text no-underline transition-colors hover:text-brand-accent"
                >
                  <InstagramIcon />
                  Instagram
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-brand-text no-underline transition-colors hover:text-brand-accent"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={cn(
                  'mt-1 inline-flex w-fit items-center gap-2 rounded-pill border-2 border-brand-surface',
                  'bg-brand-surface px-[1.1rem] py-3 font-body text-sm font-bold uppercase tracking-[0.08em]',
                  'text-brand-accent no-underline shadow-md transition-colors',
                  'hover:border-brand-text hover:bg-brand-text hover:text-brand-bg',
                )}
              >
                Escribime
                <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default GlobalMenu;
