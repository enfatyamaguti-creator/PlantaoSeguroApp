'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const NAVY      = '#0D2D5E';
const NAVY_DARK = '#081D3E';
const NAVY_LT   = '#1A3E6E';
const TEAL      = '#00A896';
const TEAL_DK   = '#008F7E';
const GOLD      = '#C9A84C';
const BG        = '#F0F4F8';
const SURFACE   = '#FFFFFF';
const TEXT      = '#1A202C';
const MUTED     = '#718096';
const BORDER    = '#E2E8F0';
const OK        = '#276749';

const PM  = process.env.NEXT_PUBLIC_PRICE_MONTHLY        ?? '9,99';
const PA  = process.env.NEXT_PUBLIC_PRICE_ANNUAL         ?? '100,00';
const PAM = process.env.NEXT_PUBLIC_PRICE_ANNUAL_MONTHLY ?? '8,33';
const KM  = process.env.NEXT_PUBLIC_KIWIFY_URL_MONTHLY   ?? '#planos';
const KA  = process.env.NEXT_PUBLIC_KIWIFY_URL_ANNUAL    ?? '#planos';

const FEATURES = [
  { icon: '🧪', title: 'Interpretação de Exames',  desc: 'Entenda qualquer resultado laboratorial com conduta clínica incluída — potássio, gasometria, INR e mais' },
  { icon: '📊', title: 'Escalas Clínicas',          desc: 'RASS, Glasgow, Braden, MORSE, Aldrete e outras — com interpretação automática e raciocínio clínico' },
  { icon: '💊', title: 'Drogas Vasoativas',         desc: 'Protocolos de noradrenalina, dobutamina e outras vasoativas sem depender de memória no momento crítico' },
  { icon: '📋', title: 'SAE Automatizada',          desc: 'Diagnósticos de enfermagem, resultados esperados e intervenções baseadas em evidências em segundos' },
  { icon: '📝', title: 'Anotação de Enfermagem',    desc: 'Documentação técnica profissional em linguagem COFEN — sem travar na hora de escrever' },
  { icon: '🔬', title: 'Evolução SOAP',             desc: 'Evoluções de enfermagem padronizadas e profissionais para qualquer especialidade' },
  { icon: '🏥', title: 'Protocolos Clínicos',       desc: 'Principais protocolos de UTI e urgência ao alcance do dedo — consultável em segundos' },
  { icon: '🩸', title: 'Hemograma Completo',        desc: 'Análise de todas as séries com raciocínio hematológico e condutas práticas imediatas' },
];

const PAINS = [
  'Ficou sozinho(a) com um paciente instável e travou sem saber a conduta correta',
  'Precisou interpretar um exame às 3h da manhã sem ninguém experiente por perto',
  'Perdeu horas tentando montar o SAE sem lembrar dos diagnósticos de enfermagem',
  'Duvidou do seu próprio raciocínio num momento crítico e sentiu insegurança',
  'Precisou improvisar uma anotação porque não lembrava a linguagem técnica certa',
  'Sentiu que sua formação não foi suficiente para a complexidade do plantão real',
];

const STEPS = [
  { n: '01', icon: '📲', title: 'Acesse de qualquer lugar',  desc: 'Funciona no celular, tablet e computador. Sem instalação — basta internet.' },
  { n: '02', icon: '⌨️', title: 'Descreva a situação',       desc: 'Digite o exame, a escala, o diagnóstico ou a dúvida em linguagem natural.' },
  { n: '03', icon: '⚡', title: 'Receba a resposta clínica', desc: 'Em segundos: interpretação, condutas de enfermagem e raciocínio clínico completo.' },
];

const TESTIMONIALS = [
  {
    text: '[INSERIR DEPOIMENTO REAL — ex: "O PlantãoSeguro mudou completamente como eu me sinto nos plantões. Antes eu travava em qualquer exame alterado. Agora tenho segurança para agir rápido e certo."]',
    name: '[INSERIR NOME]', role: 'Enfermeira · UTI Adulto',
  },
  {
    text: '[INSERIR DEPOIMENTO REAL — ex: "Consigo fazer anotações profissionais, consultar protocolos e entender os exames dos meus pacientes. Economizo horas por semana e trabalho muito mais tranquilo."]',
    name: '[INSERIR NOME]', role: 'Técnico de Enfermagem · Pronto Atendimento',
  },
  {
    text: '[INSERIR DEPOIMENTO REAL — ex: "O SAE que antes me tomava 40 minutos agora fica pronto em 5, com muito mais qualidade técnica. Indico para todos os colegas de plantão."]',
    name: '[INSERIR NOME]', role: 'Enfermeira · UTI Neonatal',
  },
];

