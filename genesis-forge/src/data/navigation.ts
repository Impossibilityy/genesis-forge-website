export interface NavItem {
  label: string;
  href: string;
  id: string;
}

/** Single-page anchored navigation. `id` matches each section's DOM id (scroll-spy). */
export const navItems: NavItem[] = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'About', href: '#about', id: 'about' },
];

export const ctaItem: NavItem = { label: 'Start a project', href: '#start', id: 'start' };
