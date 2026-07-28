'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { C } from '@/lib/constants/colors';
import { createClient } from '@/lib/supabase/client';

const SPECIAL_RE = /[^a-zA-Z0-9\s]/;

function validatePassword(pwd: string): string | null {
  if (pwd.length < 8)        return 'A senha deve ter ao menos 8 caracteres.';
  if (!SPECIAL_RE.test(pwd)) return 'Inclua ao menos 1 caractere especial (ex: @, #, !).';
  return null;
}

type Stage = 'validating' | 'ready' | 'done' | 'expired';

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [stage,       setStage]       = useState<Stage>('validating');
  const [password,    setPassword]    = useState('');
  const [confirm,     setConfirm]     = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [err,         setErr]         = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Fluxo PKCE: sessão já estabelecida pelo /auth/callback antes de chegar aqui
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStage('ready');
    });

    // Fallback para fluxo implícito (token no hash processado pelo cliente)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setStage('ready');
    });

    // Se nem sessão nem PASSWORD_RECOVERY em 8s, link é inválido ou expirou
    const timeout = setTimeout(() => {
      setStage(s => s === 'validating' ? 'expired' : s);
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const passErr = validatePassword(password);
    if (passErr) { setErr(passErr); return; }

    if (password !== confirm) {
      setErr('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });

    if (error) {
      setErr('Não foi possível redefinir a senha. O link pode ter expirado.');
      setLoading(false);
      return;
    }

    setStage('done');
    setLoading(false);
    setTimeout(() => router.push('/login'), 3000);
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

        {/* Validando token */}
        {stage === 'validating' && (
          <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{ borderTopColor: C.accent }} />
            <p style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>
              Validando seu link de redefinição...
            </p>
          </div>
        )}

        {/* Link expirado */}
        {stage === 'expired' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 10 }}>
              Link expirado
            </h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65, marginBottom: 24 }}>
              Este link de redefinição é inválido ou expirou. Solicite um novo para continuar.
            </p>
            <Link href="/esqueci-senha" className="btn btn-teal"
              style={{ display: 'inline-flex', justifyContent: 'center', padding: '12px 24px', fontSize: 14, textDecoration: 'none' }}>
              Solicitar novo link
            </Link>
          </div>
        )}

        {/* Formulário */}
        {stage === 'ready' && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8, textAlign: 'center' }}>
              Criar nova senha
            </h1>
            <p style={{ fontSize: 13.5, color: C.muted, textAlign: 'center', marginBottom: 28, lineHeight: 1.55 }}>
              Mínimo 8 caracteres e ao menos 1 especial (@, #, !...).
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span className="label">Nova senha</span>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mín. 8 caracteres + 1 especial"
                    required
                    autoComplete="new-password"
                    style={{ paddingRight: 46 }}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: C.muted, padding: 0, display: 'flex', alignItems: 'center',
                    }}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div>
                <span className="label">Confirmar nova senha</span>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repita a nova senha"
                    required
                    autoComplete="new-password"
                    style={{ paddingRight: 46 }}
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)}
                    aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: C.muted, padding: 0, display: 'flex', alignItems: 'center',
                    }}>
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
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

              <button type="submit" disabled={loading} className="btn btn-teal"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 14, marginTop: 4 }}>
                {loading ? '⏳ Salvando...' : '🔐 Salvar nova senha'}
              </button>
            </form>
          </>
        )}

        {/* Sucesso */}
        {stage === 'done' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 10 }}>
              Senha redefinida!
            </h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65 }}>
              Sua senha foi alterada com sucesso. Redirecionando para o login...
            </p>
          </div>
        )}

        {(stage === 'ready' || stage === 'expired') && (
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <Link href="/login" style={{ fontSize: 13.5, color: C.accent, fontWeight: 600, textDecoration: 'none' }}>
              ← Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
