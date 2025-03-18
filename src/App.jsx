import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AnimatedLottie from './components/AnimatedLottie'
import Frisbee from './views/Frisbee'
import CrashSite from './views/CrashSite'
import './App.css'
import './styles/animations.css'

function App() {
  return (
    <BrowserRouter>
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
              <h1>Animated Lottie Demo</h1>
              <AnimatedLottie />
            </div>
          } />
          <Route path="/frisbee" element={<Frisbee />} />
          <Route path="/crash-site" element={<CrashSite />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
