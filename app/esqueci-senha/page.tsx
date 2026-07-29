'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { C } from '@/lib/constants/colors';
import { createClient } from '@/lib/supabase/client';

export default function EsqueciSenhaPage() {
  const searchParams = useSearchParams();
  const linkExpirado = searchParams.get('erro') === 'link_expirado';

  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [err,     setErr]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const { error } = await createClient().auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/auth/callback?next=/redefinir-senha` }
    );

    if (error) {
      setErr('Não foi possível enviar o e-mail. Verifique o endereço e tente novamente.');
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 60%, ${C.navyLight} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-sans), system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: '#FFFFFF', borderRadius: 20, padding: '40px 36px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Image src="/logo.png" alt="PlantãoSeguro" width={160} height={60}
            style={{ objectFit: 'contain', height: 'auto' }} priority />
        </div>

        {linkExpirado && !sent && (
          <div style={{
            background: `${C.danger}0D`, border: `1px solid ${C.danger}40`,
            borderRadius: 10, padding: '12px 16px', marginBottom: 20,
            fontSize: 13, color: C.danger, lineHeight: 1.6,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <span style={{ flexShrink: 0, fontSize: 16 }}>⏰</span>
            <span>
              <strong>Link expirado ou já utilizado.</strong><br />
              Solicite um novo link abaixo — ele é válido por 1 hora.
            </span>
          </div>
        )}

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 10 }}>
              Verifique seu e-mail
            </h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 6 }}>
              Enviamos um link para <strong style={{ color: C.text }}>{email}</strong>.
            </p>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
              O link expira em 1 hora. Não esqueça de verificar a pasta de spam.
            </p>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8, textAlign: 'center' }}>
              Esqueceu sua senha?
            </h1>
            <p style={{ fontSize: 13.5, color: C.muted, textAlign: 'center', marginBottom: 28, lineHeight: 1.55 }}>
              Digite o e-mail da sua conta e enviaremos um link para redefinir sua senha.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span className="label">E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              {err && (
                <div style={{
                  background: `${C.danger}0D`, border: `1px solid ${C.danger}40`,
                  borderRadius: 9, padding: '10px 14px', fontSize: 13, color: C.danger,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ flexShrink: 0 }}>⚠</span> {err}
                </div>
              )}

              <button type="submit" disabled={loading || !email.trim()} className="btn btn-teal"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 14, marginTop: 4 }}>
                {loading ? '⏳ Enviando...' : '📧 Enviar link de redefinição'}
              </button>
            </form>
          </>
        )}

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link href="/login" style={{ fontSize: 13.5, color: C.accent, fontWeight: 600, textDecoration: 'none' }}>
            ← Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
