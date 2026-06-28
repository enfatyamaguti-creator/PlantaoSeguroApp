import { C } from '@/lib/constants/colors';

interface LoaderProps {
  color?: string;
  msg?: string;
  subMsg?: string;
}

export default function Loader({ color = C.accent, msg = 'Analisando...', subMsg }: LoaderProps) {
  return (
    <div className="card fadeUp" style={{ textAlign: 'center', padding: 44 }}>
      <div className="spinner" style={{ borderTopColor: color }} />
      <div style={{ color: C.muted, fontSize: 14 }}>{msg}</div>
      {subMsg && <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>{subMsg}</div>}
    </div>
  );
}
