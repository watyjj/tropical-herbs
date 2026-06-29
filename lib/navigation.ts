const HEADER_OFFSET = 80;

export function scrollToSection(id: string, offset = HEADER_OFFSET): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

/** Navigate to a homepage section from any route. */
export function navigateToSection(id: string, pathname: string): void {
  const hash = `#${id}`;
  if (pathname === '/') {
    scrollToSection(id);
    return;
  }
  window.location.href = `/${hash}`;
}

export function sectionHref(id: string, pathname: string): string {
  const hash = `#${id}`;
  return pathname === '/' ? hash : `/${hash}`;
}
