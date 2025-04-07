'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DashboardSidebar.module.css';

interface DashboardSidebarProps {
  isExpanded: boolean;
  onToggle: (expanded: boolean) => void;
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isExpanded: boolean;
}

const NavItem: FC<NavItemProps> = ({ href, label, icon, isActive, isExpanded }) => (
  <Link
    href={href}
    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    {isExpanded && <span>{label}</span>}
  </Link>
);

const DashboardSidebar: FC<DashboardSidebarProps> = ({ isExpanded, onToggle }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      <button
        className={styles.toggleButton}
        onClick={() => onToggle(!isExpanded)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <div className={styles.navLabel}>Quick Navigation</div>
          <NavItem
            href="/dashboard"
            label="Dashboard"
            isActive={isActive('/dashboard')}
            isExpanded={isExpanded}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 13h18v8H3v-8zm0-10h18v8H3V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
            <NavItem
              href="/dashboard/energy"
              label="Energy Usage"
              isActive={isActive('/dashboard/energy')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <NavItem
              href="/dashboard/carbon"
              label="Carbon Metrics"
              isActive={isActive('/dashboard/carbon') || isActive('/dashboard/water') || isActive('/dashboard/waste')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <NavItem
              href="/dashboard/water"
              label="Water Management"
              isActive={isActive('/dashboard/water')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <NavItem
              href="/dashboard/waste"
              label="Waste Management"
              isActive={isActive('/dashboard/waste')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <NavItem
              href="/dashboard/goals"
              label="Goal Tracking"
              isActive={isActive('/dashboard/goals')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L19 21l-7-4-7 4L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <NavItem
              href="/dashboard/recommendations"
              label="Recommendations"
              isActive={isActive('/dashboard/recommendations')}
              isExpanded={isExpanded}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
        </div>


      </nav>
    </aside>
  );
};

export default DashboardSidebar;
