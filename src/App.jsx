import { useEffect } from 'react'
import './App.css'

const HOME_PATH = '/pages/index.html'

function App() {
  useEffect(() => {
    // Skip the landing card entirely and send visitors straight to the home page.
    if (window?.location?.pathname !== HOME_PATH) {
      window.location.replace(HOME_PATH)
    }
  }, [])

  return (
    <div className="landing">
      <div className="landing-card">
        <img className="logo" src="/images/logo.png" alt="MNB Home for the Blind logo" />
        <h1>M.N.B Industrial Home for the Blind</h1>
        <p className="tagline">Taking you to the home page…</p>
        <div className="link-grid">
          <a className="button primary" href={HOME_PATH}>
            Go now
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
