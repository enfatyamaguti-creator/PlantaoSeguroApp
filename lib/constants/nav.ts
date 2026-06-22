export const NAV = [
  { id: 'dash', icon: '⚡', label: 'Dashboard', href: '/dashboard' },
  { id: 'drogas', icon: '💊', label: 'Drogas UTI', href: '/dashboard/drogas' },
  { id: 'escalas', icon: '📊', label: 'Escalas', href: '/dashboard/escalas' },
  { id: 'lesoes', icon: '🩹', label: 'Lesões', href: '/dashboard/lesoes' },
  { id: 'protocolos', icon: '📋', label: 'Protocolos', href: '/dashboard/protocolos' },
  { id: 'evolucao', icon: '✍️', label: 'Evolução', href: '/dashboard/evolucao' },
  { id: 'anotacao', icon: '📝', label: 'Anotação', href: '/dashboard/anotacoes' },
  { id: 'exames', icon: '🧪', label: 'Exames', href: '/dashboard/exames' },
  { id: 'plantao', icon: '🚨', label: 'Modo Plantão', href: '/dashboard/plantao' },
  { id: 'sae', icon: '🧬', label: 'SAE Inteligente', href: '/dashboard/sae' },
] as const;

export type NavId = typeof NAV[number]['id'];

export const SECTION_TITLES: Record<string, string> = {
  dash: 'Dashboard',
  exames: 'Interpretação de Exames 🧪',
  plantao: 'Modo Plantão 🚨',
  protocolos: 'Protocolos Rápidos 📋',
  lesoes: 'Lesões e Coberturas 🩹',
  escalas: 'Escalas Assistenciais 📊',
  drogas: 'Drogas na UTI 💊',
  sae: 'SAE Inteligente 🧬',
  evolucao: 'Evolução de Enfermagem ✍️',
  anotacao: 'Anotação de Enfermagem 📝',
};
