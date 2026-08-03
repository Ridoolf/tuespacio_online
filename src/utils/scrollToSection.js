let lenisInstance = null;

export function setLenisInstance(lenis) {
  lenisInstance = lenis;
}

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerHeight = Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    10,
  ) || 76;
  const offset = -(headerHeight + 16);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (lenisInstance && !prefersReduced) {
    lenisInstance.scrollTo(target, { offset, duration: 1.45, easing: (t) => 1 - (1 - t) ** 3 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
}
