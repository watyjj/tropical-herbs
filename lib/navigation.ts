const HEADER_OFFSET = 72;

export function scrollToSection(id: string): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', `#${id}`);
  }
  return true;
}

/** Navigate to a homepage section from any route. */
export function navigateToSection(id: string, pathname: string): void {
  if (pathname === '/') {
    scrollToSection(id);
    return;
  }
  window.location.href = `/#${id}`;
}

export function sectionHref(id: string, pathname: string): string {
  const hash = `#${id}`;
  return pathname === '/' ? hash : `/${hash}`;
}

export { HEADER_OFFSET };
