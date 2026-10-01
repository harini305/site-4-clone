import Reveal from '@/components/motion/Reveal';
import styles from './SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, id, as: Tag = 'h2', align = 'center' }) {
  return (
    <Reveal className={`${styles.heading} ${styles[align]}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
    </Reveal>
  );
}
