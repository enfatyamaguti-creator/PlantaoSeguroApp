'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { C } from '@/lib/constants/colors';
import { NAV } from '@/lib/constants/nav';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  const AI_IDS = new Set(['evolucao', 'anotacao', 'exames', 'plantao', 'sae']);

  return (
    <aside
      className={`sidebar${isOpen ? ' sidebar-open' : ''}`}
      style={{
        width: 232, minWidth: 232,
        background: `linear-gradient(180deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        display: 'flex', flexDirection: 'column',
        padding: '0 0 16px',
        boxShadow: '3px 0 16px rgba(0,0,0,0.18)',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px 16px',
        borderBottom: `1px solid ${C.navyBorder}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <Image
          src="/logo.png"
          alt="Plantão Seguro"
          width={160}
          height={60}
          style={{ borderRadius: 12, objectFit: 'contain', height: 'auto' }}
          priority
        />
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, marginTop: 10, padding: '0 10px',
        display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto',
      }}>
        {NAV.map(n => {
          const isAI = AI_IDS.has(n.id);
          return (
            <Link key={n.id} href={n.href} style={{ textDecoration: 'none' }} onClick={onClose}>
              <div className={`nav-item${isActive(n.href) ? ' active' : ''}`}>
                <span style={{ fontSize: 14, opacity: isAI ? 0.4 : isActive(n.href) ? 1 : 0.7, filter: isAI ? 'grayscale(1)' : 'none' }}>{n.icon}</span>
                <span style={{ textDecoration: isAI ? 'line-through' : 'none', opacity: isAI ? 0.5 : 1 }}>{n.label}</span>
                {isAI && <span style={{ marginLeft: 4, fontSize: 12 }}>🚧</span>}
                {isActive(n.href) && !isAI && (
                  <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: C.accent }} />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{
        margin: '12px 10px 0', padding: '12px', borderRadius: 10,
        background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.navyBorder}`,
        display: 'flex', alignItems: 'center', gap: 9,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: `linear-gradient(135deg, ${C.accent}, #007A6E)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
        }}>👩‍⚕️</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Usuário
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Enfermagem</div>
        </div>
        <div style={{
          fontSize: 9.5, fontWeight: 700,
          background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)',
          color: C.gold, padding: '2px 7px', borderRadius: 5, letterSpacing: '0.5px',
        }}>BETA</div>
      </div>
    </aside>
  );
}
