import Link from 'next/link';
import styles from './styles.module.css';

export default function Button({
  type = 'primary',
  size = 'default',
  children,
  onClick,
  href
}) {
  const classNames = `${styles.button} ${styles[type]} ${styles[size]}`;

  return href ? (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={classNames}>
      {children}
    </button>
  );
}
