const { createApp } = window.Vue;

createApp({
  data() {
    return {
      year: new Date().getFullYear(),
      navigation: [
        { label: 'Profile', href: '#profile' }, { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' }, { label: 'Projects', href: '#projects' },
        { label: 'Education', href: '#education' }, { label: 'Contact', href: '#contact' }
      ],
      profileCards: [
        { icon: 'fa-solid fa-cloud', title: 'Cloud & engineering', description: 'Java development, Google Cloud Platform, integration, debugging, testing, and application maintenance.' },
        { icon: 'fa-solid fa-headset', title: 'Support & operations', description: 'Application and systems support, troubleshooting, help desk service, and end-user assistance.' }
      ],
      skillGroups: [
        { icon: 'fa-solid fa-code', title: 'Programming', center: 'CODE', skills: ['Java', 'JavaFX', 'Dart', 'PHP', 'VB.NET', 'VB6', 'Python', 'Apps Script', 'Kotlin', 'Flutter'], outerIcons: [{ name: 'Java', image: './assets/icons/java.svg' }, { name: 'Dart', image: './assets/icons/dart.svg' }], innerIcons: [{ name: 'Python', image: './assets/icons/python.svg' }, { name: 'Kotlin', image: './assets/icons/kotlin.svg' }] },
        { icon: 'fa-solid fa-window-maximize', title: 'Web & mobile', center: 'WEB', skills: ['HTML5', 'CSS', 'JavaScript', 'Android', 'Joomla'], outerIcons: [{ name: 'HTML5', image: './assets/icons/html5.svg' }, { name: 'CSS3', image: './assets/icons/css3.svg' }], innerIcons: [{ name: 'JavaScript', image: './assets/icons/javascript.svg' }, { name: 'Android', image: './assets/icons/android.svg' }] },
        { icon: 'fa-solid fa-cloud', title: 'Cloud & data', center: 'DATA', skills: ['Google Cloud', 'Oracle Database', 'Database apps'], outerIcons: [{ name: 'Google Cloud', image: './assets/icons/google-cloud.svg' }], innerIcons: [{ name: 'Oracle', image: './assets/icons/oracle.svg' }] },
        { icon: 'fa-solid fa-screwdriver-wrench', title: 'Tools & support', center: 'TOOLS', skills: ['Android Studio', 'NetBeans', 'Eclipse', 'Visual Studio', 'phpMyAdmin', 'WAMP', 'XAMPP', 'AnyDesk', 'TeamViewer'], outerIcons: [{ name: 'Android Studio', image: './assets/icons/android-studio.svg' }, { name: 'Visual Studio', image: './assets/icons/visual-studio.svg' }], innerIcons: [{ name: 'AnyDesk', image: './assets/icons/anydesk.svg' }, { name: 'TeamViewer', image: './assets/icons/teamviewer.svg' }] }
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
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    navigateSkills(direction) {
      this.activeSkillIndex = (this.activeSkillIndex + direction + this.skillGroups.length) % this.skillGroups.length;
      if (this.skillRotationAllowed) this.startSkillRotation();
    },
    selectProject(index) {
      this.activeProjectIndex = index;
    },
  },
  beforeUnmount() {
    window.clearInterval(this.skillRotationTimer);
    this.revealObserver?.disconnect();
  }
}).mount('#app');
