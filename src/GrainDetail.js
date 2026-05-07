import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, Target, Book, CheckCircle, XCircle, 
  Lightbulb, TrendingUp, Award, AlertCircle, ChevronRight,
  Eye, Headphones, BookOpen, Hand, Play, RefreshCw
} from 'lucide-react';

// Composant Page Détail Grain
function GrainDetail({ grain, varkProfile, onClose, onComplete }) {
  const [currentPhase, setCurrentPhase] = useState('content'); // content, quiz-h5p, quiz-ai, results
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [aiQuestions, setAIQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [recommendation, setRecommendation] = useState(null);

  // Questions H5P (créées par l'enseignant)
  const h5pQuestions = [
    {
      id: 1,
      question: "Quelle est la fonction principale d'une base de données ?",
      options: [
        { id: 'a', text: "Stocker et organiser des données de manière structurée", correct: true },
        { id: 'b', text: "Créer des graphiques", correct: false },
        { id: 'c', text: "Naviguer sur internet", correct: false },
        { id: 'd', text: "Éditer des images", correct: false }
      ]
    },
    {
      id: 2,
      question: "Qu'est-ce qu'une table dans une base de données ?",
      options: [
        { id: 'a', text: "Un meuble de bureau", correct: false },
        { id: 'b', text: "Une structure qui organise les données en lignes et colonnes", correct: true },
        { id: 'c', text: "Un type de graphique", correct: false },
        { id: 'd', text: "Un fichier Excel", correct: false }
      ]
    },
    {
      id: 3,
      question: "Pourquoi utilise-t-on des clés primaires ?",
      options: [
        { id: 'a', text: "Pour décorer la base de données", correct: false },
        { id: 'b', text: "Pour identifier de manière unique chaque enregistrement", correct: true },
        { id: 'c', text: "Pour accélérer l'ordinateur", correct: false },
        { id: 'd', text: "Pour créer des graphiques", correct: false }
      ]
    }
  ];

  const handleH5PAnswer = (questionId, optionId) => {
    const question = h5pQuestions.find(q => q.id === questionId);
    const option = question.options.find(o => o.id === optionId);
    
    setQuizAnswers([...quizAnswers, {
      questionId,
      optionId,
      correct: option.correct
    }]);
  };

  const handleH5PComplete = () => {
    const correctAnswers = quizAnswers.filter(a => a.correct).length;
    const h5pScore = Math.round((correctAnswers / h5pQuestions.length) * 100);
    
    // Générer questions IA basées sur les erreurs
    generateAIQuestions(quizAnswers);
    setCurrentPhase('quiz-ai');
  };

  const generateAIQuestions = (answers) => {
    // Simulation de génération IA basée sur les erreurs
    const incorrectAnswers = answers.filter(a => !a.correct);
    
    const aiQs = [
      {
        id: 'ai-1',
        question: "Donnez un exemple concret d'utilisation d'une base de données dans la vie quotidienne.",
        type: 'open',
        targetedConcept: 'Application pratique des BDD',
        adaptedToVARK: varkProfile?.visual > 60 ? 'Décrivez visuellement' : 'Expliquez en détail'
      },
      {
        id: 'ai-2',
        question: "Quelle est la différence entre une base de données et un fichier Excel ?",
        options: [
          { id: 'a', text: "Une BDD peut gérer des millions d'enregistrements efficacement", correct: true },
          { id: 'b', text: "Excel est plus rapide", correct: false },
          { id: 'c', text: "Il n'y a pas de différence", correct: false }
        ]
      }
    ];

    setAIQuestions(aiQs);
  };

  const handleAIComplete = () => {
    // Calculer le score final
    const h5pCorrect = quizAnswers.filter(a => a.correct).length;
    const totalQuestions = h5pQuestions.length + aiQuestions.length;
    const finalScore = Math.round(((h5pCorrect + 1) / totalQuestions) * 100); // +1 pour simuler bonne réponse IA
    
    setScore(finalScore);
    
    // Déterminer la recommandation
    if (finalScore >= 70) {
      setRecommendation({
        type: 'next',
        message: "Excellent ! Vous maîtrisez ce concept. Passons au grain suivant.",
        nextGrain: {
          id: grain.grainId + 1,
          title: "Les Tables et Types de Données",
          level: grain.difficultyLevel
        }
      });
    } else {
      setRecommendation({
        type: 'alternative',
        message: "Vous avez encore quelques lacunes. Voici un grain alternatif adapté à votre profil.",
        alternativeGrain: {
          id: 'alt-' + grain.grainId,
          title: "Introduction aux BDD - Version Interactive",
          adaptedTo: varkProfile?.visual > 60 ? 'Style Visuel' : 'Style ' + Object.keys(varkProfile || {}).sort((a,b) => varkProfile[b] - varkProfile[a])[0]
        }
      });
    }
    
    setCurrentPhase('results');
  };

  const getVARKIcon = () => {
    if (!varkProfile) return <Book size={20} />;
    const dominant = Object.entries(varkProfile).sort((a,b) => b[1] - a[1])[0][0];
    const icons = {
      visual: <Eye size={20} className="text-blue-500" />,
      auditory: <Headphones size={20} className="text-purple-500" />,
      reading: <BookOpen size={20} className="text-indigo-500" />,
      kinesthetic: <Hand size={20} className="text-pink-500" />
    };
    return icons[dominant] || <Book size={20} />;
  };

  const getLevelColor = (level) => {
    const colors = {
      'DEBUTANT': 'from-green-500 to-emerald-600',
      'INTERMEDIAIRE': 'from-yellow-500 to-orange-600',
      'AVANCE': 'from-red-500 to-pink-600'
    };
    return colors[level] || 'from-gray-500 to-gray-600';
  };

  // Phase 1: Contenu du grain
  if (currentPhase === 'content') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          {/* Header */}
          <div className={`bg-gradient-to-r ${getLevelColor(grain.difficultyLevel)} text-white p-6 rounded-t-2xl`}>
            <button 
              onClick={onClose}
              className="mb-4 flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour au dashboard
            </button>
            
            <h2 className="text-3xl font-bold mb-4">{grain.title}</h2>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {grain.estimatedDuration || 5} minutes
              </div>
              <div className="flex items-center">
                <Target size={16} className="mr-2" />
                {grain.difficultyLevel}
              </div>
              <div className="flex items-center">
                {getVARKIcon()}
                <span className="ml-2">{grain.targetVarkStyle}</span>
              </div>
            </div>
          </div>

          {/* Objectif pédagogique */}
          <div className="p-6 bg-blue-50 border-l-4 border-blue-500">
            <div className="flex items-start">
              <Lightbulb className="text-blue-600 mr-3 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Objectif Pédagogique</h3>
                <p className="text-gray-700">{grain.learningObjective || "Comprendre les concepts fondamentaux des bases de données"}</p>
              </div>
            </div>
          </div>

          {/* Contenu H5P Simulé */}
          <div className="p-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-6">
              <div className="flex items-center justify-center mb-6">
                <Play className="text-purple-600" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                C'est quoi une Base de Données ?
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Une base de données</strong> est un ensemble organisé d'informations stockées de façon structurée sur un ordinateur.
                </p>
                <p>
                  Imaginez un classeur avec des dizaines de tiroirs bien étiquetés. Chaque tiroir contient des fiches sur un sujet précis.
                </p>
                <p className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <strong>Une base de données, c'est exactement ça, mais en numérique et beaucoup plus puissant.</strong>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-2">✓ Avantages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Organisation structurée</li>
                      <li>• Recherche rapide</li>
                      <li>• Sécurité des données</li>
                      <li>• Partage multi-utilisateurs</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-blue-600 mb-2">📊 Exemples</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Netflix (films)</li>
                      <li>• Amazon (produits)</li>
                      <li>• Facebook (utilisateurs)</li>
                      <li>• Banques (comptes)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPhase('quiz-h5p')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center"
            >
              <CheckCircle size={24} className="mr-2" />
              Passer au Quiz H5P
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2: Quiz H5P
  if (currentPhase === 'quiz-h5p') {
    const currentQuestionIndex = quizAnswers.length;
    const currentQuestion = h5pQuestions[currentQuestionIndex];
    const isComplete = currentQuestionIndex >= h5pQuestions.length;

    if (isComplete) {
      const correctAnswers = quizAnswers.filter(a => a.correct).length;
      const h5pScore = Math.round((correctAnswers / h5pQuestions.length) * 100);

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quiz H5P Terminé</h3>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 text-center">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {h5pScore}%
              </div>
              <p className="text-gray-600">Score aux questions H5P</p>
              <p className="text-sm text-gray-500 mt-2">{correctAnswers}/{h5pQuestions.length} réponses correctes</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Analyse en cours...</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    L'IA génère des questions personnalisées basées sur vos erreurs pour cibler vos lacunes précises.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleH5PComplete}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Continuer vers les Questions IA
              <ChevronRight className="inline ml-2" size={20} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Quiz H5P</h3>
              <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1}/{h5pQuestions.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / h5pQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">{currentQuestion.question}</h4>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleH5PAnswer(currentQuestion.id, option.id)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">{option.id.toUpperCase()}</span>
                    </div>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: Questions générées par IA
  if (currentPhase === 'quiz-ai') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <Lightbulb className="text-purple-600 mr-3" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Questions Générées par l'IA</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Adaptées à votre profil {varkProfile && Object.keys(varkProfile).sort((a,b) => varkProfile[b] - varkProfile[a])[0]} et ciblant vos lacunes
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {aiQuestions.map((q, idx) => (
              <div key={q.id} className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                <p className="font-semibold text-gray-900 mb-4">{q.question}</p>
                {q.type === 'open' ? (
                  <textarea 
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    rows="4"
                    placeholder="Votre réponse..."
                  />
                ) : (
                  <div className="space-y-2">
                    {q.options.map(opt => (
                      <button
                        key={opt.id}
                        className="w-full text-left p-3 rounded-lg border border-gray-300 hover:border-purple-500 hover:bg-white transition-all"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
                <p className="text-xs text-purple-600 mt-3">
                  🎯 Concept ciblé: {q.targetedConcept}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAIComplete}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Terminer le Quiz
          </button>
        </div>
      </div>
    );
  }

  // Phase 4: Résultats et Recommandation
  if (currentPhase === 'results') {
    const isPassed = score >= 70;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          {/* Score Final */}
          <div className={`p-8 rounded-t-2xl ${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white text-center`}>
            <div className="text-8xl font-bold mb-4">{score}%</div>
            <h3 className="text-2xl font-bold mb-2">
              {isPassed ? '🎉 Félicitations !' : '📚 Continuez vos efforts !'}
            </h3>
            <p className="text-lg">
              {isPassed ? 'Vous maîtrisez ce concept !' : 'Quelques révisions sont nécessaires'}
            </p>
          </div>

          {/* Feedback Détaillé */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <h4 className="text-sm text-gray-600 mb-2">Questions H5P</h4>
                <p className="text-3xl font-bold text-blue-600">
                  {quizAnswers.filter(a => a.correct).length}/{h5pQuestions.length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <h4 className="text-sm text-gray-600 mb-2">Questions IA</h4>
                <p className="text-3xl font-bold text-purple-600">
                  {aiQuestions.length}/{aiQuestions.length}
                </p>
              </div>
            </div>

            {/* Recommandation */}
            <div className={`rounded-xl p-6 mb-6 ${isPassed ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'}`}>
              <div className="flex items-start">
                {isPassed ? (
                  <TrendingUp className="text-green-600 mr-4 mt-1" size={32} />
                ) : (
                  <RefreshCw className="text-orange-600 mr-4 mt-1" size={32} />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    {recommendation?.type === 'next' ? 'Grain Suivant Recommandé' : 'Grain Alternatif Recommandé'}
                  </h4>
                  <p className="text-gray-700 mb-4">{recommendation?.message}</p>
                  
                  {recommendation?.nextGrain && (
                    <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                      <p className="font-semibold text-gray-900">{recommendation.nextGrain.title}</p>
                      <p className="text-sm text-gray-600">Niveau: {recommendation.nextGrain.level}</p>
                    </div>
                  )}
                  
                  {recommendation?.alternativeGrain && (
                    <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                      <p className="font-semibold text-gray-900">{recommendation.alternativeGrain.title}</p>
                      <p className="text-sm text-gray-600">Adapté à votre profil: {recommendation.alternativeGrain.adaptedTo}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Retour au Dashboard
              </button>
              <button
                onClick={() => onComplete(score)}
                className={`flex-1 text-white py-3 rounded-xl font-semibold transition-all ${
                  isPassed 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                }`}
              >
                {isPassed ? 'Grain Suivant' : 'Grain Alternatif'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default GrainDetail;
