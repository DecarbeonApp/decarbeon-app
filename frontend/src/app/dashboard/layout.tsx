'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <div className="dashboard-content">
        <DashboardSidebar
          isExpanded={isSidebarExpanded}
          onToggle={setIsSidebarExpanded}
        />
        <main className={`${styles.main} ${isSidebarExpanded ? styles.shifted : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
