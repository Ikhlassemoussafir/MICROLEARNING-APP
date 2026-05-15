import React, { useState, useEffect, useMemo } from 'react';
import quizData from './quizData';
import SqlPlayground from './SqlPlayground';
import { generateBalancedQuiz, clearHistory, DEFAULT_QUIZ_SIZE } from './utils/generateQuiz';
import {
  ArrowLeft, Clock, Target, CheckCircle, XCircle, Lightbulb, Award,
  ChevronRight, BookOpen, RefreshCw, Headphones, Hand,
  Zap, Play, FileText, Map, ChevronLeft, BarChart2
} from 'lucide-react';
import {
  submitQuiz, saveProgress, generateRecommendation,
  checkBadges, generateSupplementaryQuestions
} from './services/api';

const QUIZ_SIZE = DEFAULT_QUIZ_SIZE;
const PASS_THRESHOLD = 70;
const AI_TIMEOUT_MS = 40_000;

const DIFFICULTY_CONFIG = {
  easy:   { label: 'Facile',        color: 'var(--accent-emerald)', bg: 'rgba(16,185,129,0.12)' },
  medium: { label: 'Intermédiaire', color: '#f59e0b',               bg: 'rgba(245,158,11,0.12)' },
  hard:   { label: 'Difficile',     color: 'var(--accent-pink)',    bg: 'rgba(236,72,153,0.12)' },
};

function ResourceViewer({ url, type }) {
  if (!url) return (
    <div className="w-full flex flex-col items-center justify-center rounded-xl"
      style={{ height: 380, background: 'var(--bg-card)', border: '1px dashed var(--border-sub)' }}>
      <Zap size={36} style={{ color: 'var(--accent-purple)', marginBottom: 12 }} />
      <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Aucune ressource disponible</p>
    </div>
  );
  if (type === 'video') return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-sub)' }}>
      <iframe src={url} width="100%" height="400" allow="autoplay" allowFullScreen
        title="Vidéo" style={{ display: 'block', border: 'none', background: '#000' }} />
    </div>
  );
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-sub)' }}>
      <iframe src={url} width="100%" height="420" allowFullScreen
        title="Ressource" style={{ display: 'block', border: 'none' }} />
    </div>
  );
}

