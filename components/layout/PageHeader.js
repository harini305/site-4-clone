import styles from './PageHeader.module.css';

export default function PageHeader({ title, id = 'page-title' }) {
  return (
    <div className={styles.header}>
      <h1 id={id} className={styles.title}>
        {title}
      </h1>
    </div>
  );
}
