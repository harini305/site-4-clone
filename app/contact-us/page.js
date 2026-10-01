import { PiEnvelopeSimpleFill, PiPhoneFill, PiMapPinFill } from 'react-icons/pi';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/motion/Reveal';
import { site } from '@/data/site';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us',
  description: 'Questions about an order or a product? Get in touch with our team.',
};

const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`;

export default function ContactPage() {
  const cards = [
    {
      icon: PiEnvelopeSimpleFill,
      title: 'Email :',
      lines: [
        { text: site.email, href: `mailto:${site.email}` },
        { text: site.emailAlt, href: `mailto:${site.emailAlt}` },
      ],
    },
    {
      icon: PiPhoneFill,
      title: 'Phone :',
      lines: [
        { text: site.phoneAlt, href: telHref(site.phoneAlt) },
        { text: site.phone, href: telHref(site.phone) },
      ],
    },
    { icon: PiMapPinFill, title: 'Address :', lines: site.address.map((text) => ({ text })) },
  ];

  return (
    <>
      <section className={`container ${styles.top}`} aria-labelledby="contact-title">
        <Reveal from="left" className={styles.intro}>
          <h1 id="contact-title" className={styles.title}>
            Please Get In Touch Let&apos;s Talk
          </h1>
          <p className={styles.lead}>
            Need help choosing the right piece, tracking an order or arranging a return? Send us a message and a
            member of our team will get back to you shortly.
          </p>
        </Reveal>

        <Reveal from="right" className={styles.formCol}>
          <h2 className={styles.formTitle}>Send message</h2>
          <ContactForm />
        </Reveal>
      </section>

      <section className={styles.infoWrap} aria-label="Contact details">
        <div className="container">
          <Reveal as="ul" className={styles.cards} stagger={0.12}>
            {cards.map(({ icon: Icon, title, lines }) => (
              <li key={title} className={styles.card} data-reveal-item>
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                {lines.map((l) =>
                  l.href ? (
                    <a key={l.text} href={l.href} className={styles.line}>
                      {l.text}
                    </a>
                  ) : (
                    <span key={l.text} className={styles.line}>
                      {l.text}
                    </span>
                  )
                )}
              </li>
            ))}
          </Reveal>
        </div>
        <div className={styles.map}>
          <iframe
            title="Store location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-118.45%2C33.93%2C-118.15%2C34.10&amp;layer=mapnik"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </>
  );
}
