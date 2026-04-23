'use client';

import { useEffect, useState } from 'react';
import styles from './resume.module.css';
import { getProfileData, resolveText, Language } from '@/lib/profile';

const profile = getProfileData();
const { resume } = profile;

const baseIcons = {
  location: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
      />
    </svg>
  ),
};

const socialIcons = {
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.5.12-3.12 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.62.24 2.82.12 3.12.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .5z" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 2.5 6a2.5 2.5 0 0 0 2.48-2.5zM3 8h4v12H3zm6 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V20h-4v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.82V20H9z" />
    </svg>
  ),
  telegram: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.04 15.05l-.38 5.33c.54 0 .77-.23 1.05-.5l2.52-2.42 5.23 3.83c.96.53 1.64.25 1.89-.89l3.43-16.08c.3-1.39-.5-1.94-1.43-1.6L1.3 9.9c-1.35.53-1.33 1.29-.23 1.62l5.95 1.86 13.8-8.7c.65-.39 1.23-.17.75.22" />
    </svg>
  ),
};

const headings = {
  summary: { fa: 'خلاصه', en: 'Summary' },
  experience: { fa: 'سوابق شغلی', en: 'Work Experience' },
  projectsMain: { fa: 'پروژه‌ها — اصلی', en: 'Projects — Main' },
  projectsSmall: { fa: 'پروژه‌های کوچک', en: 'Small Projects' },
  skills: { fa: 'مهارت‌ها', en: 'Skills' },
  education: { fa: 'تحصیلات', en: 'Education' },
  certificates: { fa: 'گواهینامه‌ها', en: 'Certificates' },
  languages: { fa: 'زبان‌ها', en: 'Languages' },
};

const waitForRender = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

export default function ResumePage() {
  const [language, setLanguage] = useState<Language>('fa');
  const [printMode, setPrintMode] = useState<'view' | 'dual' | 'simple'>('view');
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('selectedLanguage');
      if (saved === 'fa' || saved === 'en') {
        setLanguage(saved);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    window.localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      const container = document.querySelector(`.${styles.downloadContainer}`);
      if (container && !container.contains(target)) {
        setDownloadMenuOpen(false);
      }
    };

    if (downloadMenuOpen) {
      // Use both mousedown and touchstart for better mobile support
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [downloadMenuOpen]);

  const handleDownload = async (mode: 'fa' | 'en' | 'both' | 'simple') => {
    setDownloadMenuOpen(false);
    const previous = language;
    const previousPrintMode = printMode;

    if (mode === 'simple') {
      // نسخه چاپی ساده
      setPrintMode('simple');
      await waitForRender();
      window.print();
      setPrintMode(previousPrintMode);
      return;
    }

    if (mode === 'both') {
      setPrintMode('dual');
      await waitForRender();
      window.print();
      setPrintMode(previousPrintMode);
      return;
    }

    if (language !== mode) {
      setLanguage(mode);
      await waitForRender();
      window.print();
      setLanguage(previous);
      return;
    }

    await waitForRender();
    window.print();
  };

  return (
    <div className={styles.resumeRoot} data-print-mode={printMode}>
      <div className={styles.languageSwitcher}>
        {(['fa', 'en'] as Language[]).map((lang) => (
          <button
            key={lang}
            className={`${styles.languageBtn} ${language === lang ? styles.languageBtnActive : ''}`}
            onClick={() => setLanguage(lang)}
          >
            {lang === 'fa' ? 'فارسی' : 'English'}
          </button>
        ))}
      </div>

      <div className={styles.downloadContainer}>
        <button
          className={styles.downloadMainBtn}
          onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{language === 'fa' ? 'دانلود' : 'Download'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="14"
            height="14"
            className={downloadMenuOpen ? styles.chevronOpen : ''}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {downloadMenuOpen && (
          <div className={styles.downloadMenu}>
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('fa')}>
              <span>دانلود فارسی</span>
            </button>
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('en')}>
              <span>Download English</span>
            </button>
            <button className={styles.downloadMenuItemAccent} onClick={() => handleDownload('both')}>
              <span>دوزبانه \ Dual-Language</span>
            </button>
            <div className={styles.downloadMenuDivider} />
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('simple')}>
              <span>{language === 'fa' ? 'نسخه چاپی' : 'Print Version'}</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.screenOnly}>
        <ResumeContent lang={language} />
      </div>

      {printMode === 'dual' && (
        <div className={styles.printOnly} aria-hidden="true">
          <ResumeContent lang="fa" />
          <div className={styles.pageBreak} />
          <ResumeContent lang="en" />
        </div>
      )}
    </div>
  );
}

