import Link from 'next/link';
import Script from 'next/script';
import styles from './page.module.css';
import { getProfileData } from '@/lib/profile';

const profile = getProfileData();

const contactIcons = {
  email: (
    <svg viewBox="0 0 24 24" className={styles.contactIcon}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className={styles.contactIcon}>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className={styles.contactIcon}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.3 3.3 0 0 0-3.3-3.3c-.9 0-1.7.3-2.2.9v-.9h-2.5v8.6h2.5v-4.8c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v4.8h2.5M6.9 8.3A1.6 1.6 0 1 0 5.3 6.7a1.6 1.6 0 0 0 1.6 1.6m1.4 9.7H5.8V9.8h2.5z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className={styles.contactIcon}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.7.8 1.2 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className={styles.contactIcon}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  ),
} as const;

export default function Home() {
  const landing = profile.landing;

  return (
    <div className={styles.landingRoot}>
      <div className={`${styles.portfolioSection} ${styles.headerSection}`}>
        <h1 className={styles.nameTitle}>{landing.name}</h1>
        <p className={styles.jobTitle}>{landing.tagline}</p>
      </div>

      <div className={`${styles.portfolioSection} ${styles.skillsSection}`}>
        <div className={styles.skills}>
          {landing.skills.map((skill) => (
            <div key={skill} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.portfolioSection} ${styles.contactSection}`}>
        <div className={styles.contactInfo}>
          {landing.contacts.map((contact) => (
            <div key={contact.label} className={styles.contactItem}>
              <a
                className={styles.contactLink}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {contactIcons[contact.type]}
                {contact.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.portfolioSection} ${styles.resumeSection}`}>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <Link className={styles.contactLink} href={landing.resumeLink.href}>
              <svg viewBox="0 0 24 24" className={styles.contactIcon}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.89 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9H13z" />
              </svg>
              {landing.resumeLink.label}
            </Link>
          </div>
        </div>
      </div>

      <canvas className={styles.landingCanvas} />

      <div className={styles.credits}>
        Based on{' '}
        <a href="https://github.com/PavelDoGreat/WebGL-Fluid-Simulation" target="_blank" rel="noreferrer">
          WebGL Fluid Simulation
        </a>
      </div>

      <Script src="/dat.gui.min.js" strategy="beforeInteractive" />
      <Script id="legacy-ga" strategy="beforeInteractive">
        {`window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create','UA-105392568-1','auto');ga('send','pageview');`}
      </Script>
      <Script src="/fluid.js" strategy="afterInteractive" />
    </div>
  );
}
