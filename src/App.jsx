import { useEffect, useMemo, useState } from 'react'
import './App.css'

const heroHighlights = [
  {
    title: 'Founded in 1956',
    detail:
      'Registered under the Bombay Public Trust Act to provide a home and vocational training for visually challenged men.',
  },
  {
    title: 'Mission',
    detail:
      'Empower every visually impaired person to live independently, with the motto “Each one reach one.”',
  },
  {
    title: 'Recognition',
    detail: 'Recognised by the Government of Maharashtra.',
  },
]

const programmes = [
  {
    name: 'Massage training',
    description:
      'Foot and chair massage courses that expand employment opportunities for trainees.',
  },
  {
    name: 'Advanced computer training',
    description:
      'MNB–TCS All-India centre grooming visually challenged learners in MS-CIT and advanced skills for corporate roles.',
  },
  {
    name: 'Computer centre',
    description:
      'MS-CIT and basic computing with screen readers like JAWS, covering Word, Excel, PowerPoint, and internet use.',
  },
  {
    name: 'Self-employment schemes',
    description:
      'Mini and Maxi schemes offer equipment and materials in kind so trainees can start sustainable local businesses.',
  },
  {
    name: 'Subsidised hostel',
    description:
      'Affordable accommodation for visually impaired men relocating to Mumbai while they establish their careers.',
  },
  {
    name: 'Vocational training',
    description:
      'Four-year residential programme with weaving, handloom, tailoring, cane work, and other income-generating trades.',
  },
]

const successStories = [
  {
    name: 'Devendra Vhaghade',
    focus: 'Self-employment scheme',
    summary:
      'Turned training into a sound service business in Gondhiya with equipment support from MNB, earning respect and stability.',
    image: '/images/devendra-v.jpg',
    alt: 'Portrait of Devendra Vhaghade',
  },
  {
    name: 'Ramesh Sawant',
    focus: 'Self-employment scheme',
    summary:
      'Expanded a blouse-piece business with MNB’s in-kind support, lifting his family income and adding STD coin boxes.',
    image: '/images/ramesh-s.jpg',
    alt: 'Portrait of Ramesh Sawant',
  },
  {
    name: 'Namdeo Jadhav',
    focus: 'Ex trainee',
    summary:
      'Pursued education alongside training, completed graduation, and secured work as a telephone operator at KVIC.',
    image: '/images/namdeo-j.jpg',
    alt: 'Portrait of Namdeo Jadhav',
  },
]

const galleryImages = [
  'af(1).jpg',
  'af(2).jpg',
  'af(3).jpg',
  'af(4).jpg',
  'af (5).jpg',
  'af (6).jpg',
  'af (7).jpg',
  'af (8).jpg',
  'af (9).jpg',
  'af (10).jpg',
  'af (11).jpg',
  'af (12).jpg',
  'af (13).jpg',
  'af (14).jpg',
  'af (15).jpg',
  'af (16).jpg',
  'af (17).jpg',
  'af (18).jpg',
  'af (19).jpg',
  'af (20).jpg',
  'af (21).jpg',
  'af (22).jpg',
  'af (23).jpg',
  'af (24).jpg',
  'af (25).jpg',
  'af (26).jpg',
  'af (27).jpg',
  'af (28).jpg',
  'af (29).jpg',
  'af (30).jpg',
  'af (31).jpg',
  'af (32).jpg',
  'af (33).jpg',
  'af (34).jpg',
  'af (35).jpg',
  'af (36).jpg',
].map((filename) => ({
  src: `/images/${encodeURIComponent(filename)}`,
  alt: 'Life at MNB Home',
}))

const supportOptions = [
  'Donate to sustain training and hostel programmes.',
  'Sponsor an inmate for a year (₹25,000).',
  'Sponsor excursions or invite trainees to community events.',
  'Offer employment opportunities or accessible workspace.',
  'Patronize products made by trainees.',
  'Provide space in housing societies for small vocation stalls.',
]

const contact = {
  address: [
    'Chateau Dieu, 280 Swami Vivekanand Road',
    'Jogeshwari (W), Mumbai 400 102',
  ],
  email: 'mnbhome280@gmail.com',
  phones: ['(022) 2679 1487', '(022) 2679 3688', '+91 90043 19934'],
}

const donateDetails = [
  { label: 'Account Name', value: 'THE M.N.B. INDUSTRIAL HOME FOR THE BLIND' },
  { label: 'Account Number', value: '020910001747' },
  { label: 'Account type', value: 'SAVING' },
  { label: 'Bank Name', value: 'DENA BANK' },
  { label: 'Bank Address', value: 'S.V.ROAD, JOGESHWARI WEST, MUMBAI 400102' },
  { label: 'Branch Name and Code', value: 'JOGESHWARI-WEST-BR , CODE- 460209' },
  { label: 'MICR', value: '400018052' },
  { label: 'IFC CODE', value: 'BKDN0460209' },
]

