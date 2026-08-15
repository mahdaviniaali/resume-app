'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './resume.module.css'
import { resolveText, type Language, type ResumeData } from '@/lib/api'

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
}

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
}

const headings = {
  summary: { fa: 'خلاصه', en: 'Summary' },
  experience: { fa: 'سوابق شغلی', en: 'Work Experience' },
  projectsMain: { fa: 'پروژه‌ها — اصلی', en: 'Projects — Main' },
  projectsSmall: { fa: 'پروژه‌های کوچک', en: 'Small Projects' },
  skills: { fa: 'مهارت‌ها', en: 'Skills' },
  education: { fa: 'تحصیلات', en: 'Education' },
  certificates: { fa: 'گواهینامه‌ها', en: 'Certificates' },
  languages: { fa: 'زبان‌ها', en: 'Languages' },
}

const waitForRender = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))

function ResumeContent({ lang, resume }: { lang: Language; resume: ResumeData }) {
  const t = (value: Parameters<typeof resolveText>[0]) => resolveText(value, lang)
  const personal = resume.personal
  const projects = resume.projects || { major: [], small: [] }

  return (
    <div className={styles.container} data-lang={lang}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.avatar}>{t(personal.avatar)}</div>
          <div className={styles.nameBlock}>
            <h1>{t(personal.name)}</h1>
            <p>{t(personal.tagline)}</p>
            <div className={styles.badges}>
              {(personal.badges || []).map((badge) => (
                <span key={t(badge)} className={styles.badge}>
                  {t(badge)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.contactInfo}>
          {personal.location && (
            <div className={styles.contactItem}>
              {baseIcons.location}
              <span>{t(personal.location)}</span>
            </div>
          )}
          {personal.phone && t(personal.phone) && (
            <div className={styles.contactItem}>
              {baseIcons.phone}
              <a href={personal.phoneHref || undefined}>{t(personal.phone)}</a>
            </div>
          )}
          {personal.email && (
            <div className={styles.contactItem}>
              {baseIcons.email}
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>
          )}
        </div>
        <div className={styles.contactInfo}>
          {(resume.contactsSecondary || []).map((contact) => (
            <a
              key={contact.type}
              className={styles.contactItem}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
            >
              {socialIcons[contact.type]}
              {t(contact.label)}
            </a>
          ))}
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.leftColumn}>
          {resume.summary && (
            <section className={styles.card} id="about">
              <h2 className={styles.sectionTitle}>{t(headings.summary)}</h2>
              <p className={styles.summary}>{t(resume.summary)}</p>
            </section>
          )}

          {(resume.experiences || []).length > 0 && (
            <section className={styles.card} id="experience">
              <h2 className={styles.sectionTitle}>{t(headings.experience)}</h2>
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
          )}

          {((projects.major || []).length > 0 || (projects.small || []).length > 0) && (
            <section className={styles.card} id="projects">
              {(projects.major || []).length > 0 && (
                <>
                  <h2 className={styles.sectionTitle}>{t(headings.projectsMain)}</h2>
                  <div className={styles.projectsList}>
                    {projects.major.map((project) => (
                      <div key={t(project.title)} className={styles.projectItem}>
                        <div className={styles.projectTitle}>{t(project.title)}</div>
                        <div className={styles.projectTech}>
                          {(project.tech || []).map((tech) => (
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
                </>
              )}

              {(projects.small || []).length > 0 && (
                <>
                  <div className={styles.sep} />
                  <h2 className={styles.sectionTitle}>{t(headings.projectsSmall)}</h2>
                  <div className={styles.projectsList}>
                    {projects.small.map((project) => (
                      <div key={t(project.title)} className={styles.projectItem}>
                        <div className={styles.projectTitle}>{t(project.title)}</div>
                        <div className={styles.projectTech}>
                          {(project.tech || []).map((tech) => (
                            <span key={tech} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className={styles.projectDescription}>{t(project.description)}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          {(resume.skills || []).length > 0 && (
            <section className={styles.card} id="skills">
              <h2 className={styles.sectionTitle}>{t(headings.skills)}</h2>
              <div className={styles.skillsGrid}>
                {resume.skills.map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(resume.education || []).length > 0 && (
            <section className={styles.card} id="education">
              <h2 className={styles.sectionTitle}>{t(headings.education)}</h2>
              {resume.education.map((edu) => (
                <div key={t(edu.degree)} className={styles.educationItem}>
                  <div className={styles.educationTitle}>{t(edu.degree)}</div>
                  <div className={styles.educationMeta}>{t(edu.school)}</div>
                  <div className={styles.educationMeta}>{t(edu.date)}</div>
                  <p className={styles.educationMeta}>{t(edu.details)}</p>
                </div>
              ))}
            </section>
          )}

          {(resume.certificates || []).length > 0 && (
            <section className={styles.card} id="certificates">
              <h2 className={styles.sectionTitle}>{t(headings.certificates)}</h2>
              {resume.certificates.map((certificate) => (
                <div key={t(certificate.title)} className={styles.certificateItem}>
                  <div className={styles.certificateTitle}>{t(certificate.title)}</div>
                  <div className={styles.certificateMeta}>{t(certificate.issuer)}</div>
                </div>
              ))}
            </section>
          )}

          {(resume.languages || []).length > 0 && (
            <section className={styles.card} id="languages">
              <h2 className={styles.sectionTitle}>{t(headings.languages)}</h2>
              <div className={styles.languagesList}>
                {resume.languages.map((langItem) => (
                  <div key={t(langItem.name)} className={styles.languageItem}>
                    <span className={styles.languageName}>{t(langItem.name)}</span>
                    <span className={styles.languageLevel}>{t(langItem.level)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </main>

      <footer className={styles.footer}>
        <span>{resume.footer ? t(resume.footer.text) : 'Genesis'}</span>
        <a className={styles.footerLink} href="#about">
          {resume.footer ? t(resume.footer.backToTop) : lang === 'fa' ? 'بازگشت به بالا' : 'Back to top'}
        </a>
      </footer>
    </div>
  )
}

export function ResumeView({ resume, memberName }: { resume: ResumeData; memberName?: string }) {
  const [language, setLanguage] = useState<Language>('en')
  const [printMode, setPrintMode] = useState<'view' | 'dual' | 'simple'>('view')
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('selectedLanguage')
    if (saved === 'fa' || saved === 'en') setLanguage(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
    window.localStorage.setItem('selectedLanguage', language)
    return () => {
      document.documentElement.lang = 'en'
      document.documentElement.dir = 'ltr'
    }
  }, [language])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      const container = document.querySelector(`.${styles.downloadContainer}`)
      if (container && !container.contains(target)) setDownloadMenuOpen(false)
    }
    if (!downloadMenuOpen) return
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [downloadMenuOpen])

  const handleDownload = async (mode: 'fa' | 'en' | 'both' | 'simple') => {
    setDownloadMenuOpen(false)
    const previous = language
    const previousPrintMode = printMode
    if (mode === 'simple') {
      setPrintMode('simple')
      await waitForRender()
      window.print()
      setPrintMode(previousPrintMode)
      return
    }
    if (mode === 'both') {
      setPrintMode('dual')
      await waitForRender()
      window.print()
      setPrintMode(previousPrintMode)
      return
    }
    if (language !== mode) {
      setLanguage(mode)
      await waitForRender()
      window.print()
      setLanguage(previous)
      return
    }
    await waitForRender()
    window.print()
  }

  return (
    <div className={styles.resumeRoot} data-print-mode={printMode}>
      <div className={styles.languageSwitcher}>
        <Link href="/#team" className={styles.languageBtn}>
          ← Genesis
        </Link>
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
        <button className={styles.downloadMainBtn} onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}>
          <span>{language === 'fa' ? 'دانلود' : 'Download'}</span>
        </button>
        {downloadMenuOpen && (
          <div className={styles.downloadMenu}>
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('fa')}>
              دانلود فارسی
            </button>
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('en')}>
              Download English
            </button>
            <button className={styles.downloadMenuItemAccent} onClick={() => handleDownload('both')}>
              Dual-Language
            </button>
            <button className={styles.downloadMenuItem} onClick={() => handleDownload('simple')}>
              {language === 'fa' ? 'نسخه چاپی' : 'Print Version'}
            </button>
          </div>
        )}
      </div>

      {memberName && (
        <p className={styles.screenOnly} style={{ textAlign: 'center', opacity: 0.6, marginBottom: 12 }}>
          {memberName} · Genesis Team
        </p>
      )}

      <div className={styles.screenOnly}>
        <ResumeContent lang={language} resume={resume} />
      </div>

      {printMode === 'dual' && (
        <div className={styles.printOnly} aria-hidden="true">
          <ResumeContent lang="fa" resume={resume} />
          <div className={styles.pageBreak} />
          <ResumeContent lang="en" resume={resume} />
        </div>
      )}
    </div>
  )
}
