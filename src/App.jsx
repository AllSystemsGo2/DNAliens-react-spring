import { Link, MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout, fetchUser, refreshAuth } from './store/slices/authSlice'
import React, { useEffect, useState, Suspense } from 'react'
import { setStoreDispatch } from './graphql/client'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './components/LanguageSelector'
import { resetPageAttributes } from './store/slices/pageSlice'
import { setPageId } from './store/slices/appSlice'
import { getPageId } from './helpers/locationHelper'
import './store/i18n'
import './App.css'
import './styles/animations.css'
import './styles/nav.css'


// Import all view components dynamically
const viewsContext = import.meta.glob('./views/**/*.jsx', { eager: true })

// Convert view paths to route paths and components
const routes = Object.entries(viewsContext).map(([path, module]) => {
  const routePath = path
    .replace('./views/', '/')
    .replace('.jsx', '')
  return { 
    path: routePath,
    component: module.default
  }
})

function Navigation() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Link to="/" className="nav-link">{t('nav.home')}</Link>
      <select 
        onChange={(e) => navigate(e.target.value)}
        value={location.pathname}
        style={{
          background: '#2a2a2a',
          color: 'white',
          padding: '8px',
          border: '1px solid #3a3a3a',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        <option value="/">Select View</option>
        {routes.map(({ path }) => (
          <option key={path} value={path}>
            {path.split('/').pop().replace(/([A-Z])/g, ' $1').trim()}
          </option>
        ))}
      </select>
    </div>
  )
}

function App() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { username, isLoggedIn } = useSelector((state) => state.auth)
  const [password, setPassword] = useState('')
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

  const [disableReset, setDisableReset] = useState(false)

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

  const handleResetGameData = () => {
    setDisableReset(true)
    dispatch(resetPageAttributes()).finally(() => {
      setDisableReset(false)
    })
  }

  useEffect(() => {
    setStoreDispatch(dispatch)
    dispatch(refreshAuth()).then(() => {
        dispatch(fetchUser())
    })
  }, [dispatch])

  return (
    <MemoryRouter>
      <div className="App">
        <LocationTracker />
        <nav style={{
          width: '100%',
          background: '#1a1a1a',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Navigation />
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
        <div className='superview'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={
                <div className='view'>
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
                  <div>
                    <button onClick={handleResetGameData} disabled={disableReset}>Reset Game Data</button>
                  </div>
                </div>
              } />
              {routes.map(({ path, component }) => (
                <Route
                  key={path}
                  path={path}
                  element={React.createElement(component)}
                />
              ))}
              <Route path="*" element={
                <NotFound />
              } />

            </Routes>
          </Suspense>
        </div>
      </div>
    </MemoryRouter>
  )
}

// Create a LocationTracker component to handle location changes
const LocationTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setPageId(getPageId(location.pathname)))
  }, [location, dispatch]);
  
  return null;
};

function NotFound() {
  const location = useLocation();
  return (
    <div className="view">
      <h2>Page Not Found</h2>
      <p>The path <code>{location.pathname}</code> does not exist.</p>
    </div>
  );
}

export default App
