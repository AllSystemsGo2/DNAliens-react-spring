import { Link, MemoryRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Frisbee from './views/Frisbee'
import CrashSite from './views/CrashSite'
import Level1Fight from './views/Level1Fight'
import './App.css'
import './styles/animations.css'
import './styles/nav.css'
import { loginUser, logout, fetchUser, refreshAuth } from './store/slices/authSlice'
import { useEffect, useState } from 'react'
import { setStoreDispatch } from './graphql/client'
import { useTranslation } from 'react-i18next'
import './store/i18n'
import LanguageSelector from './components/LanguageSelector'

function App() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { username, isLoggedIn } = useSelector((state) => state.auth)
  const [password, setPassword] = useState('')
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap()
      setPassword('') // Clear password after successful login
      await dispatch(fetchUser())
    } catch {
      // Error is handled by the reducer
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    setStoreDispatch(dispatch)
    dispatch(refreshAuth()).then(() => {
        dispatch(fetchUser())
    })
  }, [dispatch])

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
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
                { to: '/', label: t('nav.home') },
                { to: '/frisbee', label: t('nav.frisbeeGame') },
                { to: '/crash-site', label: t('nav.crashSite') },
                { to: '/level1-fight', label: 'Level 1 Fight' } // t('nav.level1Fight') }
            ].map(({ to, label }) => (
              <Link 
                key={to}
                to={to} 
                className="nav-link"
              >
                {label}
              </Link>
            ))}
          </div>
          <span></span>
          {!isLoggedIn ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder={t('auth.username')}
                value={username}
                onChange={(e) => dispatch({ type: 'auth/setUsername', payload: e.target.value })}
                className="login-input"
              />
              <input
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                onClick={handleLogin}
                className="login-button"
                disabled={loading}
              >
                {loading ? t('auth.loggingIn') : t('auth.login')}
              </button>
              {error && (
                <div style={{ color: 'red', marginTop: '0.5rem' }}>
                  {error}
                </div>
              )}
              
            </div>
          ) : (
            <div style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {t('auth.welcome', { username })}
              <button
                onClick={handleLogout}
                className="login-button"
              >
                Logout
              </button>
            </div>
          )}
          <LanguageSelector selected="en" />
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              <h3>{t('home.intro')}</h3>
              <h3>{t('home.instructions')}</h3>
              <div>
                <h2>{t('home.sections.codebase')}</h2>
                <li>React SPA in JSX</li>
                <li>React Spring</li>
                <li>Simple CSS Animations</li>
                <li>React Audio</li>
                <li>Lottie</li>
              </div>
              <div>
                <h2>{t('home.sections.artTools')}</h2>
                <li>Gemini Flash 2.0 - static image generation</li>
                <li>PixelBay - open source, royalty-free sound library </li>
                <li>Krita - open source image editor</li>
                <li>Audacity - open source audio editor</li>
              </div>
              <div>
                <h2>{t('home.sections.codeGenTools')}</h2>
                <li>Claude 3.5 Sonnet</li>
              </div>
            </div>
          } />
          <Route path="/frisbee" element={<Frisbee />} />
          <Route path="/crash-site" element={<CrashSite />} />
          <Route path="/level1-fight" element={<Level1Fight />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}

export default App
