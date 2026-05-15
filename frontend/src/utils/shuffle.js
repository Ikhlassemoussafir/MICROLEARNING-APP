export function shuffleArray(array) {
  if (!Array.isArray(array) || array.length <= 1) return [...array];
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestionOptions(question) {
  if (!question || !Array.isArray(question.options)) return question;
  return { ...question, options: shuffleArray(question.options) };
}

export function pickRandom(array, n) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return shuffleArray(array).slice(0, Math.min(n, array.length));
}
