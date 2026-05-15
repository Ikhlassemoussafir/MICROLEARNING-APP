import { shuffleArray, shuffleQuestionOptions, pickRandom } from './shuffle';

const HISTORY_KEY = 'mlq_history';
const MAX_HISTORY = 30;
const DEFAULT_DISTRIBUTION = { easy: 0.3, medium: 0.5, hard: 0.2 };
export const DEFAULT_QUIZ_SIZE = 5;

function getHistory(grainId) {
  try {
    const raw = sessionStorage.getItem(`${HISTORY_KEY}_${grainId}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHistory(grainId, newIds) {
  try {
    const existing = getHistory(grainId);
    const merged = [...new Set([...existing, ...newIds])].slice(-MAX_HISTORY);
    sessionStorage.setItem(`${HISTORY_KEY}_${grainId}`, JSON.stringify(merged));
  } catch {}
}

export function clearHistory(grainId) {
  try { sessionStorage.removeItem(`${HISTORY_KEY}_${grainId}`); } catch {}
}

export function clearAllHistory() {
  try {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith(HISTORY_KEY))
      .forEach(k => sessionStorage.removeItem(k));
  } catch {}
}

function selectWithAntiRepeat(pool, count, grainId) {
  if (pool.length === 0) return [];
  const history = getHistory(grainId);
  const fresh = pool.filter(q => !history.includes(q.id));
  const source = fresh.length >= count ? fresh : pool;
  const selected = pickRandom(source, count);
  saveHistory(grainId, selected.map(q => q.id));
  return selected;
}

export function generateQuiz(questions, count = DEFAULT_QUIZ_SIZE, difficulty = null, grainId = 0) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  let pool = difficulty ? questions.filter(q => q.difficulty === difficulty) : [...questions];
  if (pool.length === 0) pool = [...questions];
  return selectWithAntiRepeat(pool, count, grainId).map(shuffleQuestionOptions);
}

export function generateBalancedQuiz(questions, total = DEFAULT_QUIZ_SIZE, grainId = 0, distribution = DEFAULT_DISTRIBUTION) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  const byLevel = {
    easy:   questions.filter(q => q.difficulty === 'easy'),
    medium: questions.filter(q => q.difficulty === 'medium'),
    hard:   questions.filter(q => q.difficulty === 'hard'),
    none:   questions.filter(q => !q.difficulty),
  };
  const hasDifficulty = byLevel.easy.length + byLevel.medium.length + byLevel.hard.length > 0;
  if (!hasDifficulty) return generateQuiz(questions, total, null, grainId);

  const quotaEasy   = Math.max(0, Math.floor(total * distribution.easy));
  const quotaHard   = Math.max(0, Math.floor(total * distribution.hard));
  const quotaMedium = Math.max(0, total - quotaEasy - quotaHard);

  let selected = [
    ...pickRandom(byLevel.easy,   quotaEasy),
    ...pickRandom(byLevel.medium, quotaMedium),
    ...pickRandom(byLevel.hard,   quotaHard),
  ];

  const deficit = total - selected.length;
  if (deficit > 0 && byLevel.none.length > 0) {
    selected = [...selected, ...pickRandom(byLevel.none, deficit)];
  } else if (deficit > 0) {
    const all = [...byLevel.easy, ...byLevel.medium, ...byLevel.hard];
    selected = [...selected, ...pickRandom(all.filter(q => !selected.includes(q)), deficit)];
  }

  saveHistory(grainId, selected.map(q => q.id));
  return shuffleArray(selected).map(shuffleQuestionOptions);
}

export function generateAdaptiveQuiz(questions, errorTopics = [], total = DEFAULT_QUIZ_SIZE, grainId = 0) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  const targeted = errorTopics.length > 0
    ? questions.filter(q => errorTopics.some(topic =>
        q.question?.toLowerCase().includes(topic.toLowerCase()) ||
        q.type?.toLowerCase().includes(topic.toLowerCase())
      ))
    : [];
  const others = questions.filter(q => !targeted.includes(q));
  const selected = [...pickRandom(targeted, total), ...pickRandom(others, Math.max(0, total - targeted.length))].slice(0, total);
  saveHistory(grainId, selected.map(q => q.id));
  return shuffleArray(selected).map(shuffleQuestionOptions);
}

export function getQuizStats(questions) {
  if (!Array.isArray(questions)) return { total: 0, easy: 0, medium: 0, hard: 0, withDifficulty: false };
  return {
    total:          questions.length,
    easy:           questions.filter(q => q.difficulty === 'easy').length,
    medium:         questions.filter(q => q.difficulty === 'medium').length,
    hard:           questions.filter(q => q.difficulty === 'hard').length,
    withDifficulty: questions.some(q => q.difficulty),
  };
}
