import Link from 'next/link';
import styles from './Button.module.css';

/**
 * variant: 'black' | 'gold' | 'green' | 'teal' | 'outline' | 'text' | 'light'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  href,
  variant = 'black',
  size = 'md',
  block = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${block ? styles.block : ''} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
