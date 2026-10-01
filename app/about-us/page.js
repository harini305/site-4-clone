import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import Counter from '@/components/ui/Counter';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us',
  description: 'Who we are and how we choose the furniture and decor we sell.',
};

const stats = [
  { value: 53, suffix: 'K', label: 'Happy Customers' },
  { value: 10, suffix: 'K', label: 'Orders Delivered' },
  { value: 120, suffix: '', label: 'Design Awards' },
];

const pillars = [
  {
    title: 'Our Product',
    text: 'Every piece is chosen for honest materials, careful finishing and a shape that will still feel right in ten years.',
  },
  {
    title: 'Our Customer',
    text: 'We help you build rooms you love living in — with friendly advice, quick delivery and easy returns.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={`container ${styles.intro}`} aria-labelledby="about-title">
        <Reveal from="left" className={styles.introImage}>
          <Image
            src="/images/about/about-us.jpg"
            alt="Living room with a yellow armchair, brass floor lamp and framed abstract art"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 765px"
            className="img-fallback"
            style={{ objectFit: 'cover' }}
          />
        </Reveal>

        <Reveal from="right" className={styles.introText}>
          <p className={styles.eyebrow}>About our studio</p>
          <h1 id="about-title" className={styles.title}>
            Thoughtful Pieces For Everyday Living
          </h1>
          <p>
            We started as a small team of interior lovers who could never find furniture that was both beautiful and
            built to last. Today we curate collections from independent makers and trusted workshops around the world.
          </p>
          <p>
            From statement armchairs to the smallest decorative dish, everything we sell is something we would happily
            put in our own homes.
          </p>

          <dl className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className={styles.band} aria-labelledby="mission-title">
        <div className="container">
          <div className={styles.bandGrid}>
            <Reveal as="h2" id="mission-title" className={styles.bandTitle}>
              We Are Here To Make Your Home Look More Elegant
            </Reveal>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 * (i + 1)} className={styles.pillar}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.wide}>
            <Image
              src="/images/about/about-2.jpg"
              alt="Beige sofa with grey cushions between large potted plants and wooden side tables"
              fill
              sizes="(max-width: 1440px) 95vw, 1300px"
              className="img-fallback"
              style={{ objectFit: 'cover' }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
