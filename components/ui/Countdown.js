'use client';

import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

// Counts down to the end of the visitor's current day ("deal of the day").
function remaining() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  let s = Math.max(0, Math.floor((end - now) / 1000));
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const minutes = Math.floor(s / 60);
  return { days, hours, minutes, seconds: s - minutes * 60 };
}

const labels = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

export default function Countdown() {
  // Render zeros on the server, then start ticking after mount (avoids hydration mismatch).
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => setTime(remaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={styles.countdown}
      role="timer"
      aria-label={`Deal ends in ${time.hours} hours ${time.minutes} minutes`}
    >
      {labels.map(([key, label]) => (
        <div key={key} className={styles.unit} aria-hidden="true">
          <span className={styles.value}>{String(time[key]).padStart(key === 'days' ? 1 : 2, '0')}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
