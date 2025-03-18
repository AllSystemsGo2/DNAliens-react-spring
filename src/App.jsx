import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import AnimatedLottie from './components/AnimatedLottie'
import Frisbee from './views/Frisbee'
import CrashSite from './views/CrashSite'
import './App.css'
import './styles/animations.css'

function App() {
  return (
    <MemoryRouter>
      <div className="App" style={{
        minHeight: '100vh',
        minWidth: '120vh',
        position: 'relative'
      }}>
        <nav style={{
          padding: '20px',
          background: '#1a1a1a',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <Link 
            to="/" 
            className="nav-link"
            style={{ 
              marginRight: '20px', 
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >Home</Link>
          <Link 
            to="/frisbee" 
            className="nav-link"
            style={{ 
              marginRight: '20px',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >Frisbee Game</Link>
          <Link 
            to="/crash-site" 
            className="nav-link"
            style={{ 
              marginRight: '20px',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >Crash Site</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h3>This is a simple app demonstrating a combination of tools & technologies. All pages have sound effects.</h3>
              <h3>Click <Link to="/frisbee">Frisbee Game</Link> to begin. You will be led to Crash Site through narrative interaction.</h3>
              <div>
                <h2>Code base</h2>
                <li>React SPA in JSX</li>
                <li>React Spring</li>
                <li>Simple CSS Animations</li>
                <li>React Audio</li>
                <li>Lottie</li>
              </div>
              <div>
                <h2>Art Tools & Resources</h2>
                <li>Gemini Flash 2.0 - static image generation</li>
                <li>PixelBay - open source, royalty-free sound library </li>
                <li>Krita - open source image editor</li>
                <li>Audacity - open source audio editor</li>
              </div>
              <div>
                <h2>Code Gen Tools</h2>
                <li>Claude 3.5 Sonnet</li>
              </div>
            </div>
          } />
          <Route path="/frisbee" element={<Frisbee />} />
          <Route path="/crash-site" element={<CrashSite />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}

export default App
