'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h2>Something went wrong!</h2>
        <p>{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={() => reset()}
          className={styles.resetButton}
        >
          Try again
        </button>
      </div>
    </div>
  );
}