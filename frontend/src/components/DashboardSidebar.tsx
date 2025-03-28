'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DashboardSidebar.module.css';

interface DashboardSidebarProps {
  isExpanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export default function DashboardSidebar({ isExpanded, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      <button 
        className={styles.toggleButton}
        onClick={() => onToggle(!isExpanded)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <div className={styles.navLabel}>Overview</div>
          <Link 
            href="/dashboard" 
            className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12C3 12.5523 3.44772 13 4 13ZM4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21ZM14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20C13 20.5523 13.4477 21 14 21ZM13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14C13.4477 3 13 3.44772 13 4Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {isExpanded && <span>Main Dashboard</span>}
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.navLabel}>Core Dashboards</div>
          <Link 
            href="/dashboard/scope1" 
            className={`${styles.navItem} ${isActive('/dashboard/scope1') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isExpanded && <span>Scope 1 Emissions</span>}
          </Link>

          <Link 
            href="/dashboard/scope2" 
            className={`${styles.navItem} ${isActive('/dashboard/scope2') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isExpanded && <span>Scope 2 Emissions</span>}
          </Link>

          <Link 
            href="/dashboard/scope3" 
            className={`${styles.navItem} ${isActive('/dashboard/scope3') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M20.2426 12C20.2426 16.5563 16.5563 20.2426 12 20.2426C7.44365 20.2426 3.75736 16.5563 3.75736 12C3.75736 7.44365 7.44365 3.75736 12 3.75736C16.5563 3.75736 20.2426 7.44365 20.2426 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {isExpanded && <span>Scope 3 Emissions</span>}
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.navLabel}>Specialized Dashboards</div>
          <Link 
            href="/dashboard/energy" 
            className={`${styles.navItem} ${isActive('/dashboard/energy') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isExpanded && <span>Energy Management</span>}
          </Link>

          <Link 
            href="/dashboard/satellite" 
            className={`${styles.navItem} ${isActive('/dashboard/satellite') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M20.2426 12C20.2426 16.5563 16.5563 20.2426 12 20.2426C7.44365 20.2426 3.75736 16.5563 3.75736 12C3.75736 7.44365 7.44365 3.75736 12 3.75736C16.5563 3.75736 20.2426 7.44365 20.2426 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {isExpanded && <span>Satellite Monitoring</span>}
          </Link>

          <Link 
            href="/dashboard/reports" 
            className={`${styles.navItem} ${isActive('/dashboard/reports') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isExpanded && <span>Reports & Analytics</span>}
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.navLabel}>Tools</div>
          <Link 
            href="/calculator" 
            className={`${styles.navItem} ${isActive('/calculator') ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C15.866 3 19 5.134 19 8V16C19 18.866 15.866 21 12 21C8.134 21 5 18.866 5 16V8C5 5.134 8.134 3 12 3ZM12 5C14.732 5 17 7.268 17 10V14C17 16.732 14.732 19 12 19C9.268 19 7 16.732 7 14V10C7 7.268 9.268 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isExpanded && <span>Carbon Calculator</span>}
          </Link>
        </div>

        <div className={styles.separator} />

        <Link 
          href="/dashboard/settings" 
          className={`${styles.navItem} ${isActive('/dashboard/settings') ? styles.active : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.83L19.79 16.89C20.1656 17.2656 20.3766 17.7646 20.3766 18.285C20.3766 18.8054 20.1656 19.3044 19.79 19.68C19.4144 20.0556 18.9154 20.2666 18.395 20.2666C17.8746 20.2666 17.3756 20.0556 17 19.68L16.94 19.62C16.4478 19.1483 15.7271 19.0177 15.11 19.29C14.5064 19.5414 14.1009 20.1329 14.1 20.79V21C14.1 22.1046 13.2046 23 12.1 23C10.9954 23 10.1 22.1046 10.1 21V20.91C10.0903 20.2327 9.66163 19.6322 9.03 19.39C8.41289 19.1177 7.69217 19.2483 7.2 19.72L7.14 19.78C6.76435 20.1556 6.26539 20.3666 5.745 20.3666C5.22461 20.3666 4.72565 20.1556 4.35 19.78C3.97439 19.4044 3.76339 18.9054 3.76339 18.385C3.76339 17.8646 3.97439 17.3656 4.35 16.99L4.41 16.93C4.88168 16.4378 5.01231 15.7171 4.74 15.1C4.48859 14.4964 3.89708 14.0909 3.24 14.09H3.1C1.99543 14.09 1.1 13.1946 1.1 12.09C1.1 10.9854 1.99543 10.09 3.1 10.09H3.19C3.86726 10.0803 4.46784 9.65157 4.71 9.02C4.98231 8.40289 4.85168 7.68217 4.38 7.19L4.32 7.13C3.94439 6.76435 3.73339 6.26539 3.73339 5.745C3.73339 5.22461 3.94439 4.72565 4.32 4.35C4.69565 3.97439 5.19461 3.76339 5.715 3.76339C6.23539 3.76339 6.73435 3.97439 7.11 4.35L7.17 4.41C7.66217 4.88168 8.38289 5.01231 9 4.74H9.1C9.70359 4.48859 10.1091 3.89708 10.11 3.24V3.1C10.11 1.99543 11.0054 1.1 12.11 1.1C13.2146 1.1 14.11 1.99543 14.11 3.1V3.19C14.1109 3.84708 14.5164 4.43859 15.12 4.69H15.22C15.8371 4.96231 16.5578 4.83168 17.05 4.36L17.11 4.3C17.4856 3.92439 17.9846 3.71339 18.505 3.71339C19.0254 3.71339 19.5244 3.92439 19.9 4.3C20.2756 4.67565 20.4866 5.17461 20.4866 5.695C20.4866 6.21539 20.2756 6.71435 19.9 7.09L19.84 7.15C19.3683 7.64217 19.2377 8.36289 19.51 8.98V9.08C19.7614 9.68359 20.3529 10.0891 21.01 10.09H21.1C22.2046 10.09 23.1 10.9854 23.1 12.09C23.1 13.1946 22.2046 14.09 21.1 14.09H21.01C20.3529 14.0909 19.7614 14.4964 19.51 15.1V15.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isExpanded && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
}