// Trim nav to fit on one line for desktop while keeping key destinations.
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/programmes', label: 'Programmes' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/donate', label: 'Donate' },
  { path: '/contact', label: 'Contact' },
]

const PageShell = ({ children, onNav, navOpen, onToggleNav }) => (
  <div className="page">
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
    <header className="site-header" role="banner">
      <div className="brand">
        <img src="/images/logo.png" alt="MNB Home for the Blind logo" />
        <div className="brand-text">
          <p className="eyebrow desktop-only">Recognised by Government of Maharashtra</p>
          <h1 className="desktop-only">M.N.B Industrial Home for the Blind</h1>
          <p className="tagline desktop-only">
            Residential vocational training and empowerment for visually challenged men.
          </p>
        </div>
      </div>
      <button
        className="nav-toggle"
        aria-expanded={navOpen}
        aria-controls="primary-nav"
        onClick={onToggleNav}
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      <nav
        id="primary-nav"
        aria-label="Primary"
        className={`site-nav ${navOpen ? 'open' : ''}`}
      >
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <a href={link.path} onClick={onNav(link.path)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="button primary" href="/donate" onClick={onNav('/donate')}>
          Donate / Support
        </a>
      </nav>
    </header>
    <main id="main-content" className="content" tabIndex="-1">
      {children}
    </main>
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} MNB Home for the Blind. All rights reserved.</p>
      <div className="footer-links">
        <a href="/" onClick={onNav('/')}>
          Home
        </a>
        <a href="/support" onClick={onNav('/support')}>
          Support
        </a>
        <a href="/contact" onClick={onNav('/contact')}>
          Contact
        </a>
      </div>
    </footer>
  </div>
)

