'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import styles from './AccountView.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_KEY = 'shop-decoration:demo-user';

// Demo-only account area: "signs in" locally so the logged-in dashboard can be reviewed.
// No credentials are sent or stored anywhere except a display name in localStorage.
export default function AccountView() {
  const { cartCount, wishlist, hydrated } = useStore();
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ id: '', password: '', remember: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore demo session after hydration
      if (saved) setUser(saved);
    } catch {
      // ignore
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (mode === 'register' ? !EMAIL_RE.test(form.id.trim()) : !form.id.trim())
      errs.id = mode === 'register' ? 'Please enter a valid email address.' : 'Username or email is required.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const name = form.id.trim().split('@')[0];
    setUser(name);
    try {
      if (form.remember || mode === 'register') localStorage.setItem(SESSION_KEY, name);
    } catch {
      // ignore
    }
    setForm({ id: '', password: '', remember: false });
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  };

  if (user) {
    return (
      <div className={styles.dashboard}>
        <nav className={styles.side} aria-label="Account">
          <ul>
            <li>
              <span className={styles.current}>Dashboard</span>
            </li>
            <li>
              <Link href="/cart">Cart ({hydrated ? cartCount : 0})</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist ({hydrated ? wishlist.length : 0})</Link>
            </li>
            <li>
              <button type="button" onClick={logout}>
                Log out
              </button>
            </li>
          </ul>
        </nav>
        <div>
          <p>
            Hello <strong>{user}</strong> (not {user}?{' '}
            <button type="button" className={styles.inlineLink} onClick={logout}>
              Log out
            </button>
            )
          </p>
          <p>
            From your account dashboard you can view your <Link href="/cart">cart</Link>, manage your{' '}
            <Link href="/wishlist">wishlist</Link> and continue <Link href="/shop">shopping</Link>.
          </p>
          <p className="demo-note">Demo account — sign-in is simulated in this browser only.</p>
        </div>
      </div>
    );
  }

  const isLogin = mode === 'login';

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h1>
      <p className="demo-note">Demo only — there is no real account system. Don&apos;t use a real password.</p>

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="acc-id">
            {isLogin ? 'Username or email address' : 'Email address'} <span className="req">*</span>
          </label>
          <input
            id="acc-id"
            className="input"
            type={isLogin ? 'text' : 'email'}
            autoComplete={isLogin ? 'username' : 'email'}
            value={form.id}
            onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
            aria-invalid={Boolean(errors.id)}
            aria-describedby={errors.id ? 'acc-id-err' : undefined}
          />
          {errors.id && (
            <p id="acc-id-err" className="field-error">
              {errors.id}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="acc-pass">
            Password <span className="req">*</span>
          </label>
          <input
            id="acc-pass"
            className="input"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'acc-pass-err' : undefined}
          />
          {errors.password && (
            <p id="acc-pass-err" className="field-error">
              {errors.password}
            </p>
          )}
        </div>
        {isLogin && (
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
            />
            Remember me
          </label>
        )}
        <button type="submit" className={styles.submit}>
          {isLogin ? 'Log in' : 'Register'}
        </button>
      </form>

      <p className={styles.switch}>
        {isLogin ? 'New here? ' : 'Already have an account? '}
        <button
          type="button"
          onClick={() => {
            setMode(isLogin ? 'register' : 'login');
            setErrors({});
          }}
        >
          {isLogin ? 'Create an account' : 'Log in'}
        </button>
      </p>
    </div>
  );
}
