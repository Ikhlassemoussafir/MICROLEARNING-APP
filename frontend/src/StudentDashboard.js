import React, { useState, useEffect } from 'react';
import GrainDetailSimple from './GrainDetailSimple';
import { Book, Award, Target, Clock, CheckCircle, Play, Brain, Lightbulb, Trophy, Zap, Activity } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { getUser, getAllGrains, getUserProgress, getRecommendations, getUserBadges } from './services/api';

/* ── VARK TEST ── */
function VARKTest({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const questions = [
    { q:"Vous voulez apprendre à utiliser un nouveau logiciel. Que faites-vous ?", opts:[{t:"Regarder quelqu'un le faire",v:"V"},{t:"Écouter quelqu'un l'expliquer",v:"A"},{t:"Lire le manuel",v:"R"},{t:"Essayer par vous-même",v:"K"}] },
    { q:"Vous préparez un examen important. Comment révisez-vous ?", opts:[{t:"Avec des diagrammes et des schémas",v:"V"},{t:"En discutant avec quelqu'un",v:"A"},{t:"En relisant vos notes",v:"R"},{t:"En faisant des exercices pratiques",v:"K"}] },
    { q:"Vous cherchez une adresse dans une ville. Comment procédez-vous ?", opts:[{t:"Utiliser une carte ou GPS",v:"V"},{t:"Demander des indications orales",v:"A"},{t:"Lire l'adresse écrite",v:"R"},{t:"Y aller et trouver par vous-même",v:"K"}] },
    { q:"Pour retenir une information, vous préférez :", opts:[{t:"Voir des images ou vidéos",v:"V"},{t:"L'entendre plusieurs fois",v:"A"},{t:"L'écrire ou la lire",v:"R"},{t:"La mettre en pratique",v:"K"}] },
  ];
  const progress = ((idx+1)/questions.length)*100;
  const handleAnswer = (v) => {
    const na = [...answers, v];
    if (idx < questions.length-1) { setAnswers(na); setIdx(idx+1); }
    else {
      const s={V:0,A:0,R:0,K:0}; na.forEach(a=>s[a]++);
      onComplete({ visual:Math.round(s.V/na.length*100), auditory:Math.round(s.A/na.length*100), reading:Math.round(s.R/na.length*100), kinesthetic:Math.round(s.K/na.length*100) });
    }
  };
  return (
    <div className="bg-page min-h-screen flex items-center justify-center p-6">
      <div className="glass-strong max-w-2xl w-full p-8 animate-fade-up">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold" style={{color:'var(--text-primary)'}}>Test <span className="gradient-text-purple">VARK</span></h2>
          <span className="text-sm" style={{color:'var(--text-muted)'}}>{idx+1}/{questions.length}</span>
        </div>
        <p className="text-sm mb-4" style={{color:'var(--text-secondary)'}}>Découvrez votre style d'apprentissage dominant</p>
        <div className="progress-bar mb-6"><div className="progress-fill" style={{width:`${progress}%`}}/></div>
        <h3 className="text-base font-semibold mb-5 leading-relaxed" style={{color:'var(--text-primary)'}}>{questions[idx].q}</h3>
        <div className="space-y-2">
          {questions[idx].opts.map((o,i)=>(
            <button key={i} onClick={()=>handleAnswer(o.v)}
              className="w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all"
              style={{background:'var(--bg-card)',borderColor:'var(--border-sub)',color:'var(--text-secondary)'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent-purple)';e.currentTarget.style.color='var(--text-primary)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-sub)';e.currentTarget.style.color='var(--text-secondary)';}}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{background:'rgba(139,92,246,0.1)',color:'var(--accent-purple)'}}>{String.fromCharCode(65+i)}</span>
              <span className="text-sm">{o.t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── VARK PROFILE ── */
function VARKProfile({ profile, onRetake }) {
  const data=[{subject:'Visuel',score:profile.visual,fullMark:100},{subject:'Auditif',score:profile.auditory,fullMark:100},{subject:'Lecture',score:profile.reading,fullMark:100},{subject:'Kinésth.',score:profile.kinesthetic,fullMark:100}];
  const dominant=Object.entries({Visuel:profile.visual,Auditif:profile.auditory,Lecture:profile.reading,Kinesthésique:profile.kinesthetic}).sort((a,b)=>b[1]-a[1])[0];
  const bars=[{l:'Visuel',v:profile.visual,c:'#3b82f6'},{l:'Auditif',v:profile.auditory,c:'#8b5cf6'},{l:'Lecture',v:profile.reading,c:'#06b6d4'},{l:'Kinesthésique',v:profile.kinesthetic,c:'#ec4899'}];
  return (
    <div className="glass rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm flex items-center gap-2" style={{color:'var(--text-primary)'}}><Brain size={16} style={{color:'var(--accent-purple)'}}/> Profil VARK</h3>
        <button onClick={onRetake} className="text-xs transition-colors" style={{color:'var(--text-muted)'}} onMouseEnter={e=>e.currentTarget.style.color='var(--accent-purple)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Refaire →</button>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.2)'}}>
        <Trophy size={18} style={{color:'#eab308',flexShrink:0}}/><div><p className="text-[10px]" style={{color:'var(--text-muted)'}}>Style dominant</p><p className="font-bold text-sm" style={{color:'var(--text-primary)'}}>{dominant[0]} <span style={{color:'var(--accent-purple)'}}>{dominant[1]}%</span></p></div>
      </div>
      <div className="space-y-2.5 mb-3">
        {bars.map(b=>(
          <div key={b.l}><div className="flex justify-between text-xs mb-1"><span style={{color:'var(--text-secondary)'}}>{b.l}</span><span className="font-bold" style={{color:'var(--text-primary)'}}>{b.v}%</span></div>
          <div className="progress-bar" style={{height:'4px'}}><div className="progress-fill" style={{width:`${b.v}%`,background:b.c}}/></div></div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <RadarChart data={data}><PolarGrid stroke="var(--border-sub)"/><PolarAngleAxis dataKey="subject" tick={{fill:'var(--text-muted)',fontSize:9}}/><PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:'var(--text-muted)',fontSize:8}}/><Radar dataKey="score" stroke="var(--accent-purple)" fill="var(--accent-purple)" fillOpacity={0.2} strokeWidth={2}/></RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── GRAIN CARD ── */
function GrainCard({ grain, recommended, userProgress, onClick }) {
  const hasAttempted = !!userProgress;
  const isComplete = userProgress?.status==='MAITRISE'||userProgress?.status==='COMPLETE';
  const score = userProgress?.bestScore||0;
  const lvlPill = {DEBUTANT:'pill-emerald',INTERMEDIAIRE:'pill-orange',AVANCE:'pill-pink'}[grain.difficultyLevel]||'pill-gray';
  const lvlLabel = {DEBUTANT:'Débutant',INTERMEDIAIRE:'Intermédiaire',AVANCE:'Avancé'}[grain.difficultyLevel]||grain.difficultyLevel;
  
  let btnText = 'Commencer';
  let btnColor = 'from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500';
  if (isComplete) {
    btnText = 'Revoir';
    btnColor = 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500';
  } else if (hasAttempted) {
    btnText = 'Revoir';
    btnColor = 'from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400';
  }

  return (
    <div onClick={onClick} className={`grain-card ${recommended?'recommended':''}`}>
      {recommended&&<div className="absolute -top-3 left-4"><span className="pill pill-purple shadow-lg"><Zap size={9}/> Recommandé IA</span></div>}
      <div className="flex items-start justify-between mb-2 relative z-10">
        <span className={`pill ${lvlPill}`}>{lvlLabel}</span>
        {isComplete&&<CheckCircle size={16} style={{color:'var(--accent-emerald)'}}/>}
      </div>
      <h4 className="font-semibold text-sm mb-1 line-clamp-2 relative z-10" style={{color:'var(--text-primary)'}}>{grain.title}</h4>
      <p className="text-xs mb-3 line-clamp-2 relative z-10" style={{color:'var(--text-muted)'}}>{grain.description||'Description du grain pédagogique'}</p>
      <div className="flex gap-4 text-xs mb-3 relative z-10" style={{color:'var(--text-muted)'}}>
        <span className="flex items-center gap-1"><Clock size={11}/>{grain.estimatedDuration||5}m</span>
        <span className="flex items-center gap-1"><Target size={11}/>{grain.targetVarkStyle}</span>
      </div>
      {hasAttempted&&(
        <div className="mb-3 relative z-10">
          <div className="flex justify-between text-xs mb-1"><span style={{color:'var(--text-muted)'}}>Meilleur score</span><span className="font-bold" style={{color:score>=70?'var(--accent-emerald)':'var(--accent-orange)'}}>{score}%</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${score}%`,background:score>=70?'linear-gradient(90deg,#10b981,#06b6d4)':'linear-gradient(90deg,#f97316,#ec4899)'}}/></div>
        </div>
      )}
      <button className={`w-full py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${btnColor} transition-all flex items-center justify-center gap-1.5 relative z-10`}>
        <Play size={12}/>{btnText}
      </button>
    </div>
  );
}

/* ── STUDENT DASHBOARD ── */
function StudentDashboard({ userData }) {
  const [showVARK, setShowVARK] = useState(false);
  const [varkProfile, setVARKProfile] = useState(null);
  const [grains, setGrains] = useState([]);
  const [progress, setProgress] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [badges, setBadges] = useState([]);
  const [selectedGrain, setSelectedGrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ loadData(); },[]);

  const loadData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) { setLoading(false); return; }
    try {
      // Chargement parallèle de toutes les données du dashboard
      const [uR, gR, pR, rR, bR] = await Promise.all([
        getUser(userId).catch(() => ({ data: {} })),
        getAllGrains(),
        getUserProgress(userId).catch(() => ({ data: [] })),
        getRecommendations(userId).catch(() => ({ data: [] })),
        getUserBadges(userId).catch(() => ({ data: [] }))
      ]);

      // Récupérer le profil VARK depuis les données utilisateur
      if (uR.data?.varkProfile) {
        setVARKProfile({
          visual: uR.data.varkProfile.visualScore || 0,
          auditory: uR.data.varkProfile.auditoryScore || 0,
          reading: uR.data.varkProfile.readingScore || 0,
          kinesthetic: uR.data.varkProfile.kinestheticScore || 0
        });
      }

      setGrains(gR.data || []);
      setProgress(pR.data || []);
      setRecommendations(rR.data || []);
      setBadges(bR.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Erreur chargement dashboard:', err);
      // Données de démo en cas d'indisponibilité du backend
      setGrains([
        { grainId:1, title:'Introduction aux Bases de Données', description:'Découvrez les concepts fondamentaux des SGBD.', difficultyLevel:'DEBUTANT', targetVarkStyle:'VISUEL', estimatedDuration:5 },
        { grainId:2, title:'La commande SELECT', description:'Interroger une base de données avec SQL.', difficultyLevel:'DEBUTANT', targetVarkStyle:'LECTURE', estimatedDuration:8 },
        { grainId:3, title:'Les Jointures (JOIN)', description:'Combiner des données de plusieurs tables.', difficultyLevel:'INTERMEDIAIRE', targetVarkStyle:'KINESTHESIQUE', estimatedDuration:12 }
      ]);
      setProgress([{ grain:{ grainId:1 }, status:'COMPLETE', bestScore:90, timeSpent:300 }]);
      setBadges([{ badgeType:'FIRST_GRAIN', earnedAt:new Date().toISOString() }]);
      setVARKProfile({ visual:40, auditory:20, reading:30, kinesthetic:10 });
      setLoading(false);
    }
  };

  const completedGrains=progress.filter(p=>p.status==='COMPLETE'||p.status==='MAITRISE').length;
  const avgScore=progress.length>0?Math.round(progress.reduce((s,p)=>s+(p.bestScore||0),0)/progress.length):0;
  const totalTime=progress.reduce((s,p)=>s+(p.timeSpent||0),0);

  const getRecommended=()=>{
    if(recommendations?.length>0){const r=recommendations[0];return grains.find(g=>g.grainId===r.grain?.grainId)||grains[0];}
    const done=progress.filter(p=>p.status==='COMPLETE'||p.status==='MAITRISE').map(p=>p.grain.grainId);
    return grains.find(g=>!done.includes(g.grainId)&&g.difficultyLevel==='DEBUTANT')||grains[0];
  };

  const activityData=[{day:'L',val:2},{day:'M',val:5},{day:'M',val:3},{day:'J',val:7},{day:'V',val:4},{day:'S',val:1},{day:'D',val:3}];

  let sorted=[...grains];
  if(varkProfile){
    const sMap={Visuel:'VISUEL',Auditif:'AUDITIF',Lecture:'LECTURE',Kinesthésique:'KINESTHESIQUE'};
    const dom=Object.entries({Visuel:varkProfile.visual,Auditif:varkProfile.auditory,Lecture:varkProfile.reading,Kinesthésique:varkProfile.kinesthetic}).sort((a,b)=>b[1]-a[1])[0][0];
    const db=sMap[dom];
    sorted.sort((a,b)=>{const am=(a.targetVarkStyle||'').toUpperCase()===db,bm=(b.targetVarkStyle||'').toUpperCase()===db;return am&&!bm?-1:!am&&bm?1:(a.grainId||0)-(b.grainId||0);});
  }

  if(showVARK) return <VARKTest onComplete={p=>{setVARKProfile(p);setShowVARK(false);}}/>;
  if(loading) return <div className="bg-page min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"/></div>;
  if(selectedGrain) return <GrainDetailSimple grain={selectedGrain} varkProfile={varkProfile} onClose={()=>setSelectedGrain(null)} onComplete={()=>setSelectedGrain(null)}/>;

  const recommended=getRecommended();

  return (
    <div className="bg-page min-h-screen">
      <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* Header */}
        <div className="mb-8 animate-fade-up flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{color:'var(--text-muted)'}}>Tableau de bord · Apprenant</p>
            <h1 className="text-3xl font-black" style={{color:'var(--text-primary)'}}>
              Bonjour, <span className="gradient-text-purple italic">{(userData?.firstName||userData?.name||'Étudiant').split(' ')[0]}.</span>
            </h1>
            <p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Continuez votre parcours d'apprentissage adaptatif</p>
          </div>
          <button onClick={()=>setShowVARK(true)} className="btn-ghost"><Brain size={15}/>Refaire VARK</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {label:'Grains validés',value:`${completedGrains}/${grains.length}`,icon:CheckCircle,type:'purple',sub:`Score de maîtrise atteint`},
            {label:'Score moyen',value:`${avgScore}%`,icon:Trophy,type:'cyan',sub:avgScore>=70?'Très bien !':'Continuez ainsi'},
            {label:'Badges gagnés',value:badges.length,icon:Award,type:'orange',sub:'sur 12 disponibles'},
            {label:'Temps total',value:`${Math.round(totalTime/60)}m`,icon:Clock,type:'emerald',sub:'cette semaine'},
          ].map((s,i)=>(
            <div key={i} className={`stat-card ${s.type} animate-fade-up stagger-${i+1}`}>
              <div className="flex items-start justify-between mb-3"><p className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-muted)'}}>{s.label}</p><s.icon size={16} style={{color:'var(--text-muted)'}}/></div>
              <p className="text-3xl font-black mb-1" style={{color:'var(--text-primary)'}}>{s.value}</p>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 animate-fade-up stagger-1">
            {varkProfile
              ? <VARKProfile profile={varkProfile} onRetake={()=>setShowVARK(true)}/>
              : <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.2)'}}><Brain size={28} style={{color:'var(--accent-purple)'}}/></div>
                  <div><h3 className="font-bold mb-1" style={{color:'var(--text-primary)'}}>Découvrez votre style</h3><p className="text-xs mb-4" style={{color:'var(--text-muted)'}}>Passez le test VARK pour des recommandations personnalisées</p><button onClick={()=>setShowVARK(true)} className="btn-primary">Passer le test VARK</button></div>
                </div>
            }
          </div>

          <div className="lg:col-span-2 animate-fade-up stagger-2">
            <div className="glass rounded-2xl p-5 h-full">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-4" style={{color:'var(--text-primary)'}}><Lightbulb size={16} style={{color:'#eab308'}}/> Recommandé par l'IA</h3>
              {recommended&&<GrainCard grain={recommended} recommended userProgress={progress.find(p=>p.grain.grainId===recommended.grainId)} onClick={()=>setSelectedGrain(recommended)}/>}
              <div className="mt-4 pt-4" style={{borderTop:'1px solid var(--border-sub)'}}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2" style={{color:'var(--text-muted)'}}><Activity size={12}/> Activité cette semaine</p>
                <ResponsiveContainer width="100%" height={55}>
                  <AreaChart data={activityData}>
                    <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
                    <XAxis dataKey="day" tick={{fill:'var(--text-muted)',fontSize:9}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{background:'var(--bg-secondary)',border:'1px solid rgba(139,92,246,0.3)',borderRadius:'8px',color:'var(--text-primary)',fontSize:'11px'}}/>
                    <Area type="monotone" dataKey="val" stroke="var(--accent-purple)" fill="url(#sg)" strokeWidth={2} dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* All Grains */}
        <div className="glass rounded-2xl p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-sm flex items-center gap-2" style={{color:'var(--text-primary)'}}><Book size={16} style={{color:'var(--accent-purple)'}}/> Tous les grains pédagogiques</h3>
            <span className="text-xs" style={{color:'var(--text-muted)'}}>{grains.length} grains · {completedGrains} validés</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((grain,i)=>(
              <div key={grain.grainId} className={`stagger-${(i%4)+1}`}>
                <GrainCard grain={grain} recommended={false} userProgress={progress.find(p=>p.grain.grainId===grain.grainId)} onClick={()=>setSelectedGrain(grain)}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
