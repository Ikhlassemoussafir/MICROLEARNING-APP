import React, { useState } from 'react';
import { X, Save, Upload, Link2 } from 'lucide-react';

function CreateGrainModal({ isOpen, onClose, onSave, grainToEdit }) {
  const [formData, setFormData] = useState({
    title: '', description: '', learningObjective: '', difficultyLevel: 'DEBUTANT',
    targetVarkStyle: 'VISUEL', estimatedDuration: 5,
    visualContentUrl: '', auditoryContentUrl: '',
    readingContentUrl: '', kinestheticContentUrl: '',
  });

  React.useEffect(() => {
    if (grainToEdit) {
      setFormData({
        title: grainToEdit.title || '',
        description: grainToEdit.description || '',
        learningObjective: grainToEdit.learningObjective || '',
        difficultyLevel: grainToEdit.difficultyLevel || 'DEBUTANT',
        targetVarkStyle: grainToEdit.targetVarkStyle || 'VISUEL',
        estimatedDuration: grainToEdit.estimatedDuration || 5,
        visualContentUrl: grainToEdit.visualContentUrl || '',
        auditoryContentUrl: grainToEdit.auditoryContentUrl || '',
        readingContentUrl: grainToEdit.readingContentUrl || '',
        kinestheticContentUrl: grainToEdit.kinestheticContentUrl || '',
        videoUrls: grainToEdit.videoUrls ? grainToEdit.videoUrls.join('\n') : '',
        slideUrls: grainToEdit.slideUrls ? grainToEdit.slideUrls.join('\n') : '',
        mindmapUrls: grainToEdit.mindmapUrls ? grainToEdit.mindmapUrls.join('\n') : '',
      });
    } else {
      setFormData({ title:'', description:'', learningObjective:'', difficultyLevel:'DEBUTANT', targetVarkStyle:'VISUEL', estimatedDuration:5, visualContentUrl:'', auditoryContentUrl:'', readingContentUrl:'', kinestheticContentUrl:'', videoUrls:'', slideUrls:'', mindmapUrls:'' });
    }
  }, [grainToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    const finalData = { ...formData };
    if (finalData.videoUrls) finalData.videoUrls = finalData.videoUrls.split('\n').map(s => s.trim()).filter(Boolean);
    else finalData.videoUrls = [];
    if (finalData.slideUrls) finalData.slideUrls = finalData.slideUrls.split('\n').map(s => s.trim()).filter(Boolean);
    else finalData.slideUrls = [];
    if (finalData.mindmapUrls) finalData.mindmapUrls = finalData.mindmapUrls.split('\n').map(s => s.trim()).filter(Boolean);
    else finalData.mindmapUrls = [];
    onSave(finalData); 
    onClose(); 
  };
  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const varkFields = [
    { key: 'auditoryContentUrl',    label: '🎧 Vidéo (Auditif)',      placeholder: 'https://drive.google.com/file/d/...', accent: 'var(--accent-purple)' },
    { key: 'readingContentUrl',     label: '📖 PDF/Slides (Lecture)',  placeholder: 'https://docs.google.com/presentation/d/...', accent: 'var(--accent-cyan)' },
    { key: 'visualContentUrl',      label: '👁️ Mind Map (Visuel)',    placeholder: 'https://drive.google.com/file/d/...', accent: 'var(--accent-emerald)' },
    { key: 'kinestheticContentUrl', label: '🤚 Exercice (Kinésth.)',  placeholder: 'https://drive.google.com/file/d/...', accent: 'var(--accent-pink)' },
  ];

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="glass-strong max-w-3xl w-full my-8 animate-fade-up" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-sub)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {grainToEdit ? '✏️ Modifier le grain' : '✨ Créer un nouveau grain'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.1)'; e.currentTarget.style.color='#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.color='var(--text-muted)'; }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title */}
          <div>
            <label className="label-field">Titre du grain</label>
            <input type="text" required value={formData.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Ex: Introduction aux jointures SQL"
              className="input-field" />
          </div>

          {/* Description */}
          <div>
            <label className="label-field">Description</label>
            <textarea rows={3} required value={formData.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Objectifs et contenu du grain..."
              className="input-field resize-none" />
          </div>

          {/* Learning Objective */}
          <div>
            <label className="label-field">Objectif pédagogique 🎯</label>
            <input type="text" required value={formData.learningObjective}
              onChange={e => set('learningObjective', e.target.value)}
              placeholder="Ex: L'étudiant sera capable de comprendre les JOINs SQL"
              className="input-field" />
          </div>

          {/* Level + VARK + Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label-field">Niveau</label>
              <select value={formData.difficultyLevel} onChange={e => set('difficultyLevel', e.target.value)} className="select-field">
                <option value="DEBUTANT">🟢 Débutant</option>
                <option value="INTERMEDIAIRE">🟡 Intermédiaire</option>
                <option value="AVANCE">🔴 Avancé</option>
              </select>
            </div>
            <div>
              <label className="label-field">Style VARK ciblé</label>
              <select value={formData.targetVarkStyle} onChange={e => set('targetVarkStyle', e.target.value)} className="select-field">
                <option value="VISUEL">👁️ Visuel</option>
                <option value="AUDITIF">🎧 Auditif</option>
                <option value="LECTURE">📖 Lecture</option>
                <option value="KINESTHESIQUE">🤚 Kinesthésique</option>
              </select>
            </div>
            <div>
              <label className="label-field">Durée estimée (min)</label>
              <input type="number" min="1" max="60" value={formData.estimatedDuration}
                onChange={e => set('estimatedDuration', parseInt(e.target.value))}
                className="input-field" />
            </div>
          </div>

          {/* Google Drive Section */}
          <div className="rounded-2xl p-5 border" style={{ background: 'rgba(139,92,246,0.05)', borderColor: 'rgba(139,92,246,0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <svg className="w-5 h-5" viewBox="0 0 87.3 87.3" xmlns="http://www.w3.org/2000/svg">
                    <path d="m58 73.8h-28.7l-14.3-24.8 14.3-24.8 28.7 49.6z" fill="#4285f4"/>
                    <path d="m72.4 49-14.4 24.8h-28.7l28.7-49.6z" fill="#34a853"/>
                    <path d="m29.3 24.2 14.4-24.2h28.7l-14.4 24.8z" fill="#fbbc05"/>
                    <path d="m14.9 49 14.4-24.8h-28.7l14.3 24.8z" fill="#ea4335"/>
                  </svg>
                  Contenus Google Drive (VARK)
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Hébergez vos fichiers sur Drive et collez l'URL de partage</p>
              </div>
              <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
                style={{ color: 'var(--accent-purple)', borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)' }}>
                <Upload size={12} /> Ouvrir Drive
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {varkFields.map(f => (
                <div key={f.key}>
                  <label className="label-field" style={{ color: f.accent }}>{f.label}</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2" size={13} style={{ color: 'var(--text-muted)' }} />
                    <input type="url" value={formData[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="input-field pl-9 text-xs" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div>
                <label className="label-field" style={{ color: 'var(--accent-purple)' }}>🎧 Liste des Vidéos (1 URL par ligne)</label>
                <textarea rows={3} value={formData.videoUrls} onChange={e => set('videoUrls', e.target.value)} placeholder="https://drive...&#10;https://drive..." className="input-field text-xs" />
              </div>
              <div>
                <label className="label-field" style={{ color: 'var(--accent-cyan)' }}>📖 Liste des Slides (1 URL par ligne)</label>
                <textarea rows={3} value={formData.slideUrls} onChange={e => set('slideUrls', e.target.value)} placeholder="https://docs...&#10;https://docs..." className="input-field text-xs" />
              </div>
              <div className="md:col-span-2">
                <label className="label-field" style={{ color: 'var(--accent-emerald)' }}>👁️ Liste des Mind Maps (1 URL par ligne)</label>
                <textarea rows={3} value={formData.mindmapUrls} onChange={e => set('mindmapUrls', e.target.value)} placeholder="https://drive...&#10;https://drive..." className="input-field text-xs" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
            <button type="submit" className="btn-primary">
              <Save size={15} /> {grainToEdit ? 'Mettre à jour' : 'Créer le grain'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGrainModal;
