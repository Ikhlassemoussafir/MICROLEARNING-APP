import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Zap, Target, TrendingUp, CheckCircle, Book, Crown, Flame, Medal, Lock, Sparkles } from 'lucide-react';
import { getUserBadges } from './services/api';

function BadgesPage() {
  const [filter, setFilter] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [allBadges, setAllBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) { setLoading(false); return; }
      try {
        const res = await getUserBadges(userId).catch(() => ({ data: [] }));
        const earned = res.data;
        const cfg = [
          { id:'FIRST_GRAIN',   name:'Premier Pas',      desc:'Compléter votre premier grain',          icon:Book,       grad:'from-blue-500 to-cyan-500',       rarity:'common' },
          { id:'PERFECT_SCORE', name:'Perfection',        desc:'Obtenir 100% à un quiz',                 icon:Star,       grad:'from-yellow-400 to-orange-500',    rarity:'rare' },
          { id:'STREAK_3',      name:'En Série',          desc:'3 grains consécutifs avec >70%',         icon:Flame,      grad:'from-red-500 to-pink-500',         rarity:'rare' },
          { id:'FAST_LEARNER',  name:'Apprenant Rapide',  desc:'Grain complété en moins de 3 minutes',  icon:Zap,        grad:'from-purple-500 to-indigo-500',    rarity:'uncommon' },
          { id:'MODULE_MASTER', name:'Maître du Module',  desc:"Compléter tous les grains d'un module", icon:Trophy,     grad:'from-emerald-400 to-teal-500',     rarity:'epic' },
          { id:'STREAK_7',      name:'Semaine Parfaite',  desc:"7 jours consécutifs d'apprentissage",   icon:Crown,      grad:'from-amber-400 to-orange-600',     rarity:'epic' },
          { id:'ALL_LEVELS',    name:'Polyvalent',        desc:'Un grain de chaque niveau',              icon:Target,     grad:'from-indigo-400 to-purple-500',    rarity:'rare' },
          { id:'HIGH_ACHIEVER', name:'Excellence',        desc:'Moyenne générale >85%',                  icon:TrendingUp, grad:'from-blue-500 to-cyan-400',        rarity:'epic' },
          { id:'SPEED_DEMON',   name:'Éclair',            desc:'5 grains en moins de 20 minutes',        icon:Zap,        grad:'from-yellow-300 to-amber-500',     rarity:'legendary' },
          { id:'COMPLETIONIST', name:'Complétiste',       desc:'Compléter tous les grains du cours',     icon:Medal,      grad:'from-orange-500 to-red-600',       rarity:'legendary' },
          { id:'VARK_MASTER',   name:'Expert VARK',       desc:'Score >80% dans votre style dominant',   icon:Sparkles,   grad:'from-pink-400 to-purple-500',      rarity:'rare' },
          { id:'HELPER',        name:'Entraide',          desc:'Aider 3 autres étudiants',               icon:Award,      grad:'from-teal-400 to-emerald-500',     rarity:'uncommon' },
        ];
        const req = { FIRST_GRAIN:'Compléter 1 grain', PERFECT_SCORE:'Score de 100%', STREAK_3:'3 grains consécutifs', FAST_LEARNER:'Temps < 3 min', MODULE_MASTER:'Module complet', STREAK_7:"7 jours d'affilée", ALL_LEVELS:'Tous les niveaux', HIGH_ACHIEVER:'Moyenne >85%', SPEED_DEMON:'5 grains en 20min', COMPLETIONIST:'Tous les grains', VARK_MASTER:'Style VARK maîtrisé', HELPER:'3 étudiants aidés' };
        setAllBadges(cfg.map(b => { const e = earned.find(x => x.badgeType === b.id); return { ...b, requirement: req[b.id] || '', unlocked: !!e, unlockedAt: e ? e.earnedAt : null }; }));
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const rarityConfig = {
    common:    { label:'Commun',     pill:'pill-gray',    glow:'rgba(100,116,139,0.3)' },
    uncommon:  { label:'Peu commun', pill:'pill-emerald', glow:'rgba(16,185,129,0.3)' },
    rare:      { label:'Rare',       pill:'pill-cyan',    glow:'rgba(6,182,212,0.3)' },
    epic:      { label:'Épique',     pill:'pill-purple',  glow:'rgba(139,92,246,0.3)' },
    legendary: { label:'Légendaire', pill:'pill-orange',  glow:'rgba(249,115,22,0.4)' },
  };

  if (loading) return <div className="bg-page min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"/></div>;

  const unlocked = allBadges.filter(b => b.unlocked);
  const locked   = allBadges.filter(b => !b.unlocked);
  const display  = filter === 'unlocked' ? unlocked : filter === 'locked' ? locked : allBadges;
  const pct      = allBadges.length > 0 ? Math.round(unlocked.length / allBadges.length * 100) : 0;

  return (
    <div className="bg-page min-h-screen">
      <div className="orb orb-1"/><div className="orb orb-2"/>
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{color:'var(--text-muted)'}}>Récompenses</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black" style={{color:'var(--text-primary)'}}>
                <span className="gradient-text">{unlocked.length}</span>
                <span style={{color:'var(--text-muted)'}}> / {allBadges.length}</span>
                <span className="text-2xl font-bold ml-2" style={{color:'var(--text-secondary)'}}>badges</span>
              </h1>
              <p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Marquez vos progrès. Collectez-les tous.</p>
            </div>
            <div style={{width:280}}>
              <div className="flex justify-between text-xs mb-1.5" style={{color:'var(--text-muted)'}}>
                <span>Progression</span><span style={{color:'var(--accent-purple)',fontWeight:600}}>{pct}%</span>
              </div>
              <div className="progress-bar" style={{height:8}}><div className="progress-fill" style={{width:`${pct}%`}}/></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 animate-fade-up stagger-1">
          {[{key:'all',l:`Tous : ${allBadges.length}`},{key:'unlocked',l:`Débloqués : ${unlocked.length}`},{key:'locked',l:`À débloquer : ${locked.length}`}].map(t=>(
            <button key={t.key} onClick={()=>setFilter(t.key)}
              className="px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all"
              style={filter===t.key?{background:'rgba(139,92,246,0.2)',borderColor:'rgba(139,92,246,0.4)',color:'var(--accent-purple)'}:{background:'transparent',borderColor:'var(--border-sub)',color:'var(--text-muted)'}}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-up stagger-2">
          {display.map((badge, i) => {
            const rc = rarityConfig[badge.rarity] || rarityConfig.common;
            const Icon = badge.icon;
            return (
              <div key={badge.id} onClick={() => badge.unlocked && setSelectedBadge(badge)}
                className={`grain-card p-5 flex flex-col items-center text-center stagger-${(i%4)+1} ${badge.unlocked ? 'cursor-pointer hover:-translate-y-2' : 'cursor-default'}`}
                style={badge.unlocked ? {} : { opacity: 0.4 }}>
                <span className={`pill ${rc.pill} mb-3`}>{rc.label}</span>
                <div className={`w-14 h-14 rounded-2xl mb-3 flex items-center justify-center shadow-lg ${badge.unlocked ? `bg-gradient-to-br ${badge.grad}` : ''}`}
                  style={badge.unlocked ? { boxShadow:`0 8px 24px ${rc.glow}` } : { background:'var(--bg-card)', border:'1px solid var(--border-sub)' }}>
                  {badge.unlocked ? <Icon size={28} className="text-white"/> : <Lock size={22} style={{color:'var(--text-muted)'}}/>}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{color:badge.unlocked?'var(--text-primary)':'var(--text-muted)'}}>{badge.name}</h3>
                <p className="text-xs line-clamp-2 leading-relaxed" style={{color:'var(--text-muted)'}}>{badge.desc}</p>
                {badge.unlocked && badge.unlockedAt ? (
                  <p className="text-[10px] mt-2 flex items-center gap-1" style={{color:'var(--accent-emerald)'}}><CheckCircle size={9}/>{new Date(badge.unlockedAt).toLocaleDateString('fr-FR')}</p>
                ) : !badge.unlocked ? (
                  <p className="text-[10px] mt-2 px-2 py-1 rounded-lg" style={{color:'var(--text-muted)',background:'var(--bg-card)'}}>{badge.requirement}</p>
                ) : null}
                {badge.unlocked && <div className="absolute top-2 right-2"><Sparkles size={11} style={{color:'rgba(234,179,8,0.6)'}}/></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedBadge && (() => {
        const rc = rarityConfig[selectedBadge.rarity] || rarityConfig.common;
        const Icon = selectedBadge.icon;
        return (
          <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4" onClick={()=>setSelectedBadge(null)}>
            <div className="glass-strong max-w-sm w-full p-8 animate-fade-up" onClick={e=>e.stopPropagation()}>
              <div className={`w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center bg-gradient-to-br ${selectedBadge.grad}`} style={{boxShadow:`0 16px 40px ${rc.glow}`}}>
                <Icon size={48} className="text-white"/>
              </div>
              <div className="text-center mb-4"><span className={`pill ${rc.pill}`}>{rc.label}</span></div>
              <h2 className="text-2xl font-black text-center mb-2" style={{color:'var(--text-primary)'}}>{selectedBadge.name}</h2>
              <p className="text-center text-sm mb-4" style={{color:'var(--text-secondary)'}}>{selectedBadge.desc}</p>
              <div className="rounded-xl p-3 mb-4 text-center" style={{background:'var(--bg-card)',border:'1px solid var(--border-sub)'}}>
                <p className="text-xs" style={{color:'var(--text-muted)'}}>Condition</p>
                <p className="text-sm font-semibold mt-0.5" style={{color:'var(--text-primary)'}}>{selectedBadge.requirement}</p>
              </div>
              {selectedBadge.unlockedAt && (
                <div className="rounded-xl p-3 mb-4 flex items-center justify-center gap-2" style={{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)'}}>
                  <CheckCircle size={15} style={{color:'var(--accent-emerald)'}}/>
                  <p className="text-sm font-semibold" style={{color:'var(--accent-emerald)'}}>Débloqué le {new Date(selectedBadge.unlockedAt).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>
                </div>
              )}
              <button onClick={()=>setSelectedBadge(null)} className="btn-primary w-full justify-center py-3">Fermer</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default BadgesPage;