const HomePage = () => (
  <>
    <section className="hero card-shell" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="eyebrow">Since 1956</p>
        <h2 id="hero-title">Empowering visually impaired individuals to thrive independently.</h2>
        <p className="lead">
          From vocational skills and IT training to self-employment support, MNB Home nurtures
          confidence, community, and dignified livelihoods.
        </p>
        <div className="actions">
          <a className="button primary" href="/donate">
            Donate now
          </a>
          <a className="button ghost" href="/programmes">
            See programmes
          </a>
        </div>
      </div>
      <div className="hero-media" aria-hidden="true">
        <img src="/images/hero-1.jpg" alt="" />
        <div className="hero-highlights">
          {heroHighlights.map((item) => (
            <div key={item.title} className="highlight">
              <p className="highlight-title">{item.title}</p>
              <p className="highlight-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="panel-grid two card-shell">
      <div className="panel soft">
        <p className="eyebrow">About the trust</p>
        <h3>A home away from home</h3>
        <p>
          Established on July 16, 1956, the Muncherjee Nowrojee Banajee Industrial Home for the Blind
          is a monument to the munificence of Serenbai Banajee, who dedicated her family bungalow
          “Chateau Dieu” for a residential training centre. Today, the campus at S.V. Road,
          Jogeshwari (W) is a nurturing environment for visually challenged men aged 18–45.
        </p>
        <p>
          The trust focuses on physical, mental, and moral upliftment, enabling residents to become
          self-reliant through vocational and IT training, recreation, and holistic care.
        </p>
      </div>
      <div className="panel image-card">
        <img src="/images/about-campus.jpg" alt="MNB Home campus building" />
      </div>
    </section>
  </>
)

const AboutPage = () => (
  <div className="stack-lg">
    <section className="panel" aria-labelledby="mission-title">
      <p className="eyebrow">Vision &amp; mission</p>
      <h3 id="mission-title">Each one reach one</h3>
      <div className="panel-grid two">
        <p>
          MNB Home empowers visually impaired individuals with vocational or IT training,
          infrastructure, and working capital support suited to their abilities, so they can improve
          quality of life and live independently. Vision: every visually impaired person leads an
          independent life and is a contributing member of society.
        </p>
        <div className="media-card">
          <img src="/images/vision.png" alt="Illustration of vision and mission" />
        </div>
      </div>
    </section>
  </div>
)

const ProgrammesPage = () => (
  <div className="stack-lg">
    <section className="panel" aria-labelledby="programmes-title">
      <p className="eyebrow">Programmes</p>
      <h3 id="programmes-title">Training that leads to livelihoods</h3>
      <p className="lead">
        Practical skills, technology, and entrepreneurial support to meet each trainee where they
        are.
      </p>
      <div className="card-grid">
        {programmes.map((programme) => (
          <article className="card" key={programme.name}>
            <h4>{programme.name}</h4>
            <p>{programme.description}</p>
          </article>
        ))}
      </div>
      <div className="media-card wide">
        <img src="/images/programme-flash.jpg" alt="Trainees practicing vocational skills" />
      </div>
    </section>
  </div>
)

const SuccessPage = () => (
  <div className="stack-lg">
    <section className="panel" aria-labelledby="success-title">
      <p className="eyebrow">Success stories</p>
      <h3 id="success-title">Lives changed through opportunity</h3>
      <div className="card-grid">
        {successStories.map((story) => (
          <article className="card person" key={story.name}>
            <div className="avatar">
              <img src={story.image} alt={story.alt} />
            </div>
            <div className="person-copy">
              <p className="eyebrow">{story.focus}</p>
              <h4>{story.name}</h4>
              <p>{story.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="panel" aria-labelledby="testimonial-title">
      <p className="eyebrow">Partners speak</p>
      <h3 id="testimonial-title">Trusted by collaborators</h3>
      <div className="quote-card">
        <div className="avatar">
          <img src="/images/vikas-shevade.jpg" alt="Vikas Arun Shevade from TCS Maitree" />
        </div>
        <blockquote>
          <p>
            “Your organisation is built on empowerment through vocational training and employability.
            Hosting the TCS Maitree Advanced Computer Training Center with you has created
            opportunities that students and partners truly appreciate.”
          </p>
          <footer>
            <strong>Vikas Arun Shevade</strong>, Corporate Maitree Lead, Tata Consultancy Services
          </footer>
        </blockquote>
      </div>
    </section>
  </div>
)

const GalleryPage = () => (
  <section className="panel" aria-labelledby="gallery-title">
    <p className="eyebrow">Gallery</p>
    <h3 id="gallery-title">Life at MNB Home</h3>
    <div className="gallery-grid">
      {galleryImages.map((image) => (
        <figure key={image.src}>
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      ))}
    </div>
  </section>
)

const SupportPage = () => (
  <section className="panel" aria-labelledby="support-title">
    <p className="eyebrow">Support us</p>
    <h3 id="support-title">Help sustain training and independence</h3>
    <p className="lead">
      Your support fuels training, hostel operations, and self-employment initiatives for visually
      impaired individuals.
    </p>
    <div className="panel-grid two">
      <div className="copy">
        <ul className="checklist">
          {supportOptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="note">
          Motto: Each one reach one. Every contribution directly impacts trainees’ ability to live
          with dignity.
        </p>
        <div className="actions">
          <a className="button primary" href="/donate">
            Donate now
          </a>
          <a className="button ghost" href="/contact">
            Contact us
          </a>
        </div>
      </div>
      <div className="media-card">
        <img src="/images/donate.jpg" alt="Donation and community support" />
      </div>
    </div>
  </section>
)

const DonatePage = () => (
  <section className="panel" aria-labelledby="donate-title">
    <p className="eyebrow">Donate</p>
    <h3 id="donate-title">Bank transfer details</h3>
    <div className="donate-grid">
      {donateDetails.map((row) => (
        <div key={row.label} className="donate-row">
          <p className="donate-label">{row.label}</p>
          <p className="donate-value">{row.value}</p>
        </div>
      ))}
    </div>
    <div className="note">
      Please share your transaction reference with us at{' '}
      <a href="mailto:mnbhome280@gmail.com">mnbhome280@gmail.com</a> for an acknowledgement.
    </div>
  </section>
)

const ContactPage = () => (
  <section className="panel" aria-labelledby="contact-title">
    <p className="eyebrow">Contact</p>
    <h3 id="contact-title">We’re here to help</h3>
    <div className="contact-grid">
      <div className="contact-card">
        <h4>Visit</h4>
        <p>
          {contact.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className="contact-card">
        <h4>Call</h4>
        <ul>
          {contact.phones.map((phone) => (
            <li key={phone}>
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>{phone}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-card">
        <h4>Email</h4>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
    </div>
  </section>
)

const routeMap = {
  '/': <HomePage />,
  '/about': <AboutPage />,
  '/programmes': <ProgrammesPage />,
  '/gallery': <GalleryPage />,
  '/donate': <DonatePage />,
  '/contact': <ContactPage />,
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const onNav = (target) => (event) => {
    event.preventDefault()
    if (path === target) return
    window.history.pushState({}, '', target)
    setPath(target)
    setNavOpen(false)
    const main = document.getElementById('main-content')
    if (main) {
      main.focus({ preventScroll: true })
      main.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const page = useMemo(() => routeMap[path] ?? routeMap['/'], [path])

  return (
    <PageShell
      onNav={onNav}
      navOpen={navOpen}
      onToggleNav={() => setNavOpen((open) => !open)}
    >
      {page}
    </PageShell>
  )
}

export default App
