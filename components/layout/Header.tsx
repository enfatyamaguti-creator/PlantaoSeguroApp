'use client';

import { usePathname } from 'next/navigation';
import { C } from '@/lib/constants/colors';
import { SECTION_TITLES } from '@/lib/constants/nav';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

function getSectionId(pathname: string): string {
  if (pathname === '/dashboard') return 'dash';
  const segment = pathname.split('/').pop() ?? 'dash';
  if (segment === 'anotacoes') return 'anotacao';
  return segment;
}

export default function Header({ sidebarOpen, onToggle }: HeaderProps) {
  const pathname = usePathname();
  const sectionId = getSectionId(pathname);
  const title = SECTION_TITLES[sectionId] ?? 'Dashboard';

  return (
    <header style={{
      padding: '14px 20px',
      borderBottom: `1px solid ${C.border}`,
      background: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* Hamburger — visível só no mobile via CSS */}
        <button
          className={`hamburger${sidebarOpen ? ' open' : ''}`}
          onClick={onToggle}
          aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 3, height: 22, borderRadius: 2, background: `linear-gradient(180deg,${C.accent},${C.navy})` }} />
          <h1 style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 'clamp(14px, 3vw, 18px)',
            fontWeight: 700, color: C.text, letterSpacing: '-0.2px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Badge de status */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div className="status-badge-pill" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(113,128,150,0.07)', border: '1px solid rgba(113,128,150,0.2)',
          borderRadius: 20, padding: '4px 11px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: C.muted, flexShrink: 0,
          }} />
          <span className="status-label" style={{ fontSize: 11.5, color: C.muted, fontWeight: 600, whiteSpace: 'nowrap' }}>
            Sistema operacional
          </span>
        </div>
      </div>
    </header>
  );
}
