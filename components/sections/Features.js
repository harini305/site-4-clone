import { PiClock, PiShieldCheck, PiTruck, PiHeadphones } from 'react-icons/pi';
import Reveal from '@/components/motion/Reveal';
import { features } from '@/data/home';
import styles from './Features.module.css';

const icons = { clock: PiClock, shield: PiShieldCheck, truck: PiTruck, support: PiHeadphones };

export default function Features() {
  return (
    <section className="container" aria-label="Why shop with us">
      <Reveal as="ul" className={styles.list} stagger={0.12}>
        {features.map((f) => {
          const Icon = icons[f.icon];
          return (
            <li key={f.title} className={styles.item} data-reveal-item>
              <Icon aria-hidden="true" className={styles.icon} />
              <div>
                <h3 className={styles.title}>{f.title}</h3>
                <p className={styles.text}>{f.text}</p>
              </div>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