function ResourceTabs({ grain, initialFormat }) {
  const tabs = [
    {
      id: 'AUDITIF', icon: Headphones, label: 'Vidéos', color: 'var(--accent-purple)',
      items: grain.videoUrls || grain.video_urls ||
        (grain.auditoryContentUrl || grain.auditory_content_url
          ? [grain.auditoryContentUrl || grain.auditory_content_url] : []),
      type: 'video'
    },
    {
      id: 'LECTURE', icon: FileText, label: 'Slides', color: 'var(--accent-cyan)',
      items: grain.slideUrls || grain.slide_urls ||
        (grain.readingContentUrl || grain.reading_content_url
          ? [grain.readingContentUrl || grain.reading_content_url] : []),
      type: 'slide'
    },
    {
      id: 'VISUEL', icon: Map, label: 'Mind Maps', color: 'var(--accent-emerald)',
      items: grain.mindmapUrls || grain.mindmap_urls ||
        (grain.visualContentUrl || grain.visual_content_url
          ? [grain.visualContentUrl || grain.visual_content_url] : []),
      type: 'mindmap'
    },
    { id: 'KINESTHESIQUE', icon: Hand, label: 'Exercice', color: 'var(--accent-pink)', items: [], type: 'exercise' },
  ];

  const startTab = tabs.find(t => t.id === initialFormat) || tabs[0];
  const [activeTab, setActiveTab] = useState(startTab.id);
  const [activeIdx, setActiveIdx] = useState(0);
  const tab = tabs.find(t => t.id === activeTab) || tabs[0];
  const currentUrl = tab.items[activeIdx] || null;

  useEffect(() => { setActiveIdx(0); }, [activeTab]);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
              style={active
                ? { background: `${t.color}22`, borderColor: t.color, color: t.color }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-sub)', color: 'var(--text-muted)' }}>
              <Icon size={13} /> {t.label}
              {t.items.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: active ? `${t.color}33` : 'var(--bg-card)', color: active ? t.color : 'var(--text-muted)' }}>
                  {t.items.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab.type !== 'exercise' && tab.items.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tab.items.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border transition-all"
              style={activeIdx === i
                ? { background: `${tab.color}22`, borderColor: tab.color, color: tab.color }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-sub)', color: 'var(--text-muted)' }}>
              {tab.type === 'video'   && <><Play size={10} />     Vidéo {i + 1}</>}
              {tab.type === 'slide'   && <><FileText size={10} />  Slide {i + 1}</>}
              {tab.type === 'mindmap' && <><Map size={10} />       Map {i + 1}</>}
            </button>
          ))}
        </div>
      )}

      {tab.type === 'exercise' ? (
        <div className="rounded-xl p-6" style={{ background: 'rgba(139,195,74,0.06)', border: '2px dashed rgba(139,195,74,0.3)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,195,74,0.15)' }}>
              <Hand size={20} style={{ color: 'var(--accent-pink)' }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Exercice Pratique (Kinesthésique)</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Activité de mise en pratique</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line mb-4" style={{ color: 'var(--text-secondary)' }}>
            {grain.kinestheticText || grain.kinesthetic_text || grain.kinesthetic_description
              || 'Testez vos connaissances en SQL grâce à cet éditeur interactif :'}
          </p>
          <SqlPlayground grain={grain} />
        </div>
      ) : (
        <>
          <ResourceViewer url={currentUrl} type={tab.type} />
          {tab.items.length > 1 && (
            <div className="flex items-center justify-between mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <button disabled={activeIdx === 0} onClick={() => setActiveIdx(i => i - 1)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
                <ChevronLeft size={12} /> Précédent
              </button>
              <span>{activeIdx + 1} / {tab.items.length}</span>
              <button disabled={activeIdx === tab.items.length - 1} onClick={() => setActiveIdx(i => i + 1)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
                Suivant <ChevronRight size={12} />
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-3 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
        style={{ background: 'rgba(41,182,210,0.06)', border: '1px solid rgba(41,182,210,0.15)', color: 'var(--text-secondary)' }}>
        <Lightbulb size={12} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
        Choisissez le format qui correspond le mieux à votre style <strong style={{ color: 'var(--text-primary)' }}>VARK</strong>
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  if (!difficulty) return null;
  const cfg = DIFFICULTY_CONFIG[difficulty];
  if (!cfg) return null;
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}44` }}>
      {cfg.label}
    </span>
  );
}

function QuizOption({ letter, text, correct, feedback, selected, onClick }) {
  let borderColor = 'var(--border-sub)';
  let bgColor     = 'var(--bg-card)';
  let textColor   = 'var(--text-secondary)';
  let badgeStyle  = { background: 'rgba(41,182,210,0.12)', color: 'var(--accent-purple)' };

  if (feedback === 'correct' && correct) {
    borderColor = 'var(--accent-emerald)';
    bgColor     = 'rgba(16,185,129,0.08)';
    textColor   = 'var(--text-primary)';
    badgeStyle  = { background: 'rgba(16,185,129,0.2)', color: 'var(--accent-emerald)' };
  } else if (feedback === 'incorrect' && selected) {
    borderColor = 'var(--accent-pink)';
    bgColor     = 'rgba(236,72,153,0.08)';
    textColor   = 'var(--text-primary)';
    badgeStyle  = { background: 'rgba(236,72,153,0.2)', color: 'var(--accent-pink)' };
  } else if (feedback === 'incorrect' && correct) {
    borderColor = 'var(--accent-emerald)';
    bgColor     = 'rgba(16,185,129,0.05)';
    badgeStyle  = { background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)' };
  }

  return (
    <button
      onClick={feedback ? undefined : onClick}
      disabled={!!feedback}
      className="w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all"
      style={{ background: bgColor, borderColor, color: textColor, cursor: feedback ? 'default' : 'pointer' }}
      onMouseEnter={e => {
        if (feedback) return;
        e.currentTarget.style.borderColor = 'var(--accent-purple)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={e => {
        if (feedback) return;
        e.currentTarget.style.borderColor = 'var(--border-sub)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}>
      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={badgeStyle}>
        {letter}
      </span>
      <span className="text-sm flex-1">{text}</span>
      {feedback && correct && <CheckCircle size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />}
      {feedback === 'incorrect' && selected && <XCircle size={16} style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />}
    </button>
  );
}

function buildFallbackQuestions(grainTitle) {
  return [
    {
      question: `Quel est le rôle principal du concept étudié dans "${grainTitle}" ?`,
      difficulty: 'easy',
      options: [
        { id: 'a', text: 'Gérer et manipuler les données de manière structurée', correct: true },
        { id: 'b', text: 'Créer des interfaces graphiques utilisateur',           correct: false },
        { id: 'c', text: 'Gérer la mémoire vive du système',                      correct: false },
        { id: 'd', text: 'Configurer les paramètres réseau',                       correct: false },
      ],
      explanation: `Ce concept est fondamental dans "${grainTitle}" pour structurer et manipuler les données.`
    },
    {
      question: `Dans le contexte de "${grainTitle}", quelle syntaxe SQL est correcte ?`,
      difficulty: 'medium',
      options: [
        { id: 'a', text: 'SELECT * WHERE FROM table',          correct: false },
        { id: 'b', text: 'FROM table SELECT *',                correct: false },
        { id: 'c', text: 'SELECT * FROM table WHERE condition', correct: true },
        { id: 'd', text: 'TABLE SELECT * FROM condition',       correct: false },
      ],
      explanation: "La syntaxe SQL standard suit toujours l'ordre SELECT ... FROM ... WHERE ..."
    },
    {
      question: `Quelle est la bonne pratique à retenir de "${grainTitle}" ?`,
      difficulty: 'medium',
      options: [
        { id: 'a', text: "Ignorer les contraintes d'intégrité",       correct: false },
        { id: 'b', text: 'Toujours vérifier la cohérence des données', correct: true },
        { id: 'c', text: 'Utiliser des noms de colonnes génériques',   correct: false },
        { id: 'd', text: 'Éviter les index pour simplifier',           correct: false },
      ],
      explanation: 'La cohérence des données est une règle fondamentale en bases de données relationnelles.'
    }
  ];
}

function GrainDetailSimple({ grain, varkProfile, onClose, onComplete }) {
  const [phase, setPhase] = useState('content');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [aiAnswers,   setAiAnswers]   = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [loadingAI,   setLoadingAI]   = useState(false);
  const [aiError,     setAiError]     = useState(false);
  const [score,     setScore]     = useState(0);
  const [h5pScore,  setH5pScore]  = useState(null);

  const dominant = Object.entries({
    VISUEL:        varkProfile?.visual       || 0,
    AUDITIF:       varkProfile?.auditory     || 0,
    LECTURE:       varkProfile?.reading      || 0,
    KINESTHESIQUE: varkProfile?.kinesthetic  || 0,
  }).sort((a, b) => b[1] - a[1])[0][0];

  const levelGrad = {
    DEBUTANT:      'from-emerald-600 to-teal-600',
    INTERMEDIAIRE: 'from-amber-500 to-orange-600',
    AVANCE:        'from-red-500 to-pink-600',
  }[grain.difficultyLevel] || 'from-teal-600 to-cyan-600';

  const grainId      = grain.grainId;
  const allQuestions = (quizData[grainId] || quizData[1]).h5pQuestions;

  const h5pQuestions = useMemo(
    () => generateBalancedQuiz(allQuestions, QUIZ_SIZE, grainId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grainId]
  );

  const handleAnswer = (question, option) => {
    if (currentFeedback) return;
    const isCorrect = option.correct;
    setCurrentFeedback(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => {
      setQuizAnswers(prev => [...prev, { questionId: question.id, optionId: option.id, correct: isCorrect }]);
      setCurrentFeedback(null);
    }, 800);
  };

  const handleAIAnswer = (idx, option) => {
    if (currentFeedback) return;
    const isCorrect = option.correct;
    setCurrentFeedback(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => {
      setAiAnswers(prev => [...prev, { questionIdx: idx, optionId: option.id, correct: isCorrect }]);
      setCurrentFeedback(null);
    }, 800);
  };

  const finishAI = async (currentQuizAnswers, currentAiAnswers, currentAiQuestions) => {
    const answersQ    = currentQuizAnswers  || quizAnswers;
    const answersAI   = currentAiAnswers    || aiAnswers;
    const questionsAI = currentAiQuestions  || aiQuestions;

    const h5pOk     = answersQ.filter(a => a.correct).length;
    const aiOk      = answersAI.filter(a => a.correct).length;
    const total     = h5pQuestions.length + questionsAI.length;
    const finalScore = total > 0 ? Math.round(((h5pOk + aiOk) / total) * 100) : 0;

    setScore(finalScore);

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await submitQuiz({
          user:        { userId: parseInt(userId) },
          grain:       { grainId: grain.grainId },
          score:       finalScore,
          answersJson: JSON.stringify([...answersQ, ...answersAI]),
          duration:    300,
          startedAt:   new Date(Date.now() - 5 * 60_000).toISOString(),
          completedAt: new Date().toISOString(),
        });
        await saveProgress({
          user:         { userId: parseInt(userId) },
          grain:        { grainId: grain.grainId },
          status:       finalScore >= PASS_THRESHOLD ? 'COMPLETE' : 'EN_COURS',
          bestScore:    finalScore,
          attemptsCount: 1,
          timeSpent:    300,
          completedAt:  finalScore >= PASS_THRESHOLD ? new Date().toISOString() : null,
        });
        await generateRecommendation(parseInt(userId), grain.grainId, finalScore);
        await checkBadges({ userId: parseInt(userId), grainId: grain.grainId, score: finalScore }).catch(() => {});
      } catch (err) {
        console.error('Erreur sauvegarde quiz:', err);
      }
    }
    setPhase('results');
  };

  const loadAI = async (currentAnswers) => {
    const answers = currentAnswers || quizAnswers;
    const h5pOk   = answers.filter(a => a.correct).length;
    const intermediateScore = Math.round((h5pOk / h5pQuestions.length) * 100);
    setH5pScore(intermediateScore);

    if (intermediateScore >= PASS_THRESHOLD) {
      setAiQuestions([]);
      setLoadingAI(false);
      await finishAI(answers, [], []);
      return;
    }

    const errors     = answers.filter(a => !a.correct);
    const errorTexts = errors
      .map(a => h5pQuestions.find(q => q.id === a.questionId)?.question || '')
      .filter(Boolean);

    setLoadingAI(true);
    setAiError(false);

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), AI_TIMEOUT_MS)
      );
      const apiPromise = generateSupplementaryQuestions({
        grainTitle:   grain.title,
        grainContent: grain.summary || grain.description || '',
        userErrors:   errorTexts,
        varkStyle:    dominant,
      });
      const res       = await Promise.race([apiPromise, timeoutPromise]);
      const questions = res.data?.questions || [];
      setAiQuestions(questions.length > 0 ? questions : buildFallbackQuestions(grain.title));
      if (questions.length === 0) setAiError(true);
    } catch (err) {
      console.warn('IA indisponible ou timeout, fallback:', err.message);
      setAiQuestions(buildFallbackQuestions(grain.title));
      setAiError(true);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleRetry = () => {
    clearHistory(grainId);
    setQuizAnswers([]);
    setAiAnswers([]);
    setAiQuestions([]);
    setAiError(false);
    setCurrentFeedback(null);
    setScore(0);
    setH5pScore(null);
    setPhase('quiz-h5p-mount');
    setTimeout(() => setPhase('quiz-h5p'), 0);
  };

  const Modal = ({ children, wide }) => (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`glass-strong ${wide ? 'max-w-4xl' : 'max-w-2xl'} w-full my-8 overflow-hidden animate-fade-up`}
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
        {children}
      </div>
    </div>
  );

  if (phase === 'content') return (
    <Modal wide>
      <div className={`bg-gradient-to-r ${levelGrad} p-6`}>
        <button onClick={onClose}
          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={16} /> Retour au dashboard
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">{grain.title}</h2>
        <div className="flex gap-5 text-sm text-white/80">
          <span className="flex items-center gap-1"><Clock size={13} />{grain.estimatedDuration || 10} min</span>
          <span className="flex items-center gap-1"><Target size={13} />{grain.difficultyLevel}</span>
          <span className="flex items-center gap-1"><BarChart2 size={13} />{h5pQuestions.length} questions</span>
        </div>
      </div>
      <div className="p-6">
        {grain.learningObjective && (
          <div className="mb-5 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(41,182,210,0.06)', border: '1px solid rgba(41,182,210,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent-purple)' }}>
              Objectif pédagogique
            </p>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{grain.learningObjective}</p>
          </div>
        )}
        <ResourceTabs grain={grain} initialFormat={dominant} />
        {grain.key_points?.length > 0 && (
          <div className="mb-5">
            <h4 className="flex items-center gap-2 font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
              <Lightbulb size={14} style={{ color: '#eab308' }} /> Points clés
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {grain.key_points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl text-sm"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(41,182,210,0.12)', color: 'var(--accent-purple)' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <BarChart2 size={16} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Le quiz suivant contient <strong style={{ color: 'var(--text-primary)' }}>{h5pQuestions.length} questions</strong> sélectionnées
            aléatoirement, avec les options mélangées. Les questions varient à chaque session.
          </p>
        </div>
        <button onClick={() => setPhase('quiz-h5p')}
          className="btn-primary w-full justify-center py-3 text-base mt-2">
          <CheckCircle size={17} /> Passer au quiz d'évaluation
        </button>
      </div>
    </Modal>
  );

  if (phase === 'quiz-h5p') {
    const idx  = quizAnswers.length;
    const done = idx >= h5pQuestions.length;
    const q    = h5pQuestions[idx];

    return (
      <Modal>
        {done ? (
          <div className="p-8 text-center">
            <CheckCircle size={48} style={{ color: 'var(--accent-emerald)', margin: '0 auto 16px' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Quiz principal terminé !</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {quizAnswers.filter(a => a.correct).length}/{h5pQuestions.length} bonnes réponses
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
              Score intermédiaire :{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                {Math.round((quizAnswers.filter(a => a.correct).length / h5pQuestions.length) * 100)}%
              </strong>
            </p>
            <button onClick={() => { setPhase('quiz-ai'); loadAI(quizAnswers); }}
              className="btn-primary w-full justify-center py-3">
              Continuer → Évaluation adaptative <ChevronRight size={15} />
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Quiz principal
                </span>
                <DifficultyBadge difficulty={q.difficulty} />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{idx + 1}/{h5pQuestions.length}</span>
            </div>
            <div className="progress-bar mb-4">
              <div className="progress-fill" style={{ width: `${((idx + 1) / h5pQuestions.length) * 100}%` }} />
            </div>
            <h4 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {q.question}
            </h4>
            {q.consigne && (
              <p className="text-sm mb-4 px-3 py-2 rounded-lg italic"
                style={{ background: 'rgba(41,182,210,0.06)', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-purple)' }}>
                {q.consigne}
              </p>
            )}
            <div className="space-y-2">
              {q.options.map(opt => (
                <QuizOption key={opt.id} letter={opt.id.toUpperCase()} text={opt.text}
                  correct={opt.correct} feedback={currentFeedback}
                  selected={currentFeedback !== null} onClick={() => handleAnswer(q, opt)} />
              ))}
            </div>
            {currentFeedback && q.explanation && (
              <div className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2 animate-fade-up"
                style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}>
                <Lightbulb size={14} style={{ color: '#eab308', flexShrink: 0, marginTop: 2 }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{q.explanation}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    );
  }

  if (phase === 'quiz-ai') {
    if (loadingAI) return (
      <Modal>
        <div className="p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center animate-pulse-glow"
            style={{ background: 'rgba(41,182,210,0.1)' }}>
            <Zap size={32} style={{ color: 'var(--accent-purple)' }} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>L'IA analyse vos réponses…</h3>
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Génération de questions de remédiation ciblées.</p>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Cela peut prendre jusqu'à 40 secondes…</p>
          <button onClick={() => { setLoadingAI(false); setAiQuestions(buildFallbackQuestions(grain.title)); setAiError(true); }}
            className="text-sm px-5 py-2 rounded-xl border transition-all"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border-sub)', background: 'var(--bg-card)' }}>
            Passer → Utiliser questions de secours
          </button>
        </div>
      </Modal>
    );

    const aiIdx  = aiAnswers.length;
    const aiDone = aiIdx >= aiQuestions.length || aiQuestions.length === 0;
    const aiQ    = aiQuestions[aiIdx];

    return (
      <Modal>
        {aiDone ? (
          <div className="p-8 text-center">
            <Zap size={48} style={{ color: 'var(--accent-purple)', margin: '0 auto 16px' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Évaluation adaptative terminée</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {aiAnswers.filter(a => a.correct).length}/{aiQuestions.length} bonnes réponses sur les questions IA.
            </p>
            <button onClick={() => finishAI(quizAnswers, aiAnswers, aiQuestions)}
              className="btn-primary w-full justify-center py-3">
              Voir les résultats finaux
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="pill pill-purple">Questions IA</span>
                <DifficultyBadge difficulty={aiQ?.difficulty} />
                {aiError && (
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(251,191,36,0.1)', color: '#f59e0b', border: '1px solid rgba(251,191,36,0.3)' }}>
                    Mode hors-ligne
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{aiIdx + 1}/{aiQuestions.length}</span>
            </div>
            <div className="progress-bar mb-4">
              <div className="progress-fill" style={{ width: `${((aiIdx + 1) / aiQuestions.length) * 100}%` }} />
            </div>
            <h4 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {aiQ.question}
            </h4>
            <div className="space-y-2">
              {(aiQ.options || []).map(opt => (
                <QuizOption key={opt.id} letter={opt.id.toUpperCase()} text={opt.text}
                  correct={opt.correct} feedback={currentFeedback}
                  selected={currentFeedback !== null} onClick={() => handleAIAnswer(aiIdx, opt)} />
              ))}
            </div>
            {currentFeedback && aiQ.explanation && (
              <div className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2 animate-fade-up"
                style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}>
                <Lightbulb size={14} style={{ color: '#eab308', flexShrink: 0, marginTop: 2 }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{aiQ.explanation}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    );
  }

  if (phase === 'results') {
    const passed     = score >= PASS_THRESHOLD;
    const h5pCorrect = quizAnswers.filter(a => a.correct).length;
    const aiCorrect  = aiAnswers.filter(a => a.correct).length;

    return (
      <Modal>
        <div className={`p-8 text-center bg-gradient-to-b ${passed ? 'from-teal-500/20' : 'from-orange-500/20'} to-transparent`}>
          <div className={`text-7xl font-black mb-2 ${passed ? 'gradient-text-purple' : 'gradient-text-warm'}`}>
            {score}%
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {passed ? '🎉 Félicitations !' : '📚 Continuez vos efforts !'}
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {passed
              ? 'Grain maîtrisé avec succès.'
              : `Seuil de réussite : ${PASS_THRESHOLD}%. Essayez de revoir le cours dans un autre format VARK.`}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Quiz principal</p>
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{h5pCorrect}/{h5pQuestions.length}</p>
            </div>
            {aiQuestions.length > 0 && (
              <div className="p-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Questions IA</p>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{aiCorrect}/{aiQuestions.length}</p>
              </div>
            )}
          </div>
          {passed && (
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl mb-5"
              style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
              <Award size={22} style={{ color: '#eab308' }} />
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Badge débloqué !</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {!passed && (
              <button onClick={handleRetry} className="btn-primary w-full justify-center py-3">
                <RefreshCw size={14} /> Retenter avec nouvelles questions
              </button>
            )}
            <div className="flex gap-2">
              {!passed && (
                <button
                  onClick={() => { setQuizAnswers([]); setAiAnswers([]); setAiQuestions([]); setAiError(false); setPhase('content'); }}
                  className="btn-ghost flex-1 justify-center">
                  <BookOpen size={13} /> Revoir le cours
                </button>
              )}
              <button onClick={onClose} className="btn-ghost flex-1 justify-center">
                {passed ? 'Retour au dashboard' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
}

export default GrainDetailSimple;
