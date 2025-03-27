import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './login.module.css';
import waveStyles from '@/styles/wave.module.css';

interface FormErrors {
  email?: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement password reset logic with backend
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  return (
    <>
      <div className={waveStyles.waveWrapper}>
        <div className={waveStyles.wave1} />
        <div className={waveStyles.wave2} />
        <div className={waveStyles.wave3} />
      </div>
      
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.logo}>
            <Image
              src="/decarbeon-logo.png"
              alt="Decarbeon Logo"
              width={100}
              height={30}
              priority
            />
          </div>

          {!isSubmitted ? (
            <>
              <h2 className={styles.title}>Reset Password</h2>
              <h3 className={styles.subtitle}>
                Enter your email to receive a password reset link
              </h3>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  />
                  <label className={styles.label}>Email</label>
                  {errors.email && (
                    <span className={`${styles.errorMessage} ${styles.visible}`}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <button type="submit" className={styles.button}>
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className={styles.title}>Check Your Email</h2>
              <h3 className={styles.subtitle}>
                If an account exists for {email}, you will receive a password reset link shortly
              </h3>
            </>
          )}

          <p className={styles.footer}>
            Remember your password?{' '}
            <button onClick={() => router.push('/auth/login')} className={styles.footerLink}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
