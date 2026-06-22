import { C } from '@/lib/constants/colors';

interface LoaderProps {
  color?: string;
  msg?: string;
}

export default function Loader({ color = C.accent, msg = 'Analisando...' }: LoaderProps) {
  return (
    <div className="card fadeUp" style={{ textAlign: 'center', padding: 44 }}>
      <div className="spinner" style={{ borderTopColor: color }} />
      <div style={{ color: C.muted, fontSize: 14 }}>{msg}</div>
    </div>
  );
}
