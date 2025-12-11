import './App.css'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/donate', label: 'Donate' },
]

function App() {
  return (
    <div className="landing">
      <div className="landing-card">
        <img className="logo" src="/images/logo.png" alt="MNB Home for the Blind logo" />
        <h1>M.N.B Industrial Home for the Blind</h1>
        <p className="tagline">Choose a page to continue.</p>
        <div className="link-grid">
          {links.map(({ href, label }) => (
            <a key={href} className="button primary" href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
