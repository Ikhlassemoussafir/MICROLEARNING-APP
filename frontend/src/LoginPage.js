import React, { useState } from 'react';
import { User, Lock, Brain, BookOpen, Award, TrendingUp, ArrowRight, Zap, Users, Sun, Moon } from 'lucide-react';
import { login as apiLogin, register as apiRegister, getUserByEmail } from './services/api';
import { useTheme } from './ThemeContext';

function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark, toggle } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let authResponseData;

      if (isRegistering) {
        // 1A. Inscription
        const res = await apiRegister({
          email,
          password,
          firstName,
          lastName,
          role: selectedRole
        });
        authResponseData = res.data;
      } else {
        // 1B. Connexion
        const res = await apiLogin({ email, password });
        authResponseData = res.data;
      }

      const { token, email: userEmail, role, message } = authResponseData;

      if (!token) {
        setError(message || (isRegistering ? 'Échec de l\'inscription' : 'Échec de la connexion'));
        setIsLoading(false);
        return;
      }

      // 2. Vérifier que le rôle correspond au rôle sélectionné
      if (role !== selectedRole) {
        setError(`Le compte appartient à un ${role}, pas ${selectedRole}`);
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
      console.error('Erreur Auth:', err);
      if (err.response?.status === 401) {
        setError('Email ou mot de passe incorrect');
      } else if (err.response?.status === 400 && isRegistering) {
        setError(`Erreur d'inscription : ${err.response?.data?.message || 'Données invalides ou email déjà utilisé'}`);
      } else if (err.response?.status === 0 || !err.response) {
        setError('Impossible de joindre le serveur. Vérifiez que le backend est lancé sur le port 8080.');
      } else {
        setError(`Erreur : ${err.response?.data?.message || err.message}`);
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
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-page transition-colors duration-500">
        
        {/* THEME TOGGLE */}
        <div className="absolute top-6 right-6 z-50 animate-fade-in">
          <button onClick={toggle} title={isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'} className={`theme-toggle ${isDark ? '' : 'light'}`} style={{ position: 'relative' }}>
            <div className="theme-toggle-knob" />
            <span style={{ position:'absolute', right: isDark ? 'auto' : 3, left: isDark ? 3 : 'auto', top:'50%', transform:'translateY(-50%)', fontSize:9, pointerEvents:'none', userSelect:'none' }}>{isDark ? '🌙' : '☀️'}</span>
          </button>
        </div>

        <div className="orb orb-1 animate-float-slow" />
        <div className="orb orb-2 animate-float" />
        <div className="relative z-10 w-full max-w-5xl">

          {/* Header */}
          <div className="text-center mb-14 animate-fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src="/logo192.png"
                alt="MicroLearning"
                className="w-24 h-24 object-contain animate-float"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(8,64,80,0.6))' }}
              />
              <div className="text-left">
                <h1 className="font-black leading-none animate-pulse-glow" style={{ fontSize: '3.5rem', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                  MICRO<span className="gradient-text-purple">LEARNING</span>
                </h1>
              </div>
            </div>
            <p className="text-xl max-w-2xl mx-auto font-medium" style={{ color: 'var(--text-secondary)' }}>
              Ne subissez plus l'apprentissage, <span className="font-bold" style={{ color: 'var(--accent-purple)' }}>vivez-le</span>. <br/>
              Des parcours sur-mesure sculptés par l'IA et votre profil cognitif.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-14 animate-fade-up stagger-1">
            {[
              { value: 'Interactif', label: 'Modules Immersifs', color: 'var(--accent-purple)' },
              { value: 'VARK',       label: 'Profils Cognitifs', color: 'var(--accent-pink)' },
              { value: 'IA',         label: 'Hyper-Adaptation',  color: 'var(--accent-cyan)' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1 uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 animate-fade-up stagger-2">
            {/* APPRENANT */}
            <button onClick={() => setSelectedRole('APPRENANT')}
              className="group glass-fire p-10 text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
              style={{ '--hover-border': 'var(--accent-purple)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-purple)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Brain size={32} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border transition-all group-hover:bg-purple-600/10 group-hover:border-purple-500" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                  <ArrowRight size={18} className="transition-colors group-hover:text-purple-400" style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>Je suis Apprenant</h3>
              <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Découvrez une méthode qui s'adapte à votre façon de penser. Laissez l'IA construire le chemin le plus rapide vers votre réussite.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Brain,    text: 'Test VARK & Diagnostic initial',    color: 'var(--accent-purple)' },
                  { icon: Zap,      text: 'Grains d\'apprentissage dynamiques', color: 'var(--accent-cyan)' },
                  { icon: Award,    text: 'Gamification et badges d\'expert',  color: 'var(--accent-pink)' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <div className="p-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                      <f.icon size={18} style={{ color: f.color }} />
                    </div>
                    {f.text}
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <p className="text-sm mt-5 font-bold uppercase tracking-wider" style={{ color: 'var(--accent-purple)' }}>Rejoindre l'aventure →</p>
            </button>

            {/* ENSEIGNANT */}
            <button onClick={() => setSelectedRole('ENSEIGNANT')}
              className="group glass-fire p-10 text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-pink)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border transition-all group-hover:bg-pink-600/10 group-hover:border-pink-500" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                  <ArrowRight size={18} className="transition-colors group-hover:text-pink-400" style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>Je suis Formateur</h3>
              <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Donnez vie à vos contenus. Analysez, adaptez et propulsez l'engagement de vos étudiants à des niveaux inédits.
              </p>
              <div className="space-y-4">
                {[
                  { icon: BookOpen,   text: 'Éditeur de contenus multimédias',       color: 'var(--accent-pink)' },
                  { icon: TrendingUp, text: 'Insights et analytiques en temps réel', color: 'var(--accent-orange)' },
                  { icon: Users,      text: 'Suivi de cohorte et IA de remédiation', color: 'var(--accent-cyan)' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <div className="p-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-sub)' }}>
                      <f.icon size={18} style={{ color: f.color }} />
                    </div>
                    {f.text}
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
              <p className="text-sm mt-5 font-bold uppercase tracking-wider" style={{ color: 'var(--accent-pink)' }}>Accéder au tableau de bord →</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── LOGIN FORM ─── */
  const isTeacher = selectedRole === 'ENSEIGNANT';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-page transition-colors duration-500">
      
      {/* THEME TOGGLE */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggle} title={isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'} className={`theme-toggle ${isDark ? '' : 'light'}`} style={{ position: 'relative' }}>
          <div className="theme-toggle-knob" />
          <span style={{ position:'absolute', right: isDark ? 'auto' : 3, left: isDark ? 3 : 'auto', top:'50%', transform:'translateY(-50%)', fontSize:9, pointerEvents:'none', userSelect:'none' }}>{isDark ? '🌙' : '☀️'}</span>
        </button>
      </div>

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
              {isRegistering ? 'Inscription' : 'Connexion'}{' '}
              <span style={{ color: isTeacher ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
                {isTeacher ? 'Enseignant' : 'Apprenant'}
              </span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {isRegistering ? 'Créez votre compte pour démarrer' : 'Entrez vos identifiants pour continuer'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#f87171' }}>
                ⚠ {error}
              </div>
            )}

            {isRegistering && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="label-field">Prénom</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                    placeholder="Prénom" required className="input-field" />
                </div>
                <div className="flex-1">
                  <label className="label-field">Nom</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                    placeholder="Nom" required className="input-field" />
                </div>
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
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Patientez...</>
              ) : (
                <><Zap size={15} /> {isRegistering ? "S'inscrire" : "Se connecter"}</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dashed text-center" style={{ borderColor: 'var(--border-sub)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {isRegistering ? 'Vous avez déjà un compte ?' : "Vous n'avez pas de compte ?"}
            </p>
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="mt-2 text-sm font-bold uppercase tracking-wider transition-colors"
              style={{ color: isTeacher ? 'var(--accent-pink)' : 'var(--accent-purple)' }}
            >
              {isRegistering ? 'Se connecter' : 'Créer un compte'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
