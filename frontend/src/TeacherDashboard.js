import React, { useState, useEffect } from 'react';
import { Users, BookOpen, TrendingUp, AlertCircle, Plus, Edit, Trash2, BarChart3, Activity, Clock, Target, Award, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPie, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import CreateGrainModal from './CreateGrainModal';
import { createGrain, updateGrain, deleteGrain } from './services/api';

function TeacherDashboard() {
  const [grains, setGrains] = useState([]);
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [grainToEdit, setGrainToEdit] = useState(null);

  const mockStats = { totalStudents:24, activeStudents:18, totalGrains:15, publishedGrains:15, averageClassScore:76, completionRate:62, strugglingStudents:5 };
  const mockStudents = [
    {name:'Youssef A.',completed:8,score:85,status:'excellent'},{name:'Fatima Z.',completed:7,score:78,status:'good'},
    {name:'Mohammed K.',completed:6,score:72,status:'good'},{name:'Sara B.',completed:4,score:58,status:'struggling'},
    {name:'Ahmed M.',completed:3,score:52,status:'struggling'},{name:'Imane L.',completed:9,score:92,status:'excellent'},
    {name:'Hassan R.',completed:5,score:65,status:'average'},{name:'Nadia T.',completed:7,score:81,status:'excellent'},
  ];
  const weeklyData = [{day:'L',grains:12,students:15},{day:'M',grains:18,students:17},{day:'M',grains:15,students:16},{day:'J',grains:22,students:19},{day:'V',grains:25,students:20},{day:'S',grains:8,students:10},{day:'D',grains:5,students:8}];
  const grainPerf = [{name:'BDD Intro',completion:95,avgScore:88},{name:'Tables',completion:92,avgScore:85},{name:'Clés',completion:88,avgScore:79},{name:'SELECT',completion:75,avgScore:72},{name:'WHERE',completion:68,avgScore:70},{name:'JOINs',completion:52,avgScore:65}];
  const varkDist = [{name:'Visuel',value:8,color:'#3b82f6'},{name:'Auditif',value:5,color:'#8b5cf6'},{name:'Lecture',value:6,color:'#06b6d4'},{name:'Kinésth.',value:5,color:'#ec4899'}];

  useEffect(()=>{ loadData(); },[]);

  const loadData = async () => {
    try {
      const {getAllGrains,getUsersByRole,getUserProgress}=require('./services/api');
      const gR=await getAllGrains(); setGrains(gR.data);
      const sR=await getUsersByRole('APPRENANT');
      const allS=sR.data;
      let totC=0,totSc=0,scN=0,strug=0;
      const sd=await Promise.all(allS.map(async s=>{
        const pr=await getUserProgress(s.userId).catch(()=>({data:[]}));
        const p=pr.data;
        const done=p.filter(x=>x.status==='COMPLETE'||x.status==='MAITRISE').length;
        const sc=p.length>0?Math.round(p.reduce((a,x)=>a+(x.bestScore||0),0)/p.length):0;
        const st=sc>=80?'excellent':sc>=70?'good':(sc<60&&done>0)?'struggling':'average';
        if(st==='struggling')strug++;
        totC+=done; if(p.length>0){totSc+=sc;scN++;}
        return{name:`${s.firstName} ${s.lastName}`,completed:done,score:sc,status:st};
      }));
      setStudents(sd);
      setStatistics({totalStudents:allS.length,activeStudents:sd.filter(s=>s.completed>0).length,totalGrains:gR.data.length,publishedGrains:gR.data.filter(g=>g.isPublished).length,averageClassScore:scN>0?Math.round(totSc/scN):0,completionRate:allS.length>0&&gR.data.length>0?Math.round(totC/(allS.length*gR.data.length)*100):0,strugglingStudents:strug});
      setLoading(false);
    } catch { setStatistics(mockStats); setStudents(mockStudents); setLoading(false); }
  };

  const statusCfg = { excellent:{label:'Excellent',pill:'pill-emerald'}, good:{label:'Bon',pill:'pill-cyan'}, average:{label:'Moyen',pill:'pill-orange'}, struggling:{label:'En difficulté',pill:'pill-pink'} };

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer ce grain ?')){
      try{await deleteGrain(id);loadData();}catch{alert('Erreur de suppression.');}
    }
  };

  const handleExport = () => {
    if(!students.length)return;
    const csv=[['Nom','Complétés','Score','Statut'].join(','),...students.map(s=>`"${s.name}",${s.completed},${s.score},"${statusCfg[s.status]?.label||s.status}"`)].join('\n');
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})); a.download='stats_etudiants.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const stats = statistics || mockStats;

  const tooltipStyle = { contentStyle:{background:'var(--bg-secondary)',border:'1px solid rgba(139,92,246,0.3)',borderRadius:'10px',color:'var(--text-primary)',fontSize:'12px'} };

  if(loading) return <div className="bg-page min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"/></div>;

  return (
    <div className="bg-page min-h-screen">
      <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{color:'var(--text-muted)'}}>Tableau de bord · Enseignant</p>
            <h1 className="text-3xl font-black" style={{color:'var(--text-primary)'}}>Dashboard <span className="gradient-text-warm">Enseignant</span></h1>
            <p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Gestion intelligente des parcours VARK</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="btn-ghost"><Download size={15}/> Exporter CSV</button>
            <button onClick={()=>{setGrainToEdit(null);setIsCreateModalOpen(true);}} className="btn-primary"><Plus size={15}/> Créer un grain</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {label:'Étudiants actifs',value:`${stats.activeStudents}/${stats.totalStudents}`,icon:Users,type:'cyan',sub:'inscrits au cours'},
            {label:'Score moyen',value:`${stats.averageClassScore}%`,icon:Award,type:'purple',sub:'toutes tentatives'},
            {label:'Taux de complétion',value:`${stats.completionRate}%`,icon:Activity,type:'emerald',sub:'grains terminés'},
            {label:'En difficulté',value:stats.strugglingStudents,icon:AlertCircle,type:'orange',sub:'attention requise'},
          ].map((s,i)=>(
            <div key={i} className={`stat-card ${s.type} animate-fade-up stagger-${i+1}`}>
              <div className="flex items-start justify-between mb-3"><p className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-muted)'}}>{s.label}</p><s.icon size={16} style={{color:'var(--text-muted)'}}/></div>
              <p className="text-3xl font-black mb-1" style={{color:'var(--text-primary)'}}>{s.value}</p>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-2xl p-5 animate-fade-up stagger-1">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4" style={{color:'var(--text-primary)'}}><BarChart3 size={15} style={{color:'var(--accent-purple)'}}/> Activité hebdomadaire</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{fill:'var(--text-muted)',fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'var(--text-muted)',fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip {...tooltipStyle}/>
                <Legend wrapperStyle={{fontSize:'11px',color:'var(--text-secondary)'}}/>
                <Area type="monotone" dataKey="grains" stroke="#8b5cf6" fill="url(#g1)" strokeWidth={2} name="Grains"/>
                <Area type="monotone" dataKey="students" stroke="#06b6d4" fill="url(#g2)" strokeWidth={2} name="Étudiants"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-5 animate-fade-up stagger-2">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4" style={{color:'var(--text-primary)'}}><Target size={15} style={{color:'var(--accent-pink)'}}/> Distribution VARK</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={160} height={160}>
                <RPie>
                  <Pie data={varkDist} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {varkDist.map((e,i)=><Cell key={i} fill={e.color} opacity={0.85}/>)}
                  </Pie>
                  <Tooltip {...tooltipStyle}/>
                </RPie>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2.5">
                {varkDist.map((d,i)=>(
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1"><span className="flex items-center gap-1.5" style={{color:'var(--text-secondary)'}}><span className="w-2 h-2 rounded-full" style={{background:d.color}}/>{d.name}</span><span className="font-bold" style={{color:'var(--text-primary)'}}>{d.value}</span></div>
                    <div className="progress-bar" style={{height:'3px'}}><div className="progress-fill" style={{width:`${d.value/24*100}%`,background:d.color}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grain Performance */}
        <div className="glass rounded-2xl p-5 mb-8 animate-fade-up">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4" style={{color:'var(--text-primary)'}}><TrendingUp size={15} style={{color:'var(--accent-emerald)'}}/> Performance par grain</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={grainPerf} barGap={4}>
              <XAxis dataKey="name" tick={{fill:'var(--text-muted)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis domain={[0,100]} tick={{fill:'var(--text-muted)',fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip {...tooltipStyle}/>
              <Legend wrapperStyle={{fontSize:'11px',color:'var(--text-secondary)'}}/>
              <Bar dataKey="completion" name="Complétion %" fill="#8b5cf6" radius={[4,4,0,0]} opacity={0.85}/>
              <Bar dataKey="avgScore" name="Score moyen %" fill="#06b6d4" radius={[4,4,0,0]} opacity={0.85}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grains Table */}
        <div className="glass rounded-2xl overflow-hidden mb-8 animate-fade-up">
          <div className="px-6 py-4 flex items-center justify-between" style={{borderBottom:'1px solid var(--border-sub)'}}>
            <h3 className="font-bold text-sm flex items-center gap-2" style={{color:'var(--text-primary)'}}><BookOpen size={15} style={{color:'var(--accent-purple)'}}/> Gestion des grains pédagogiques</h3>
            <span className="text-xs" style={{color:'var(--text-muted)'}}>{grains.length} grains</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="tbl-head"><th className="tbl-head px-5 py-3 text-left text-xs uppercase tracking-wider font-semibold" style={{color:'var(--text-muted)'}}>ID · Titre</th><th className="px-5 py-3 text-left text-xs uppercase tracking-wider font-semibold" style={{color:'var(--text-muted)'}}>Niveau</th><th className="px-5 py-3 text-left text-xs uppercase tracking-wider font-semibold" style={{color:'var(--text-muted)'}}>VARK</th><th className="px-5 py-3 text-left text-xs uppercase tracking-wider font-semibold" style={{color:'var(--text-muted)'}}>Durée</th><th className="px-5 py-3 text-right text-xs uppercase tracking-wider font-semibold" style={{color:'var(--text-muted)'}}>Actions</th></tr></thead>
              <tbody>
                {grains.map(g=>(
                  <tr key={g.grainId} className="tbl-row">
                    <td className="tbl-cell">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{background:'rgba(139,92,246,0.1)',color:'var(--accent-purple)'}}>{g.grainId}</span>
                        <div><p className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{g.title}</p><p className="text-xs truncate max-w-xs" style={{color:'var(--text-muted)'}}>{g.description}</p></div>
                      </div>
                    </td>
                    <td className="tbl-cell"><span className={`pill ${g.difficultyLevel==='DEBUTANT'?'pill-emerald':g.difficultyLevel==='INTERMEDIAIRE'?'pill-orange':'pill-pink'}`}>{g.difficultyLevel==='DEBUTANT'?'Débutant':g.difficultyLevel==='INTERMEDIAIRE'?'Intermédiaire':'Avancé'}</span></td>
                    <td className="tbl-cell"><span className="pill pill-purple">{g.targetVarkStyle}</span></td>
                    <td className="tbl-cell"><span className="flex items-center gap-1 text-xs" style={{color:'var(--text-secondary)'}}><Clock size={12}/>{g.estimatedDuration}m</span></td>
                    <td className="tbl-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={()=>{setGrainToEdit(g);setIsCreateModalOpen(true);}} className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all" style={{background:'rgba(59,130,246,0.1)',borderColor:'rgba(59,130,246,0.2)',color:'#60a5fa'}} title="Modifier"><Edit size={13}/></button>
                        <button onClick={()=>handleDelete(g.grainId)} className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all" style={{background:'rgba(239,68,68,0.1)',borderColor:'rgba(239,68,68,0.2)',color:'#f87171'}} title="Supprimer"><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Students */}
        <div className="glass rounded-2xl p-5 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-sm flex items-center gap-2" style={{color:'var(--text-primary)'}}><Users size={15} style={{color:'var(--accent-cyan)'}}/> Suivi des étudiants</h3>
            <span className="text-xs" style={{color:'var(--text-muted)'}}>{students.length} étudiants</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {students.map((s,i)=>{
              const sc=statusCfg[s.status]||{label:s.status,pill:'pill-gray'};
              return(
                <div key={i} className="grain-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{s.name.charAt(0)}</div>
                      <p className="font-semibold text-sm truncate" style={{color:'var(--text-primary)'}}>{s.name}</p>
                    </div>
                    <span className={`pill ${sc.pill} text-[10px]`}>{sc.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs"><span style={{color:'var(--text-muted)'}}>Grains</span><span className="font-medium" style={{color:'var(--text-secondary)'}}>{s.completed}/15</span></div>
                    <div className="flex justify-between text-xs"><span style={{color:'var(--text-muted)'}}>Score</span><span className="font-bold" style={{color:s.score>=70?'var(--accent-emerald)':'var(--accent-orange)'}}>{s.score}%</span></div>
                    <div className="progress-bar mt-1"><div className="progress-fill" style={{width:`${s.completed/15*100}%`,background:s.score>=70?'linear-gradient(90deg,#10b981,#06b6d4)':'linear-gradient(90deg,#f97316,#ec4899)'}}/></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CreateGrainModal isOpen={isCreateModalOpen} onClose={()=>{setIsCreateModalOpen(false);setGrainToEdit(null);}} grainToEdit={grainToEdit}
        onSave={async (saved)=>{
          try{if(grainToEdit){await updateGrain(grainToEdit.grainId,saved);}else{await createGrain(saved);}loadData();setIsCreateModalOpen(false);setGrainToEdit(null);}
          catch(err){alert('Erreur de sauvegarde: ' + (err.response?.data?.message || err.message)); console.error(err);}
        }}/>
    </div>
  );
}

export default TeacherDashboard;
