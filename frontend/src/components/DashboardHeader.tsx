'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Image 
              src="/decarbeon-logo.png" 
              alt="Decarbeon" 
              width={120}
              height={32}
              priority 
            />
          </div>
        </div>

        <nav className={styles.nav}>
          <Link href="/dashboard/notifications" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link href="/dashboard/profile" className={styles.profile}>
            <div className={styles.avatar}>
              <Image 
                src="/default-avatar.png" 
                alt="Profile" 
                width={32} 
                height={32}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.name}>John Doe</span>
              <span className={styles.role}>Administrator</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
