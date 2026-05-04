-- Données de test avancées pour démo du 18 Mai 2026

-- Création de quelques apprenants supplémentaires (si user_id de 4 à 8 n'existent pas ou sont insuffisants)
-- On suppose que user_id=3 est l'utilisateur de démo principal (Apprenant)

-- 1. Insertions Learner Progress (20+ progressions)
INSERT INTO learner_progress (user_id, grain_id, status, best_score, attempts_count, time_spent, started_at, completed_at) VALUES 
(3, 1, 'MAITRISE', 95, 1, 300, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
(3, 2, 'MAITRISE', 100, 2, 450, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
(3, 3, 'COMPLETE', 80, 1, 360, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
(3, 4, 'COMPLETE', 75, 3, 600, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
(3, 5, 'EN_COURS', 60, 2, 400, NOW() - INTERVAL '2 days', NULL),
(4, 1, 'MAITRISE', 90, 1, 320, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
(4, 2, 'COMPLETE', 70, 2, 480, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
(4, 3, 'EN_COURS', 50, 1, 200, NOW() - INTERVAL '13 days', NULL),
(5, 1, 'COMPLETE', 85, 1, 310, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
(5, 2, 'COMPLETE', 75, 1, 400, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
(5, 3, 'COMPLETE', 85, 1, 380, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
(5, 4, 'EN_COURS', 65, 2, 550, NOW() - INTERVAL '1 days', NULL),
(6, 1, 'MAITRISE', 100, 1, 290, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
(6, 2, 'MAITRISE', 95, 1, 350, NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days'),
(6, 3, 'MAITRISE', 90, 1, 340, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
(6, 4, 'MAITRISE', 85, 1, 400, NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days'),
(6, 5, 'MAITRISE', 95, 1, 420, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),
(6, 6, 'COMPLETE', 80, 2, 500, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
(7, 1, 'COMPLETE', 75, 1, 330, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
(7, 2, 'EN_COURS', 40, 1, 150, NOW() - INTERVAL '2 days', NULL);

-- 2. Insertions Quiz Attempts
INSERT INTO quiz_attempts (user_id, grain_id, score, answers_json, missed_concepts, started_at, completed_at, duration) VALUES
(3, 1, 95, '{"q1":"A", "q2":"B", "q3":"C", "q4":"A"}', '{}', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days' + INTERVAL '5 minutes', 300),
(3, 2, 60, '{"q1":"A", "q2":"C", "q3":"D", "q4":"A"}', '{"Types de données"}', NOW() - INTERVAL '9 days' - INTERVAL '10 minutes', NOW() - INTERVAL '9 days' - INTERVAL '5 minutes', 300),
(3, 2, 100, '{"q1":"A", "q2":"B", "q3":"A", "q4":"A"}', '{}', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '5 minutes', 300),
(3, 5, 60, '{"q1":"A", "q2":"C", "q3":"C", "q4":"A"}', '{"Filtre WHERE", "Tri ORDER BY"}', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '5 minutes', 300);

-- 3. Insertions Recommendations
INSERT INTO recommendations (user_id, grain_id, recommendation_score, reason, recommendation_type, algorithm_used, is_accepted, is_active, created_at) VALUES
(3, 6, 85.50, 'Vous avez complété les filtres WHERE. Voici la suite logique sur les jointures.', 'NEXT_GRAIN', 'Rule-based', true, false, NOW() - INTERVAL '2 days'),
(3, 5, 92.00, 'Votre dernier score était de 60%. Revoyons ce concept avec une approche visuelle.', 'ALTERNATIVE', 'VARK_ADAPTATION', false, true, NOW() - INTERVAL '1 days'),
(4, 3, 88.00, 'Découvrez la clé primaire.', 'NEXT_GRAIN', 'Rule-based', false, true, NOW() - INTERVAL '13 days'),
(5, 5, 90.00, 'Passons aux filtres WHERE et ORDER BY.', 'NEXT_GRAIN', 'Rule-based', false, true, NOW() - INTERVAL '1 days');

-- 4. Insertions Ai Generated Content
INSERT INTO ai_generated_content (user_id, grain_id, attempt_id, content_type, generated_content, adapted_vark_style, target_concepts, is_helpful) VALUES
(3, 2, 2, 'ALTERNATIVE_EXPLANATION', '{"title": "Les types de données en BD", "content": "Imaginez une boîte avec des étiquettes (TEXT, INT, BOOLEAN)..."}', 'VISUEL', '{"Types de données"}', true),
(3, 5, 4, 'REMEDIATION_EXERCISE', '{"questions": [{"q": "Que fait ORDER BY ?", "options": ["Trier", "Filtrer"], "correct": 0}]}', 'KINESTHESIQUE', '{"Tri ORDER BY"}', false);

-- 5. Insertions Badges (Gamification)
INSERT INTO badges (user_id, badge_type, badge_name, badge_description, earned_at) VALUES
(3, 'FIRST_GRAIN', 'Premier Pas', 'Vous avez complété votre premier grain d''apprentissage.', NOW() - INTERVAL '10 days'),
(3, 'STREAK_3', 'Série de 3', 'Vous avez étudié 3 jours de suite.', NOW() - INTERVAL '7 days'),
(6, 'FIRST_GRAIN', 'Premier Pas', 'Vous avez complété votre premier grain d''apprentissage.', NOW() - INTERVAL '20 days'),
(6, 'MODULE_MASTER', 'Maître du Module 1', 'Vous avez complété tous les grains du module débutant avec succès.', NOW() - INTERVAL '18 days');
