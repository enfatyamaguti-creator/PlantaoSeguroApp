import { C } from '@/lib/constants/colors';

interface ErrorBoxProps {
  msg: string;
}

export default function ErrorBox({ msg }: ErrorBoxProps) {
  return (
    <div style={{ background: C.dangerGlow, border: `1px solid ${C.danger}40`, borderRadius: 10, padding: 16, color: C.danger, fontSize: 14 }}>
      {msg}
    </div>
  );
}
