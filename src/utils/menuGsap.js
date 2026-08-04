import gsap from 'gsap';

export const MENU_TIMING = {
  forward: 320,
  overlay: 0.44,
  morph: 0.72,
  panelEnter: 0.52,
  panelExit: 0.36,
  contentIn: 0.4,
  contentOut: 0.18,
};

export const MENU_CONTENT_TIMING = {
  head: 0.36,
  navIndex: 0.32,
  navText: 0.52,
  navOffsetStart: 0.08,
  navOffsetStep: 0.06,
  navTextDelay: 0.04,
  sideStart: 0.22,
  sideDuration: 0.36,
  sideStagger: 0.055,
  hideStagger: 0.02,
};

const resolvers = {};

export function waitMenuAnimation(key) {
  return new Promise((resolve) => {
    resolvers[key] = resolve;
  });
}

export function completeMenuAnimation(key) {
  resolvers[key]?.();
  delete resolvers[key];
}

export function applyPanelRect(el, rect) {
  if (!el || !rect) return;
  gsap.set(el, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: rect.borderRadius,
  });
}

export function morphPanel(panelEl, fromRect, toRect, reducedMotion = false) {
  const tl = gsap.timeline();

  if (!panelEl || !fromRect || !toRect) {
    return tl;
  }

  applyPanelRect(panelEl, fromRect);

  if (reducedMotion) {
    applyPanelRect(panelEl, toRect);
    gsap.set(panelEl, { clearProps: 'scale,opacity' });
    return tl;
  }

  gsap.set(panelEl, { scale: 1, transformOrigin: 'center center' });

  tl.to(panelEl, {
    top: toRect.top,
    left: toRect.left,
    width: toRect.width,
    height: toRect.height,
    borderRadius: toRect.borderRadius,
    scale: 1,
    duration: MENU_TIMING.morph,
    ease: 'expo.inOut',
  });

  return tl;
}

export function enterPanel(panelEl, targetRect, reducedMotion = false) {
  const tl = gsap.timeline();

  if (!panelEl || !targetRect) {
    return tl;
  }

  applyPanelRect(panelEl, targetRect);

  if (reducedMotion) {
    gsap.set(panelEl, { opacity: 1, scale: 1, y: 0 });
    return tl;
  }

  gsap.set(panelEl, {
    opacity: 0,
    scale: 0.96,
    y: 28,
    transformOrigin: '50% 0%',
  });

  tl.to(panelEl, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: MENU_TIMING.panelEnter,
    ease: 'expo.out',
  });

  return tl;
}

export function exitPanel(panelEl, reducedMotion = false) {
  const tl = gsap.timeline();

  if (!panelEl) {
    return tl;
  }

  if (reducedMotion) {
    gsap.set(panelEl, { opacity: 0 });
    return tl;
  }

  tl.to(panelEl, {
    opacity: 0,
    scale: 0.98,
    y: 16,
    duration: MENU_TIMING.panelExit,
    ease: 'power2.in',
  });

  return tl;
}

export function fadeOverlay(overlayEl, show, reducedMotion = false) {
  const tl = gsap.timeline();

  if (!overlayEl) {
    return tl;
  }

  if (reducedMotion) {
    gsap.set(overlayEl, { opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' });
    return tl;
  }

  if (show) {
    gsap.set(overlayEl, { opacity: 0 });
  }

  tl.to(overlayEl, {
    opacity: show ? 1 : 0,
    duration: MENU_TIMING.overlay,
    ease: show ? 'power2.out' : 'power2.in',
    pointerEvents: show ? 'auto' : 'none',
  });

  return tl;
}

export function revealMenuContent(containerEl, reducedMotion = false) {
  const tl = gsap.timeline();
  if (!containerEl) return tl;

  const head = containerEl.querySelector('.pillar-menu-head');
  const navItems = containerEl.querySelectorAll('.pillar-menu-nav > *');
  const sideItems = containerEl.querySelectorAll('.pillar-menu-side > *');

  if (reducedMotion) {
    gsap.set([head, ...navItems, ...sideItems], { opacity: 1, x: 0, y: 0, clearProps: 'transform,clipPath' });
    containerEl.querySelectorAll('.pillar-menu-link-text-wrap').forEach((el) => {
      gsap.set(el, { clipPath: 'none' });
    });
    return tl;
  }

  if (head) {
    gsap.set(head, { opacity: 0, y: -18 });
    tl.to(head, { opacity: 1, y: 0, duration: MENU_CONTENT_TIMING.head, ease: 'power3.out' }, 0);
  }

  navItems.forEach((item, index) => {
    const indexEl = item.querySelector('.pillar-menu-link-index');
    const textWrap = item.querySelector('.pillar-menu-link-text-wrap');
    const offset = MENU_CONTENT_TIMING.navOffsetStart + index * MENU_CONTENT_TIMING.navOffsetStep;

    if (indexEl) {
      gsap.set(indexEl, { opacity: 0, x: -10 });
      tl.to(indexEl, { opacity: 1, x: 0, duration: MENU_CONTENT_TIMING.navIndex, ease: 'power3.out' }, offset);
    }

    if (textWrap) {
      gsap.set(textWrap, { clipPath: 'inset(100% 0 0 0)' });
      tl.to(
        textWrap,
        { clipPath: 'inset(0% 0 0 0)', duration: MENU_CONTENT_TIMING.navText, ease: 'power4.out' },
        offset + MENU_CONTENT_TIMING.navTextDelay,
      );
    }
  });

  if (sideItems.length > 0) {
    gsap.set(sideItems, { opacity: 0, y: 22 });
    tl.to(
      sideItems,
      {
        opacity: 1,
        y: 0,
        duration: MENU_CONTENT_TIMING.sideDuration,
        stagger: MENU_CONTENT_TIMING.sideStagger,
        ease: 'power2.out',
      },
      MENU_CONTENT_TIMING.sideStart,
    );
  }

  return tl;
}

export function hideMenuContent(containerEl, reducedMotion = false) {
  const tl = gsap.timeline();
  if (!containerEl) return tl;

  const items = containerEl.querySelectorAll(
    '.pillar-menu-head, .pillar-menu-nav > *, .pillar-menu-side > *',
  );

  if (reducedMotion || items.length === 0) {
    gsap.set(items, { opacity: 0 });
    return tl;
  }

  tl.to(items, {
    opacity: 0,
    y: 10,
    duration: MENU_TIMING.contentOut,
    stagger: MENU_CONTENT_TIMING.hideStagger,
    ease: 'power2.in',
  });

  return tl;
}

export function killMenuTimelines(...timelines) {
  timelines.forEach((tl) => {
    if (tl?.kill) {
      tl.kill();
    }
  });
}
