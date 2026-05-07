import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Award, Home, LogOut, Menu, X, BarChart3 } from 'lucide-react';

import { ThemeProvider, useTheme } from './ThemeContext';
import TeacherDashboard from './TeacherDashboard';
import BadgesPage from './BadgesPage';
import StudentDashboard from './StudentDashboard';
import LoginPage from './LoginPage';

/* ══════════════════════════════════════
   THEME TOGGLE BUTTON
══════════════════════════════════════ */
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? '☀️ Passer en mode clair' : '🌙 Passer en mode sombre'}
      className={`theme-toggle ${isDark ? '' : 'light'}`}
      aria-label="Basculer le thème"
      style={{ position: 'relative' }}
    >
      <div className="theme-toggle-knob" />
      <span style={{ position:'absolute', right: isDark ? 'auto' : 3, left: isDark ? 3 : 'auto', top:'50%', transform:'translateY(-50%)', fontSize:9, pointerEvents:'none', userSelect:'none' }}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>

  );
}

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
function Navigation({ userRole, userData, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const studentLinks = [
    { to: '/dashboard', icon: Home,     label: 'Tableau de bord' },
    { to: '/badges',    icon: Award,    label: 'Badges' },
  ];
  const teacherLinks = [
    { to: '/teacher',   icon: BarChart3, label: 'Dashboard' },
  ];
  const links = userRole === 'ENSEIGNANT' ? teacherLinks : studentLinks;
  const isActive = (to) => location.pathname === to;

  const initial = (userData?.firstName || userData?.name || 'U').charAt(0).toUpperCase();
  const displayName = userData?.firstName || userData?.name || 'Utilisateur';

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to={userRole === 'ENSEIGNANT' ? '/teacher' : '/dashboard'} className="flex items-center gap-2.5 group">
            <img
              src="/logo192.png"
              alt="MicroLearning logo"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(8,64,80,0.5))' }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                MICRO<span style={{ color: '#29B6D2' }}>LEARNING</span>
              </span>
              <span className="text-[9px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>VARK · IA Adaptatif</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.to} to={link.to}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/25'
                    : 'hover:bg-white/5'
                }`}
                style={{ color: isActive(link.to) ? undefined : 'var(--text-muted)' }}
              >
                <link.icon size={15} /> {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {initial}
              </div>
              <div>
                <p className="text-xs font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>{displayName}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {userRole === 'ENSEIGNANT' ? 'Enseignant' : 'Apprenant'}
                </p>
              </div>
            </div>

            <button onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-transparent hover:border-red-500/20 hover:bg-red-500/8"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color='#f87171'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
            >
              <LogOut size={14} /> Déconnexion
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t space-y-1" style={{ borderColor: 'var(--border-sub)' }}>
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(link.to) ? 'bg-purple-500/15 text-purple-400' : 'hover:bg-white/5'}`}
                style={{ color: isActive(link.to) ? undefined : 'var(--text-muted)' }}>
                <link.icon size={16} /> {link.label}
              </Link>
            ))}
            <button onClick={() => { setIsMenuOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/8 transition-all"
              style={{ color: 'var(--text-muted)' }}>
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════
   APP
══════════════════════════════════════ */
function AppInner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('userData');
    if (storedAuth === 'true' && storedRole && storedUser) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserData(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (role, user) => {
    setIsAuthenticated(true); setUserRole(role); setUserData(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userData', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false); setUserRole(null); setUserData(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  };

  if (loading) return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Chargement...</p>
      </div>
    </div>
  );

  return (
    <Router>
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="bg-page min-h-screen">
          <Navigation userRole={userRole} userData={userData} onLogout={handleLogout} />
          <Routes>
            {userRole === 'APPRENANT' && (
              <>
                <Route path="/dashboard" element={<StudentDashboard userData={userData} />} />
                <Route path="/badges"    element={<BadgesPage />} />
                <Route path="*"          element={<Navigate to="/dashboard" replace />} />
              </>
            )}
            {userRole === 'ENSEIGNANT' && (
              <>
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="*"        element={<Navigate to="/teacher" replace />} />
              </>
            )}
          </Routes>
        </div>
      )}
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;