'use client';

import { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { C } from '@/lib/constants/colors';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggle = useCallback(() => setSidebarOpen(v => !v), []);
  const close  = useCallback(() => setSidebarOpen(false), []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, overflow: 'hidden' }}>
      {/* Overlay mobile — fecha sidebar ao clicar fora */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <Sidebar isOpen={sidebarOpen} onClose={close} />

      <div
        className="dashboard-content"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Header sidebarOpen={sidebarOpen} onToggle={toggle} />
        <main
          className="main-content fadeUp"
          style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
