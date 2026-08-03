let lenisInstance = null;
let scrollLockCount = 0;
let savedScrollY = 0;
let savedBodyPosition = '';
let savedBodyTop = '';
let savedBodyWidth = '';

export function setLenisInstance(lenis) {
  lenisInstance = lenis;
}

export function lockPageScroll() {
  if (scrollLockCount === 0) {
    savedScrollY = window.scrollY;
    savedBodyPosition = document.body.style.position;
    savedBodyTop = document.body.style.top;
    savedBodyWidth = document.body.style.width;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    lenisInstance?.stop();
  }

  scrollLockCount += 1;

  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.position = savedBodyPosition;
      document.body.style.top = savedBodyTop;
      document.body.style.width = savedBodyWidth;
      window.scrollTo(0, savedScrollY);
      lenisInstance?.start();
    }
  };
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
