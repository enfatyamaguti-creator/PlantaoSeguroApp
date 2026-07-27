import type { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'PlantãoSeguro — Assistente Clínico com IA para Enfermeiros',
  description:
    'Potencialize seu raciocínio clínico com IA. Interprete exames, calcule drogas, gere SAE e anotações profissionais. A partir de R$ 9,99/mês.',
  openGraph: {
    title: 'PlantãoSeguro — Assistente Clínico com IA para Enfermeiros',
    description:
      'Potencialize seu raciocínio clínico com IA. Interprete exames, calcule drogas, gere SAE e anotações profissionais.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/logo.png', width: 400, height: 150, alt: 'PlantãoSeguro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlantãoSeguro — Assistente Clínico com IA para Enfermeiros',
    description: 'Potencialize seu raciocínio clínico com IA. A partir de R$ 9,99/mês.',
  },
};

export default function Home() {
  return <LandingPage />;
}
