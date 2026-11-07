const { createApp } = window.Vue;

createApp({
  data() {
    return {
      year: new Date().getFullYear(),
      navigation: [
        { label: 'Home', href: '#home' }, { label: 'Work', href: '#projects' },
        { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }
      ],
      profileCards: [
        { icon: 'fa-solid fa-cloud', title: 'Software & application support', description: 'Java and Google Cloud Platform development, testing, debugging, system integration, application maintenance, and Agile delivery.' },
        { icon: 'fa-solid fa-headset', title: 'IT & systems support', description: 'Hardware, software, and network troubleshooting; Windows and business software installation; help desk and remote support; and end-user assistance.' }
      ],
      skillGroups: [
        { icon: 'fa-solid fa-code', title: 'Programming', center: 'CODE', skills: ['Java', 'JavaFX', 'PHP', 'VB.NET', 'VB6', 'Python', 'Kotlin', 'Dart', 'Flutter', 'Apps Script', 'Object-oriented programming'], outerIcons: [{ name: 'Java', image: './assets/icons/java.svg' }, { name: 'Dart', image: './assets/icons/dart.svg' }], innerIcons: [{ name: 'Python', image: './assets/icons/python.svg' }, { name: 'Kotlin', image: './assets/icons/kotlin.svg' }] },
        { icon: 'fa-solid fa-window-maximize', title: 'Web & mobile', center: 'WEB', skills: ['Android programming', 'Joomla', 'HTML5', 'CSS', 'JavaScript'], outerIcons: [{ name: 'HTML5', image: './assets/icons/html5.svg' }, { name: 'CSS3', image: './assets/icons/css3.svg' }], innerIcons: [{ name: 'JavaScript', image: './assets/icons/javascript.svg' }, { name: 'Android', image: './assets/icons/android.svg' }] },
        { icon: 'fa-solid fa-cloud', title: 'Cloud & data', center: 'DATA', skills: ['Google Cloud Platform (GCP)', 'Oracle Database', 'Database applications'], outerIcons: [{ name: 'Google Cloud', image: './assets/icons/google-cloud.svg' }], innerIcons: [{ name: 'Oracle', image: './assets/icons/oracle.svg' }] },
        { icon: 'fa-solid fa-laptop-code', title: 'Development tools', center: 'TOOLS', skills: ['AI tools for program development', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'AntiGravity', 'Android Studio', 'NetBeans', 'Eclipse', 'jCreator', 'Microsoft Visual Studio', 'phpMyAdmin', 'WAMP', 'XAMPP'], outerIcons: [{ name: 'Android Studio', image: './assets/icons/android-studio.svg' }, { name: 'Visual Studio', image: './assets/icons/visual-studio.svg' }], innerIcons: [{ name: 'Java', image: './assets/icons/java.svg' }, { name: 'Google Cloud', image: './assets/icons/google-cloud.svg' }] },
        { icon: 'fa-solid fa-screwdriver-wrench', title: 'IT support & operations', center: 'SUPPORT', skills: ['Application & system support', 'Technical troubleshooting', 'PC reformatting', 'Hardware & software installation', 'Windows installation', 'Network troubleshooting', 'Help desk support', 'Remote technical support', 'End-user support', 'AnyDesk', 'TeamViewer', 'Data backup & transfer', 'Technical documentation', 'Issue resolution', 'Customer service', 'Agile methodologies', 'Cross-functional collaboration', 'Technical problem solving'], outerIcons: [{ name: 'AnyDesk', image: './assets/icons/anydesk.svg' }, { name: 'TeamViewer', image: './assets/icons/teamviewer.svg' }], innerIcons: [{ name: 'Visual Studio', image: './assets/icons/visual-studio.svg' }, { name: 'Android Studio', image: './assets/icons/android-studio.svg' }] }
      ],
      projects: [
        { title: 'Query Manager FX', image: './assets/query-manager.png', alt: 'Query Manager FX database browser and query editor', description: 'A database utility for running queries and managing records with insert, update, and delete operations.', tags: ['JavaFX', 'SQL', 'Database tools'] },
        { title: 'eDocuments FX', image: './assets/edocuments.png', alt: 'eDocuments FX document scanning and retrieval interface', description: 'A document management system for scanning customer records, storing them in a database, and retrieving them later.', tags: ['Document management', 'Database'] },
        { title: 'Food POS', image: './assets/pos-foods.png', alt: 'Food point of sale screen with menu items and order controls', description: 'A point of sale application for recording food orders and monitoring sales and inventory.', tags: ['Point of sale', 'Orders', 'Inventory'] },
        { title: 'G-Card System', image: './assets/gcard-system.jpg', alt: 'G-Card customer rewards and points application', description: 'A customer rewards application for recording points earned through purchases.', tags: ['Loyalty system', 'Retail'] },
        { title: 'Mobile POS', image: './assets/pos-mobile.jpg', alt: 'Mobile POS order entry and sales interface', description: 'A point of sale system for recording cellphone orders and tracking sales and inventory.', tags: ['Point of sale', 'Mobile retail', 'Inventory'] },
        { title: 'Parts POS', image: './assets/pos-parts.jpg', alt: 'Motorcycle parts POS order and inventory interface', description: 'A point of sale application for motorcycle parts orders, sales, and inventory.', tags: ['Point of sale', 'Parts', 'Inventory'] },
        { title: 'Athena Events Management System', image: './assets/athena-event-system.jpg', alt: 'Athena Events Management System login screen', portrait: true, description: 'A Flutter and Dart app for managing events and checking attendees in with QR codes. Scans verify event registration, confirm food-voucher claims, and validate raffle eligibility.', tags: ['Flutter', 'Dart', 'QR validation', 'Event management'] }
      ],
      activeProjectIndex: 0,
      activeSkillIndex: 0,
      skillRotationAllowed: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      skillRotationTimer: null
    };
  },
  computed: {
    activeProject() {
      return this.projects[this.activeProjectIndex];
    }
  },
  mounted() {
    this.siteLoader = document.querySelector('#siteLoader');
    this.dismissSiteLoader = () => {
      const elapsed = performance.now() - (window.siteLoaderStartedAt || performance.now());
      this.siteLoaderTimer = window.setTimeout(() => {
        this.siteLoader?.classList.add('is-hidden');
        this.siteLoader?.addEventListener('transitionend', () => this.siteLoader?.remove(), { once: true });
      }, Math.max(0, 550 - elapsed));
    };
    if (document.readyState === 'complete') {
      this.dismissSiteLoader();
    } else {
      window.addEventListener('load', this.dismissSiteLoader, { once: true });
    }

    this.handleNavigationScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      const isCompact = navbar.classList.contains('is-compact');
      navbar.classList.toggle('is-compact', isCompact ? window.scrollY > 24 : window.scrollY > 72);
    };
    window.addEventListener('scroll', this.handleNavigationScroll, { passive: true });
    this.handleNavigationScroll();

    this.contactForm = document.querySelector('#contactForm');
    this.contactFormStatus = document.querySelector('#contactFormStatus');
    this.contactFormHandler = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const message = formData.get('message').trim();
      const submitButton = this.contactForm.querySelector('[type="submit"]');
      const originalButtonContent = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      this.contactFormStatus.textContent = 'Sending your message…';

      try {
        const response = await fetch('https://formsubmit.co/ajax/jovancasilang_20@hotmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email,
            message,
            _replyto: email,
            _subject: `Portfolio inquiry from ${name}`
          })
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== 'true')) {
          throw new Error(result.message || 'The message could not be sent.');
        }

        this.contactForm.reset();
        this.contactFormStatus.textContent = 'Thanks! Your message has been sent.';
      } catch (error) {
        this.contactFormStatus.textContent = 'Unable to send right now. Please try again or email me directly.';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
      }
    };
    this.contactForm?.addEventListener('submit', this.contactFormHandler);

    const targets = [...document.querySelectorAll('[data-reveal]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.skillsStackShell = document.querySelector('.skills-stack-shell');
    this.pauseSkillRotationOnFocus = () => this.pauseSkillRotation();
    this.resumeSkillRotationAfterFocus = (event) => {
      if (!this.skillsStackShell?.contains(event.relatedTarget)) this.resumeSkillRotation();
    };
    this.skillsStackShell?.addEventListener('mouseenter', this.pauseSkillRotationOnFocus);
    this.skillsStackShell?.addEventListener('mouseleave', this.resumeSkillRotationOnFocus);
    this.skillsStackShell?.addEventListener('focusin', this.pauseSkillRotationOnFocus);
    this.skillsStackShell?.addEventListener('focusout', this.resumeSkillRotationAfterFocus);
    if (this.skillRotationAllowed) this.startSkillRotation();

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('motion-ready');
    this.revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -24px 0px' });

    targets.forEach((target) => this.revealObserver.observe(target));
  },
  methods: {
    skillStackPosition(index) {
      return (index - this.activeSkillIndex + this.skillGroups.length) % this.skillGroups.length;
    },
    orbitPosition(index, offset = 0, count = 2) {
      const angle = offset + index * (360 / count);
      return { '--orbit-angle': `${angle}deg`, '--orbit-counter-angle': `${-angle}deg` };
    },
    startSkillRotation() {
      window.clearInterval(this.skillRotationTimer);
      this.skillRotationTimer = window.setInterval(() => {
        this.activeSkillIndex = (this.activeSkillIndex + 1) % this.skillGroups.length;
      }, 2700);
    },
    pauseSkillRotation() {
      window.clearInterval(this.skillRotationTimer);
      this.skillRotationTimer = null;
    },
    resumeSkillRotation() {
      if (!this.skillRotationAllowed || this.skillRotationTimer) return;
      if (this.skillsStackShell?.matches(':hover') || this.skillsStackShell?.contains(document.activeElement)) return;
      this.startSkillRotation();
    },
    navigateSkills(direction) {
      this.activeSkillIndex = (this.activeSkillIndex + direction + this.skillGroups.length) % this.skillGroups.length;
      this.resumeSkillRotation();
    },
    selectProject(index) {
      this.activeProjectIndex = index;
    },
  },
  beforeUnmount() {
    window.clearInterval(this.skillRotationTimer);
    this.revealObserver?.disconnect();
    this.contactForm?.removeEventListener('submit', this.contactFormHandler);
    window.removeEventListener('load', this.dismissSiteLoader);
    window.clearTimeout(this.siteLoaderTimer);
    window.removeEventListener('scroll', this.handleNavigationScroll);
    this.skillsStackShell?.removeEventListener('mouseenter', this.pauseSkillRotationOnFocus);
    this.skillsStackShell?.removeEventListener('mouseleave', this.resumeSkillRotationOnFocus);
    this.skillsStackShell?.removeEventListener('focusin', this.pauseSkillRotationOnFocus);
    this.skillsStackShell?.removeEventListener('focusout', this.resumeSkillRotationAfterFocus);
  }
}).mount('#app');
