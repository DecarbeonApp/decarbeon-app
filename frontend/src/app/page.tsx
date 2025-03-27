import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Igniting Climate Action, Measured Today for Tomorrow.
          </h1>
          <h2 className={styles.subtitle}>
            Our Vision: Empowering Climate Action, One Win at a Time
          </h2>
          <p className={styles.description}>
            Think of us as your climate action accelerator. Measure and slash emissions 
            with our innovative decarbonization solution, and ace compliance reporting. 
            Act now—new rules demand it. Lead the climate fight today!
          </p>
        </div>
      </section>

      <section className={styles.offerings} id="services">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Offerings</h2>
          <div className={styles.offeringGrid}>
            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Carbon Footprint Dashboard</h3>
              <h4>Your CO₂ Footprint, Simplified</h4>
              <p>
                Seamlessly Track and analyze your carbon emissions, energy use, water consumption.
              </p>
            </div>

            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20.2426 12C20.2426 16.5563 16.5563 20.2426 12 20.2426C7.44365 20.2426 3.75736 16.5563 3.75736 12C3.75736 7.44365 7.44365 3.75736 12 3.75736C16.5563 3.75736 20.2426 7.44365 20.2426 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>The DeCarbeon Badge</h3>
              <h4>Showcase Your Sustainability Leadership</h4>
              <p>
                Build trust and stamp your sustainability commitment with our Revolutionary Badge.
              </p>
            </div>

            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M12 4L8 8M12 4L16 8M21 12H3M21 12L17 8M21 12L17 16M3 12L7 8M3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>ROI-Based Decarbonization</h3>
              <h4>Sustainability That Pays for Itself</h4>
              <p>
                Tailored strategies for achieving your sustainability goals.
              </p>
            </div>

            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 11H15M12 15H15M9 11H9.01M9 15H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>ESG Reporting</h3>
              <h4>Compliance And Leadership</h4>
              <p>
                Build stakeholder confidence with tailored sustainability reports 
                aligned with global frameworks.
              </p>
            </div>

            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V4M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12M12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12M12 12V20M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3.75736 7.75736C5.41421 6.10051 7.82608 5 10.5 5C15.7467 5 20 9.25329 20 14.5C20 17.1739 18.8995 19.5858 17.2426 21.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>AI Powered Decarbonization</h3>
              <div className={styles.comingSoon}>Coming Soon</div>
              <p>
                Go beyond tracking! Get tailormade decarbonization insights and 
                solutions powered by AI.
              </p>
              <Link href="/" className={styles.exploreLink}>
                Let's Explore
              </Link>
            </div>

            <div className={styles.offeringCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 20C12 17.7909 10.2091 16 8 16C5.79086 16 4 17.7909 4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 20C20 17.7909 18.2091 16 16 16C13.7909 16 12 17.7909 12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Crowd Fund Green Projects</h3>
              <div className={styles.comingSoon}>Coming Soon</div>
              <p>
                We deliver a fast, precise calculator to track and cut your 
                emissions—no guesswork, just results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitGrid}>
            <div className={styles.benefitCard}>
              <h3>Stop Guessing Your Emissions</h3>
            </div>
            <div className={styles.benefitCard}>
              <h3>End Compliance Chaos</h3>
            </div>
            <div className={styles.benefitCard}>
              <h3>Save Time on Carbon Plans</h3>
            </div>
            <div className={styles.benefitCard}>
              <h3>Be a Leader and Role Model</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta} id="contact">
        <div className={styles.container}>
          <h2>Book now to Decarbonize</h2>
          <p>
            Take the first step, embark on your net-zero journey and schedule a 
            free consultation with us.
          </p>
          <a 
            href="https://outlook.office.com/bookwithme/user/2c067fdaf65d48e49385aae1c1877d73@decarbeon.com?anonymous&ep=plink"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Book Free Consultation
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerContact}>
              <h3>Contact us</h3>
              <a href="mailto:Founder@decarbeon.com">Founder@decarbeon.com</a>
            </div>
            <p className={styles.copyright}>
              2025. DECARBEON. All rights reserved. DECARBEON IS PART OF DECARBEON 
              LIMITED, A MASDAR FREEZONE COMPANY
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
