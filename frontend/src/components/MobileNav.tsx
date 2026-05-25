// MobileMenu.tsx
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Crear Reporte', href: '/' },
  { label: 'Reportes', href: '/workReports' },
  { label: 'Sitios', href: '/sites' }
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer"
        aria-label="Menú"
      >
        <span
          className={`h-0.5 w-6 bg-primary font-bold transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-primary font-bold transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-primary font-bold transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 p-6 pt-20">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-sm font-medium text-primary hover:font-bold duration-300 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};