function ResumeContent({ lang }: { lang: Language }) {
  const t = (value: Parameters<typeof resolveText>[0]) => resolveText(value, lang);

  return (
    <div className={styles.container} data-lang={lang}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.avatar}>{t(resume.personal.avatar)}</div>
            <div className={styles.nameBlock}>
              <h1>{t(resume.personal.name)}</h1>
              <p>{t(resume.personal.tagline)}</p>
              <div className={styles.badges}>
                {resume.personal.badges.map((badge) => (
                  <span key={t(badge)} className={styles.badge}>
                    {t(badge)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              {baseIcons.location}
              <span>{t(resume.personal.location)}</span>
            </div>
            <div className={styles.contactItem}>
              {baseIcons.phone}
              <a href={resume.personal.phoneHref}>{t(resume.personal.phone)}</a>
            </div>
            <div className={styles.contactItem}>
              {baseIcons.email}
              <a href={`mailto:${resume.personal.email}`}>{resume.personal.email}</a>
            </div>
          </div>
          <div className={styles.contactInfo}>
            {resume.contactsSecondary.map((contact) => (
            <a key={contact.type} className={styles.contactItem} href={contact.href} target="_blank" rel="noreferrer">
                {socialIcons[contact.type]}
                {t(contact.label)}
              </a>
            ))}
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <section className={styles.card} id="about">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                {t(headings.summary)}
              </h2>
              <p className={styles.summary}>{t(resume.summary)}</p>
            </section>

            <section className={styles.card} id="experience">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
                {t(headings.experience)}
              </h2>
              <div className={styles.experienceList}>
                {resume.experiences.map((exp) => (
                  <div key={t(exp.title)} className={styles.experienceItem}>
                    <div className={styles.experienceTitle}>{t(exp.title)}</div>
                    <div className={styles.experienceMeta}>
                      <span>{t(exp.location)}</span>
                      <span>{t(exp.date)}</span>
                    </div>
                    <p className={styles.experienceDescription}>{t(exp.description)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.card} id="projects">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4 4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {t(headings.projectsMain)}
              </h2>
              <div className={styles.projectsList}>
                {resume.projects.major.map((project) => (
                  <div key={t(project.title)} className={styles.projectItem}>
                    <div className={styles.projectTitle}>{t(project.title)}</div>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className={styles.projectDescription}>{t(project.description)}</p>
                    {project.features && (
                      <div className={styles.projectFeatures}>
                        {project.features.map((feature) => (
                          <div key={t(feature)} className={styles.projectFeature}>
                            {t(feature)}
                          </div>
                        ))}
                      </div>
                    )}
                    {project.meta && (
                      <div className={styles.projectMeta}>
                        {project.meta.date && <span>{t(project.meta.date)}</span>}
                        {project.meta.role && <span>{t(project.meta.role)}</span>}
                      </div>
                    )}
                    {project.meta?.link && (
                    <a className={styles.projectLink} href={project.meta.link} target="_blank" rel="noreferrer">
                      {lang === 'fa' ? 'مشاهده پروژه' : 'View Project'}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.sep} />

              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {t(headings.projectsSmall)}
              </h2>

              <div className={styles.projectsList}>
                {resume.projects.small.map((project) => (
                  <div key={t(project.title)} className={styles.projectItem}>
                    <div className={styles.projectTitle}>{t(project.title)}</div>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className={styles.projectDescription}>{t(project.description)}</p>
                    {project.features && (
                      <div className={styles.projectFeatures}>
                        {project.features.map((feature) => (
                          <div key={t(feature)} className={styles.projectFeature}>
                            {t(feature)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.card} id="skills">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t(headings.skills)}
              </h2>
              <div className={styles.skillsGrid}>
                {resume.skills.map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.card} id="education">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 20v-7.5l4-2.222" />
                </svg>
                {t(headings.education)}
              </h2>
              {resume.education.map((edu) => (
                <div key={t(edu.degree)} className={styles.educationItem}>
                  <div className={styles.educationTitle}>{t(edu.degree)}</div>
                  <div className={styles.educationMeta}>{t(edu.school)}</div>
                  <div className={styles.educationMeta}>{t(edu.date)}</div>
                  <p className={styles.educationMeta}>{t(edu.details)}</p>
                </div>
              ))}
            </section>

            <section className={styles.card} id="certificates">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {t(headings.certificates)}
              </h2>
              {resume.certificates.map((certificate) => (
                <div key={t(certificate.title)} className={styles.certificateItem}>
                  <div className={styles.certificateTitle}>{t(certificate.title)}</div>
                  <div className={styles.certificateMeta}>{t(certificate.issuer)}</div>
                </div>
              ))}
            </section>

            <section className={styles.card} id="languages">
              <h2 className={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {t(headings.languages)}
              </h2>
              <div className={styles.languagesList}>
              {resume.languages.map((langItem) => (
                <div key={t(langItem.name)} className={styles.languageItem}>
                  <span className={styles.languageName}>{t(langItem.name)}</span>
                  <span className={styles.languageLevel}>{t(langItem.level)}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </main>

        <footer className={styles.footer}>
          <span>{t(resume.footer.text)}</span>
          <a className={styles.footerLink} href="#about">
            {t(resume.footer.backToTop)}
          </a>
        </footer>
    </div>
  );
}
