let heroCtaVisible = true;
const listeners = new Set<() => void>();

export function setHeroCtaVisible(visible: boolean) {
  if (visible === heroCtaVisible) return;
  heroCtaVisible = visible;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot() {
  return heroCtaVisible;
}