const FAQS = [
  { q: 'Preciso ter graduação em enfermagem para usar?',
    a: 'Não. O PlantãoSeguro foi desenvolvido para todos os profissionais de enfermagem — enfermeiros(as) e técnicos(as). O conteúdo é organizado para diferentes níveis de complexidade.' },
  { q: 'Como funciona o pagamento?',
    a: 'O pagamento é processado com segurança pela Kiwify. Você pode pagar com cartão de crédito, débito ou Pix. O acesso é liberado imediatamente após a confirmação.' },
  { q: 'E se eu não gostar? Posso cancelar?',
    a: 'Sim. Você tem 7 dias de garantia completa, sem burocracia e sem perguntas. Se não ficar satisfeito(a), basta solicitar o reembolso dentro do prazo e devolvemos 100% do valor.' },
  { q: 'O PlantãoSeguro substitui o meu conhecimento clínico?',
    a: 'Não — e nem pretende. O PlantãoSeguro é um potencializador do seu raciocínio clínico. Ele ajuda você a organizar o raciocínio, lembrar condutas e documentar com qualidade. A decisão clínica final é sempre sua, com responsabilidade ética e legal do profissional.' },
  { q: 'Funciona sem internet?',
    a: 'Não. O PlantãoSeguro é uma plataforma online e requer conexão com a internet, pois utiliza inteligência artificial em tempo real para gerar as respostas clínicas.' },
  { q: 'Tem certificado de conclusão?',
    a: 'Não. O PlantãoSeguro é uma ferramenta assistiva clínica, não um curso. Ele potencializa sua atuação no plantão — não substitui formações, especializações ou certificações profissionais.' },
  { q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem multas e sem burocracia. Você cancela com poucos cliques e seu acesso permanece ativo até o final do período já pago.' },
  { q: `Qual a diferença entre o plano mensal e o anual?`,
    a: `No plano mensal você paga R$ ${PM}/mês. No plano anual você paga R$ ${PA} à vista (ou parcelado em até 12x no cartão), o equivalente a R$ ${PAM}/mês — uma economia de quase 17% comparado ao mensal.` },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y < 10) {
        setHeaderHidden(false);
      } else if (y > lastScrollY.current) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastScrollY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif', color: TEXT, overflowX: 'hidden' }}>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────── */}
      <div className="lp-mobile-cta" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: NAVY_DARK, borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 16px 20px',
        display: 'flex', gap: 10,
      }}>
        <a href={KM} style={{
          flex: 1, display: 'block', background: TEAL, color: '#fff',
          textAlign: 'center', padding: '14px 12px', borderRadius: 10,
          fontWeight: 800, fontSize: 14.5, textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0,168,150,0.45)',
        }}>
          Começar por R$ {PM}/mês
        </a>
      </div>

      {/* ─── HEADER ────────────────────────────────────────── */}
      {/* Spacer para compensar o header fixed */}
      <div style={{ height: 62 }} />
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
        background: 'rgba(8,29,62,0.97)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="/logoHorizontal.png" alt="PlantãoSeguro" width={140} height={42} style={{ objectFit: 'contain', height: 'auto', borderRadius: 8 }} priority />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="/login" className="lp-nav-link" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}>
              Entrar
            </a>
            <a href={KM} className="lp-nav-cta" style={{
              background: TEAL, color: '#fff', padding: '9px 22px',
              borderRadius: 8, fontWeight: 700, fontSize: 13.5, textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(0,168,150,0.38)',
            }}>
              Começar agora
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(140deg, ${NAVY_DARK} 0%, ${NAVY} 55%, #0F3D72 100%)`,
        padding: 'clamp(72px,11vw,130px) 24px clamp(64px,9vw,110px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(0,168,150,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -80, width: 380, height: 380, borderRadius: '50%', background: 'rgba(201,168,76,0.05)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,168,150,0.14)', border: '1px solid rgba(0,168,150,0.32)',
            borderRadius: 30, padding: '6px 18px', marginBottom: 30,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: TEAL, display: 'inline-block', boxShadow: `0 0 6px ${TEAL}` }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Inteligência Artificial para Enfermagem
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(34px,5.8vw,62px)', fontWeight: 900, color: '#FFFFFF',
            lineHeight: 1.1, marginBottom: 22, letterSpacing: '-0.022em',
          }}>
            Nunca mais trave<br />
            <span style={{ color: TEAL }}>num plantão difícil.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px,2.1vw,20px)', color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.68, maxWidth: 620, margin: '0 auto 42px',
          }}>
            IA especializada em enfermagem que interpreta exames, calcula drogas, gera SAE e potencializa seu raciocínio clínico — disponível em qualquer plantão.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <a href={KM} style={{
              display: 'inline-block', background: TEAL, color: '#fff',
              padding: '17px 44px', borderRadius: 13, fontWeight: 800, fontSize: 17.5,
              textDecoration: 'none', boxShadow: '0 10px 28px rgba(0,168,150,0.48)',
              letterSpacing: '0.01em',
            }}>
              Começar por R$ {PM}/mês →
            </a>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Acesso imediato · 7 dias de garantia · Cancele quando quiser
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 48 }}>
            {[
              { icon: '🔒', text: 'Pagamento seguro via Kiwify' },
              { icon: '✅', text: 'Acesso imediato' },
              { icon: '🛡️', text: '7 dias de garantia' },
              { icon: '📱', text: 'Funciona no celular' },
            ].map(b => (
              <div key={b.text} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)',
                borderRadius: 8, padding: '8px 14px', fontSize: 12.5, color: 'rgba(255,255,255,0.72)',
              }}>
                <span>{b.icon}</span><span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOR ───────────────────────────────────────────── */}
      <section style={{ background: BG, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, textAlign: 'center' }}>
            Você se identifica com isso?
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, marginBottom: 14, textAlign: 'center' }}>
            O plantão pode ser o lugar mais solitário do mundo
          </h2>
          <p style={{ fontSize: 15.5, color: MUTED, textAlign: 'center', marginBottom: 44, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 44px' }}>
            Decisões rápidas, pacientes instáveis e — muitas vezes — ninguém experiente do seu lado. Você já passou por alguma dessas situações?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PAINS.map((pain, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                background: SURFACE, border: `1px solid ${BORDER}`,
                borderRadius: 12, padding: '15px 20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(229,62,62,0.1)', border: '1.5px solid rgba(229,62,62,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: '#E53E3E', marginTop: 1,
                }}>✕</div>
                <p style={{ fontSize: 14.5, color: TEXT, lineHeight: 1.6, margin: 0 }}>{pain}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: `linear-gradient(135deg, rgba(13,45,94,0.05), rgba(0,168,150,0.06))`,
            border: `1.5px solid rgba(0,168,150,0.28)`,
            borderRadius: 14, padding: '22px 28px', marginTop: 36, textAlign: 'center',
          }}>
            <p style={{ fontSize: 16.5, color: NAVY, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
              Isso não é falta de capacidade.{' '}
              <span style={{ color: TEAL }}>É falta de suporte — e é exatamente isso que o PlantãoSeguro resolve.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─────────────────────────────────── */}
      <section style={{ background: SURFACE, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            A solução
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, marginBottom: 14 }}>
            Seu assistente clínico em cada plantão
          </h2>
          <p style={{ fontSize: 15.5, color: MUTED, maxWidth: 560, margin: '0 auto 54px', lineHeight: 1.7 }}>
            O PlantãoSeguro coloca IA especializada em enfermagem na palma da sua mão — para você consultar, conferir e agir com muito mais segurança.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 22 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{
                background: BG, border: `1px solid ${BORDER}`,
                borderRadius: 16, padding: '30px 24px 26px', textAlign: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `rgba(0,168,150,0.1)`, border: `1px solid rgba(0,168,150,0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, margin: '0 auto 16px',
                }}>{s.icon}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: TEAL, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Passo {s.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────── */}
      <section style={{ background: BG, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
              O que está incluso
            </p>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, marginBottom: 12 }}>
              8 ferramentas clínicas num único lugar
            </h2>
            <p style={{ fontSize: 15.5, color: MUTED, maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
              Tudo que você precisa para o plantão — organizado, rápido e fácil de usar.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(218px,1fr))', gap: 16 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14,
                padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 11, fontSize: 20,
                  background: 'rgba(0,168,150,0.09)', border: '1px solid rgba(0,168,150,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: NAVY, marginBottom: 5 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.58 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUTORIDADE ────────────────────────────────────── */}
      {/* <section style={{ background: SURFACE, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            Quem está por trás
          </p>
          <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: NAVY, lineHeight: 1.22, marginBottom: 36 }}>
            Desenvolvido por quem conhece o plantão por dentro
          </h2>

          <div style={{
            background: `linear-gradient(135deg, rgba(13,45,94,0.04), rgba(201,168,76,0.07))`,
            border: `1px solid rgba(201,168,76,0.25)`,
            borderRadius: 22, padding: 'clamp(28px,5vw,44px) clamp(24px,5vw,44px)',
          }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%', margin: '0 auto 20px',
              background: `${NAVY}12`, border: `2px solid ${GOLD}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36,
            }}>👤</div>

            <div style={{
              display: 'inline-block', background: `${GOLD}16`, border: `1px solid ${GOLD}40`,
              borderRadius: 6, padding: '4px 14px', fontSize: 11.5, color: GOLD, fontWeight: 700,
              marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              [INSERIR CREDENCIAL — ex: COREN-SP 12345 · Especialista em UTI]
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>
              [INSERIR NOME DO FUNDADOR / EQUIPE]
            </h3>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.78, maxWidth: 580, margin: '0 auto 32px' }}>
              [INSERIR BIO — ex: "Enfermeiro intensivista com mais de X anos de experiência em UTI adulto e pediátrico. Criou o PlantãoSeguro após perceber que a insegurança clínica era o principal obstáculo dos profissionais de enfermagem brasileiros no plantão."]
            </p>

            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
              {[
                { n: '[X]+', label: 'anos de experiência clínica' },
                { n: '[X]+', label: 'profissionais impactados' },
                { n: '[X]+', label: 'plantões de UTI' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: NAVY, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{s.n}</div>
                  <div style={{ fontSize: 12.5, color: MUTED, marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ─── DEPOIMENTOS ───────────────────────────────────── */}
      {/* <section style={{ background: BG, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
              O que dizem os usuários
            </p>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: NAVY, lineHeight: 1.2 }}>
              Profissionais que transformaram seus plantões
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(278px,1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18,
                padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 16,
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[...Array(5)].map((_, s) => <span key={s} style={{ fontSize: 16, color: GOLD }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.75, fontStyle: 'italic', flex: 1, margin: 0 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', fontSize: 16,
                    background: `${NAVY}12`, border: `1.5px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: NAVY,
                  }}>?</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── PREÇO ─────────────────────────────────────────── */}
      <section id="planos" style={{ background: SURFACE, padding: 'clamp(64px,9vw,104px) 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            Planos e preços
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, marginBottom: 12 }}>
            Menos do que um almoço por mês
          </h2>
          <p style={{ fontSize: 15.5, color: MUTED, maxWidth: 460, margin: '0 auto 52px', lineHeight: 1.65 }}>
            Segurança clínica profissional que cabe no seu orçamento.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(278px,1fr))', gap: 22, alignItems: 'start' }}>

            {/* Plano Mensal */}
            <div style={{
              background: BG, border: `1.5px solid ${BORDER}`, borderRadius: 20, padding: '32px 28px',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: MUTED, marginBottom: 12 }}>Plano Mensal</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: MUTED }}>R$</span>
                <span style={{ fontSize: 54, fontWeight: 900, color: NAVY, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{PM}</span>
                <span style={{ fontSize: 15, color: MUTED }}>/mês</span>
              </div>
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 28 }}>Cobrado mensalmente</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, textAlign: 'left' }}>
                {['Acesso completo às 8 ferramentas', 'Atualizações automáticas', 'Suporte por WhatsApp', 'Cancele quando quiser'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: TEXT }}>
                    <span style={{ color: TEAL, fontSize: 15, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
              <a href={KM} style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                background: SURFACE, color: NAVY, border: `2px solid ${NAVY}22`,
                borderRadius: 10, padding: '14px 20px', fontWeight: 700, fontSize: 15,
              }}>
                Assinar plano mensal
              </a>
            </div>

            {/* Plano Anual — destaque */}
            <div style={{
              background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY_LT} 100%)`,
              border: `2px solid rgba(0,168,150,0.38)`,
              borderRadius: 20, padding: '32px 28px', position: 'relative',
              boxShadow: '0 14px 40px rgba(13,45,94,0.28)',
            }}>
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: GOLD, color: '#fff', borderRadius: 20, padding: '5px 20px',
                fontSize: 11.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(201,168,76,0.4)',
              }}>⭐ Melhor valor</div>

              <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Plano Anual</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>R$</span>
                <span style={{ fontSize: 54, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{PAM}</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>/mês</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                R$ {PA}/ano · parcelável em até 12x
              </p>
              <div style={{
                display: 'inline-block', background: 'rgba(0,168,150,0.2)', border: '1px solid rgba(0,168,150,0.38)',
                borderRadius: 6, padding: '3px 12px', fontSize: 12, color: TEAL, fontWeight: 700, marginBottom: 26,
              }}>Economia de ~17%</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, textAlign: 'left' }}>
                {['Acesso completo às 8 ferramentas', 'Atualizações automáticas', 'Suporte prioritário por WhatsApp', 'Cancele quando quiser', 'Melhor custo-benefício'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.82)' }}>
                    <span style={{ color: TEAL, fontSize: 15, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
              <a href={KA} style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                background: TEAL, color: '#fff', borderRadius: 10, padding: '15px 20px',
                fontWeight: 800, fontSize: 15, boxShadow: '0 4px 16px rgba(0,168,150,0.42)',
              }}>
                Assinar plano anual →
              </a>
            </div>
          </div>

          {/* Garantia */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
            marginTop: 36, padding: '16px 28px',
            background: 'rgba(39,103,73,0.07)', border: `1px solid rgba(39,103,73,0.22)`,
            borderRadius: 14, textAlign: 'left',
          }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>🛡️</span>
            <p style={{ fontSize: 14, color: OK, margin: 0, lineHeight: 1.6 }}>
              <strong>Garantia incondicional de 7 dias.</strong> Se não ficar satisfeito(a), devolvemos 100% do valor pago — sem perguntas e sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section style={{ background: BG, padding: 'clamp(64px,9vw,100px) 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
              Dúvidas frequentes
            </p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: NAVY, lineHeight: 1.22 }}>
              Respostas para o que você está pensando
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: SURFACE, borderRadius: 13, overflow: 'hidden',
                border: `1px solid ${openFaq === i ? TEAL + '45' : BORDER}`,
                transition: 'border-color 0.2s',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '17px 22px', background: 'none', border: 'none', cursor: 'pointer', gap: 16,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{
                    fontSize: 22, color: TEAL, flexShrink: 0, display: 'inline-block',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.22s',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 20px', borderTop: `1px solid ${BORDER}` }}>
                    <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.78, margin: '14px 0 0' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(140deg, ${NAVY_DARK} 0%, ${NAVY} 60%, #0F3D72 100%)`,
        padding: 'clamp(64px,9vw,110px) 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 44, marginBottom: 20 }}>🏥</div>
          <h2 style={{ fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 900, color: '#fff', lineHeight: 1.13, marginBottom: 18, letterSpacing: '-0.015em' }}>
            Comece hoje a agir com mais<br />segurança em cada plantão
          </h2>
          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.68)', marginBottom: 40, lineHeight: 1.68, maxWidth: 500, margin: '0 auto 40px' }}>
            Junte-se aos profissionais de enfermagem que já transformaram seus plantões com o PlantãoSeguro.
          </p>
          <a href={KM} style={{
            display: 'inline-block', background: TEAL, color: '#fff',
            padding: '18px 48px', borderRadius: 13, fontWeight: 800, fontSize: 18,
            textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,168,150,0.52)',
            marginBottom: 22,
          }}>
            Começar agora por R$ {PM}/mês →
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
            {['✓ 7 dias de garantia', '✓ Cancele quando quiser', '✓ Acesso imediato'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer style={{ background: NAVY_DARK, padding: 'clamp(36px,6vw,52px) 24px clamp(44px,7vw,70px)', color: 'rgba(255,255,255,0.4)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 36, marginBottom: 36 }}>
            <div style={{ maxWidth: 280 }}>
              <Image src="/logo.png" alt="PlantãoSeguro" width={130} height={40} style={{ objectFit: 'contain', height: 'auto', marginBottom: 14, opacity: 0.82 }} />
              <p style={{ fontSize: 13, lineHeight: 1.72, margin: 0 }}>
                Assistente clínico com IA para profissionais de enfermagem. Potencializando o raciocínio clínico em cada plantão.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 44 }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>Produto</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  <a href="#planos" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Planos</a>
                  <a href={KM} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Assinar</a>
                  <a href="/login" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Entrar</a>
                </div>
              </div>
              {/* <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>Legal</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Política de Privacidade</a>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Termos de Uso</a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>Contato</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  <a href="mailto:[INSERIR EMAIL]" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>[INSERIR EMAIL]</a>
                  <a href="https://wa.me/[NUMERO]" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>WhatsApp</a>
                </div>
              </div> */}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontSize: 12 }}>
            <span>© {new Date().getFullYear()} PlantãoSeguro. Todos os direitos reservados.</span>
            {/* <span>[INSERIR CNPJ] · [INSERIR RAZÃO SOCIAL]</span> */}
          </div>
        </div>
      </footer>

      {/* Estilos específicos da landing page */}
      <style>{`
        .lp-mobile-cta  { display: none !important; }
        .lp-nav-link    { display: flex; }
        .lp-nav-cta     { display: inline-block; }

        @media (max-width: 768px) {
          .lp-mobile-cta { display: flex !important; }
          .lp-nav-cta    { display: none !important; }
          body           { padding-bottom: 76px; }
        }
      `}</style>
    </div>
  );
}
