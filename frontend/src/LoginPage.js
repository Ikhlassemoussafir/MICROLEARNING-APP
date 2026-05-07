import React, { useState } from 'react';
import { User, Lock, Brain, BookOpen, Award, TrendingUp, ArrowRight, Zap, Users } from 'lucide-react';
import { login as apiLogin, getUserByEmail } from './services/api';

function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Appel backend pour login — récupère le JWT
      const loginResponse = await apiLogin({ email, password });
      const { token, email: userEmail, role, message } = loginResponse.data;

      if (!token) {
        setError(message || 'Échec de la connexion : aucun token reçu');
        setIsLoading(false);
        return;
      }

      // 2. Vérifier que le rôle correspond au rôle sélectionné
      if (role !== selectedRole) {
        setError(`Vous êtes connecté en tant que ${role}, pas ${selectedRole}`);
        setIsLoading(false);
        return;
      }

      // 3. Stocker le token JWT et le rôle
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);

      // 4. Récupérer les données complètes de l'utilisateur via son email
      const userResponse = await getUserByEmail(userEmail || email);
      const userData = userResponse.data;

      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('userData', JSON.stringify(userData));

      // 5. Connexion réussie → appeler le callback parent
      onLogin(role, userData);

    } catch (err) {
      console.error('Erreur login:', err);
      if (err.response?.status === 401) {
        setError('Email ou mot de passe incorrect');
      } else if (err.response?.status === 0 || !err.response) {
        setError('Impossible de joindre le serveur. Vérifiez que le backend est lancé sur le port 8080.');
      } else {
        setError(`Erreur de connexion : ${err.response?.data?.message || err.message}`);
      }
      setIsLoading(false);
    }
  };

  const pageStyle = {
    background: 'var(--bg-page)',
    backgroundImage: `radial-gradient(at 30% 30%, var(--orb-1,rgba(124,58,237,0.2)) 0px, transparent 60%),
                      radial-gradient(at 80% 20%, var(--orb-2,rgba(236,72,153,0.12)) 0px, transparent 50%),
                      radial-gradient(at 10% 80%, var(--orb-3,rgba(6,182,212,0.08)) 0px, transparent 50%)`,
  };

  /* ─── ROLE SELECTION ─── */
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden landing-bg">
        <div className="orb orb-1 animate-float-slow" />
        <div className="orb orb-2 animate-float" />
        <div className="relative z-10 w-full max-w-5xl">

          {/* Header */}
          <div className="text-center mb-14 animate-fade-up">
            {/* Logo + Brand */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src="/logo192.png"
                alt="MicroLearning"
                className="w-20 h-20 object-contain animate-float"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(8,64,80,0.6))' }}
              />
              <div className="text-left">
                <h1 className="font-black leading-none animate-pulse-glow" style={{ fontSize: '3.2rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                  MICRO<span className="gradient-text-purple">LEARNING</span>
                </h1>
              </div>
            </div>
            <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Plateforme d'apprentissage adaptatif basée sur le modèle{' '}
              <span className="font-semibold" style={{ color: '#29B6D2' }}>VARK</span> et l'IA générative
            </p>
          </div>


          {/* Stats */}
          <div className="flex justify-center gap-10 mb-12 animate-fade-up stagger-1">
            {[
              { value: '9', label: 'Grains pédagogiques', color: 'var(--accent-purple)' },
              { value: '4',  label: 'Styles VARK',          color: 'var(--accent-pink)' },
              { value: 'IA', label: 'Recommandations',       color: 'var(--accent-cyan)' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-up stagger-2">
            {/* APPRENANT */}
            <button onClick={() => setSelectedRole('APPRENANT')}
              className="group glass-fire p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              style={{ '--hover-border': 'rgba(139,92,246,0.8)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.8)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <User size={28} className="text-white" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border transition-all" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                  <ArrowRight size={15} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#f8fafc' }}>Apprenant</h3>
              <p className="text-sm mb-6" style={{ color: '#cbd5e1' }}>Accédez à votre parcours personnalisé avec recommandations IA</p>
              <div className="space-y-2.5">
                {[
                  { icon: Brain,    text: 'Test VARK personnalisé',  color: 'var(--accent-purple)' },
                  { icon: BookOpen, text: 'Grains micro-learning',    color: 'var(--accent-cyan)' },
                  { icon: Award,    text: 'Système de badges',        color: 'var(--accent-pink)' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#e2e8f0' }}>
                    <f.icon size={14} style={{ color: f.color }} /> {f.text}
                  </div>
                ))}
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <p className="text-xs mt-4 font-medium" style={{ color: 'rgba(139,92,246,0.7)' }}>Continuer en tant qu'apprenant →</p>
            </button>

            {/* ENSEIGNANT */}
            <button onClick={() => setSelectedRole('ENSEIGNANT')}
              className="group glass-fire p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(236,72,153,0.8)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={28} className="text-white" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border transition-all" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                  <ArrowRight size={15} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#f8fafc' }}>Enseignant</h3>
              <p className="text-sm mb-6" style={{ color: '#cbd5e1' }}>Gérez vos grains et suivez les performances de vos étudiants</p>
              <div className="space-y-2.5">
                {[
                  { icon: BookOpen,   text: 'Gestion des grains multimédias',    color: 'var(--accent-pink)' },
                  { icon: TrendingUp, text: 'Statistiques détaillées',    color: 'var(--accent-orange)' },
                  { icon: Users,      text: 'Suivi individuel',           color: 'var(--accent-cyan)' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#e2e8f0' }}>
                    <f.icon size={14} style={{ color: f.color }} /> {f.text}
                  </div>
                ))}
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
              <p className="text-xs mt-4 font-medium" style={{ color: 'rgba(236,72,153,0.7)' }}>Continuer en tant qu'enseignant →</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── LOGIN FORM ─── */
  const isTeacher = selectedRole === 'ENSEIGNANT';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden landing-bg">
      <div className="orb orb-1 animate-float-slow" /><div className="orb orb-2 animate-float" />
      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <button onClick={() => setSelectedRole(null)}
          className="flex items-center gap-2 text-sm mb-8 group transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color='var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Retour au choix du rôle
        </button>

        <div className="glass-fire p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${isTeacher ? 'bg-gradient-to-br from-pink-600 to-rose-700' : 'bg-gradient-to-br from-purple-600 to-violet-700'}`}>
              {isTeacher ? <TrendingUp size={32} className="text-white" /> : <User size={32} className="text-white" />}
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Connexion{' '}
              <span style={{ color: isTeacher ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
                {isTeacher ? 'Enseignant' : 'Apprenant'}
              </span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Entrez vos identifiants pour continuer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#f87171' }}>
                ⚠ {error}
              </div>
            )}
            <div>
              <label className="label-field">Email</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: 'var(--text-muted)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={isTeacher ? 'prof.alami@ensa.ma' : 'youssef.amrani@ensa.ma'}
                  required className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="label-field">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: 'var(--text-muted)' }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required className="input-field pl-10" />
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'} ${isTeacher ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gradient-to-r from-purple-600 to-violet-600'}`}
              style={{ boxShadow: isLoading ? 'none' : isTeacher ? '0 8px 24px rgba(236,72,153,0.3)' : '0 8px 24px rgba(139,92,246,0.3)' }}>
              {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Connexion...</> : <><Zap size={15} /> Se connecter</>}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
            Utilisez les identifiants de votre compte
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
