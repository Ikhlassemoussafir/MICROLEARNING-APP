import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // ✅ BON PORT

// ==========================================
// INTERCEPTEUR JWT - Ajoute le token Bearer à chaque requête
// ==========================================
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// INTERCEPTEUR ERREURS - Gère 401/403 (token expiré ou invalide)
// ==========================================
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ne pas rediriger si l'erreur provient de la tentative de connexion ou d'inscription
    const url = error.config?.url || '';
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      // Nettoyer le stockage et rediriger vers la page de connexion
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ==========================================
// AUTH
// ==========================================
export const login = (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials);
export const register = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);

// ==========================================
// USERS
// ==========================================
export const getUser = (userId) => axios.get(`${API_BASE_URL}/users/${userId}`);
export const getUserByEmail = (email) => axios.get(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`);
export const getUsersByRole = (role) => axios.get(`${API_BASE_URL}/users/role/${role}`);
export const getAllUsers = () => axios.get(`${API_BASE_URL}/users`);

// ==========================================
// GRAINS
// ==========================================
export const getAllGrains = () => axios.get(`${API_BASE_URL}/grains`);
export const getGrain = (grainId) => axios.get(`${API_BASE_URL}/grains/${grainId}`);
export const createGrain = (grainData) => axios.post(`${API_BASE_URL}/grains`, grainData);
export const updateGrain = (grainId, grainData) => axios.put(`${API_BASE_URL}/grains/${grainId}`, grainData);
export const deleteGrain = (grainId) => axios.delete(`${API_BASE_URL}/grains/${grainId}`);

// ==========================================
// PROGRESS
// ==========================================
export const getUserProgress = (userId) => axios.get(`${API_BASE_URL}/progress/user/${userId}`);
export const getSpecificGrainProgress = (userId, grainId) =>
  axios.get(`${API_BASE_URL}/progress/user/${userId}/grain/${grainId}`).catch(() => ({ data: null }));
export const saveProgress = (progressData) => axios.post(`${API_BASE_URL}/progress`, progressData);

// ==========================================
// QUIZ
// ==========================================
export const submitQuiz = (quizData) => axios.post(`${API_BASE_URL}/quiz/submit`, quizData);
export const getUserQuizAttempts = (userId) => axios.get(`${API_BASE_URL}/quiz/user/${userId}`);

// ==========================================
// RECOMMENDATIONS
// ==========================================
export const getRecommendations = (userId) => axios.get(`${API_BASE_URL}/recommendations/${userId}`);
// Signature : generateRecommendation(userId, grainId, score) — utilise les query params attendus par le backend
export const generateRecommendation = (userId, grainId, score) => {
  const params = new URLSearchParams({ userId, grainId, score });
  return axios.post(`${API_BASE_URL}/recommendations/generate?${params}`);
};
// Version alternative avec un objet (compatibilité ancien code)
export const generateRecommendationObj = (data) =>
  axios.post(`${API_BASE_URL}/recommendations/generate`, data);

// ==========================================
// BADGES
// ==========================================
export const getUserBadges = (userId) => axios.get(`${API_BASE_URL}/badges/${userId}`);
export const awardBadge = (badgeData) => axios.post(`${API_BASE_URL}/badges/award`, badgeData);
export const checkBadges = (data) => axios.post(`${API_BASE_URL}/badges/check`, data);

// ==========================================
// AI (Claude / Gemini)
// ==========================================
export const generateSupplementaryQuestions = (data) =>
  axios.post(`${API_BASE_URL}/ai/questions-supplementaires`, data);
export const generateAlternativeGrain = (data) =>
  axios.post(`${API_BASE_URL}/ai/grain-alternatif`, data);
