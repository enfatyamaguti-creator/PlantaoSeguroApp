'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { C } from '@/lib/constants/colors';
import { createClient } from '@/lib/supabase/client';

// Ao menos 1 caractere que não seja letra, dígito ou espaço
const SPECIAL_RE = /[^a-zA-Z0-9\s]/;

function validatePassword(pwd: string): string | null {
  if (pwd.length < 8)        return 'A senha deve ter ao menos 8 caracteres.';
  if (!SPECIAL_RE.test(pwd)) return 'Inclua ao menos 1 caractere especial (ex: @, #, !).';
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [err,      setErr]      = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const passErr = validatePassword(password);
    if (passErr) { setErr(passErr); return; }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setErr('Email ou senha incorretos.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 60%, ${C.navyLight} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-sans), system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#FFFFFF',
        borderRadius: 20,
        padding: '40px 36px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Image
            src="/logo.png"
            alt="Plantão Seguro"
            width={160}
            height={60}
            style={{ objectFit: 'contain', height: 'auto' }}
            priority
          />
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4, textAlign: 'center' }}>
          Bem-vindo de volta
        </h1>
        <p style={{ fontSize: 13.5, color: C.muted, textAlign: 'center', marginBottom: 28, lineHeight: 1.55 }}>
          Entre com suas credenciais para acessar o sistema.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email */}
          <div>
            <span className="label">Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>

          {/* Senha */}
          <div>
            <span className="label">Senha</span>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mín. 8 caracteres + 1 especial"
                required
                autoComplete="current-password"
                style={{ paddingRight: 46 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: C.muted, padding: 0, lineHeight: 1, width: 'auto',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Erro */}
          {err && (
            <div style={{
              background: `${C.danger}0D`,
              border: `1px solid ${C.danger}40`,
              borderRadius: 9,
              padding: '10px 14px',
              fontSize: 13,
              color: C.danger,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ flexShrink: 0 }}>⚠</span> {err}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-teal"
            style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 14, marginTop: 4 }}
          >
            {loading ? '⏳ Entrando...' : '🔐 Entrar'}
          </button>
        </form>

        {/* Rodapé */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11.5, color: C.dim, textAlign: 'center', lineHeight: 1.6 }}>
            Acesso restrito a assinantes.<br />
            Ainda não tem uma conta?{' '}
            <span style={{ color: C.accent, fontWeight: 600 }}>Adquira sua licença em nosso site.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
