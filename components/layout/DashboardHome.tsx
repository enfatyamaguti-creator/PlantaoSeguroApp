'use client';

import Link from 'next/link';
import { C } from '@/lib/constants/colors';

const quickCards = [
  { href: '/dashboard/exames',     icon: '🧪', title: 'Interpretar Exame',  desc: 'K+, Na+, Gasometria e mais',           accent: C.accent  },
  { href: '/dashboard/plantao',    icon: '🚨', title: 'Modo Plantão',       desc: 'Paciente instável? Resposta imediata',  accent: C.danger  },
  { href: '/dashboard/protocolos', icon: '📋', title: 'Protocolos Rápidos', desc: 'Sepse, PCR, AVC, PAV, LPP',            accent: C.warn    },
  { href: '/dashboard/evolucao',   icon: '✍️', title: 'Gerar Evolução',     desc: 'Evolução assistida por IA',            accent: C.purple  },
];

export default function DashboardHome() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        borderRadius: 16, padding: '22px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11.5, color: C.accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 7 }}>
            ✦ Bem-vinda de volta
          </div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 7, color: '#FFFFFF' }}>
            Plantão Seguro 👋
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 420, lineHeight: 1.6 }}>
            Seu assistente clínico está pronto. Raciocínio clínico + IA para o plantão mais seguro.
          </p>
        </div>
      </div>

      {/* Acesso rápido */}
      <div>
        <span className="section-label" style={{ color: C.muted }}>Acesso rápido</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {quickCards.map(c => (
            <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
              <div
                className="quick-card"
                style={{ color: C.text }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = c.accent + '55';
                  (e.currentTarget as HTMLElement).style.background = C.cardHover;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.border;
                  (e.currentTarget as HTMLElement).style.background = C.card;
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 13,
                  background: c.accent + '18', border: `1px solid ${c.accent}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</div>
                  <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>{c.desc}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: C.dim, fontSize: 18 }}>›</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Nota */}
      <div className="card" style={{ borderColor: `${C.gold}30`, background: `linear-gradient(135deg, ${C.card}, ${C.goldGlow})` }}>
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          ⭐ Nota da equipe
        </div>
        <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontStyle: 'italic' }}>
          &ldquo;O PlantãoSeguro é o assistente que eu gostaria de ter tido nos meus primeiros anos de UTI.
          Use com raciocínio clínico — ele potencializa o seu, não substitui.&rdquo;
        </p>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 8 }}>— Equipe PlantãoSeguro</div>
      </div>
    </div>
  );
}
