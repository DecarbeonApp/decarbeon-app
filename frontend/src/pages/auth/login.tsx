import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './login.module.css';
import waveStyles from '@/styles/wave.module.css';

interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Redirect to sustainability metrics calculator after successful login
      router.push('/sustainability-metrics');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
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

          <h2 className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <h3 className={styles.subtitle}>
            {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
          </h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                />
                <label className={styles.label}>Full Name</label>
                {errors.name && (
                  <span className={`${styles.errorMessage} ${styles.visible}`}>
                    {errors.name}
                  </span>
                )}
              </div>
            )}

            <div className={styles.inputGroup}>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
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

            <div className={styles.inputGroup}>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
              />
              <label className={styles.label}>Password</label>
              {errors.password && (
                <span className={`${styles.errorMessage} ${styles.visible}`}>
                  {errors.password}
                </span>
              )}
            </div>

            {!isLogin && (
              <div className={styles.inputGroup}>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  className={`${styles.input} ${
                    errors.confirmPassword ? styles.error : ''
                  }`}
                />
                <label className={styles.label}>Confirm Password</label>
                {errors.confirmPassword && (
                  <span className={`${styles.errorMessage} ${styles.visible}`}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            )}

            <button type="submit" className={styles.button}>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          {isLogin && (
            <a href="/auth/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </a>
          )}

          <p className={styles.footer}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={toggleForm} className={styles.footerLink}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
