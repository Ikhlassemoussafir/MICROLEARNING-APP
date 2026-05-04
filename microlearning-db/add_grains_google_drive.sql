-- Script SQL pour ajouter 9 grains avec liens Google Drive
-- AVANT D'EXÉCUTER : Remplace TOUS les liens par tes vrais liens Google Drive !

BEGIN;

-- Nettoyer les anciennes données
DELETE FROM quiz_attempts;
DELETE FROM learner_progress;
DELETE FROM grains;

-- ============================================================
-- GRAIN 1 : C'est quoi une base de données ?
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    1, 2, 'C''est quoi une base de données ?',
    'DEBUTANT', 5, 'VISUEL',
    'Comprendre ce qu''est une base de données et pourquoi on en a besoin',
    'https://docs.google.com/presentation/d/1rBGA7hpgsJN_bZTv5gosT0JaQEZHEGMh/edit?usp=drive_link&ouid=109000392790389669812&rtpof=true&sd=true',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/1Dnr8QAEv4PU2vTi_tehjXVv7QYRwi5W7/view?usp=drive_link',   -- ← REMPLACE ICI
    ARRAY[]::INTEGER[], 70, 1, true
);

-- ============================================================
-- GRAIN 2 : Les tables, colonnes et types de données
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    1, 2, 'Les tables, colonnes et types de données',
    'DEBUTANT', 6, 'LECTURE',
    'Comprendre la structure des tables en SQL',
    'https://docs.google.com/presentation/d/1MkUnLYrKYVKrVDA6tOq_JcOAeIdl7psq/edit?usp=sharing&ouid=109000392790389669812&rtpof=true&sd=true',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/1O1ChI5dU_bnfOTHmZn_UKSc1eom8ifvu/view?usp=drive_link',   -- ← REMPLACE ICI
    ARRAY[1]::INTEGER[], 70, 2, true
);

-- ============================================================
-- GRAIN 3 : La clé primaire et la clé étrangère
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    1, 2, 'La clé primaire et la clé étrangère',
    'DEBUTANT', 6, 'VISUEL',
    'Comprendre le rôle des clés dans les bases de données',
    'https://drive.google.com/file/d/1me4iEJbLTypu6yMaGnfqvhLCBbYjPSO9/view?usp=sharing',  -- ← REMPLACE ICI
     'https://docs.google.com/presentation/d/1qOV4dkhqxXbNP8dUQHiMJjzjXGnT0pUa/edit?usp=drive_link&ouid=109000392790389669812&rtpof=true&sd=true',   -- ← REMPLACE ICI
    ARRAY[1, 2]::INTEGER[], 70, 3, true
);

-- ============================================================
-- GRAIN 4 : Les requêtes SELECT de base
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    2, 2, 'Les requêtes SELECT de base',
    'INTERMEDIAIRE', 7, 'KINESTHESIQUE',
    'Savoir écrire des requêtes SELECT simples',
    'https://docs.google.com/presentation/d/10NjEXfbnqaIioxOoH-osaso2mSFxSxyT/edit?usp=drive_link&ouid=109000392790389669812&rtpof=true&sd=true',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/14ZQw0Hs47onr-afri-FuRj9BM6IJLiMe/view?usp=drive_link',   -- ← REMPLACE ICI
    ARRAY[3]::INTEGER[], 70, 1, true
);

-- ============================================================
-- GRAIN 5 : Les filtres WHERE et ORDER BY
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    2, 2, 'Les filtres WHERE et ORDER BY',
    'INTERMEDIAIRE', 6, 'KINESTHESIQUE',
    'Filtrer et trier les résultats SQL',
    'https://drive.google.com/file/d/TON_ID_SLIDES_GRAIN_5/preview',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/TON_ID_VIDEO_GRAIN_5/preview',   -- ← REMPLACE ICI
    ARRAY[4]::INTEGER[], 70, 2, true
);

-- ============================================================
-- GRAIN 6 : Les jointures (JOIN)
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    2, 2, 'Les jointures (JOIN)',
    'INTERMEDIAIRE', 7, 'VISUEL',
    'Combiner des données de plusieurs tables',
    'https://drive.google.com/file/d/TON_ID_SLIDES_GRAIN_6/preview',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/TON_ID_VIDEO_GRAIN_6/preview',   -- ← REMPLACE ICI
    ARRAY[4, 5]::INTEGER[], 70, 3, true
);

-- ============================================================
-- GRAIN 7 : Les fonctions d'agrégation
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    3, 2, 'Les fonctions d''agrégation',
    'AVANCE', 7, 'LECTURE',
    'Utiliser COUNT, SUM, AVG, MIN et MAX',
    'https://drive.google.com/file/d/TON_ID_SLIDES_GRAIN_7/preview',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/TON_ID_VIDEO_GRAIN_7/preview',   -- ← REMPLACE ICI
    ARRAY[6]::INTEGER[], 70, 1, true
);

-- ============================================================
-- GRAIN 8 : Les sous-requêtes
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    3, 2, 'Les sous-requêtes',
    'AVANCE', 7, 'KINESTHESIQUE',
    'Écrire des requêtes imbriquées',
    'https://drive.google.com/file/d/TON_ID_SLIDES_GRAIN_8/preview',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/TON_ID_VIDEO_GRAIN_8/preview',   -- ← REMPLACE ICI
    ARRAY[7]::INTEGER[], 70, 2, true
);

-- ============================================================
-- GRAIN 9 : Les transactions et l'intégrité des données
-- ============================================================
INSERT INTO grains (
    module_id, teacher_id, title, difficulty_level, estimated_duration,
    target_vark_style, learning_objective, 
    h5p_content_id, h5p_quiz_id,
    prerequisites, quiz_passing_score, order_index, is_published
) VALUES (
    3, 2, 'Les transactions et l''intégrité des données',
    'AVANCE', 7, 'LECTURE',
    'Comprendre COMMIT, ROLLBACK et les contraintes',
    'https://drive.google.com/file/d/TON_ID_SLIDES_GRAIN_9/preview',  -- ← REMPLACE ICI
    'https://drive.google.com/file/d/TON_ID_VIDEO_GRAIN_9/preview',   -- ← REMPLACE ICI
    ARRAY[8]::INTEGER[], 70, 3, true
);

-- ============================================================
-- Données de progression pour la démo
-- ============================================================
INSERT INTO learner_progress (user_id, grain_id, status, best_score, attempts_count, time_spent, completed_at)
VALUES 
    (3, 1, 'MAITRISE', 95, 2, 4, NOW() - INTERVAL '2 days'),
    (3, 2, 'MAITRISE', 88, 1, 5, NOW() - INTERVAL '1 day'),
    (3, 3, 'COMPLETE', 72, 2, 6, NOW() - INTERVAL '6 hours');

COMMIT;

-- ============================================================
-- VÉRIFICATION : Afficher tous les grains créés
-- ============================================================
SELECT 
    grain_id,
    title,
    difficulty_level,
    h5p_content_id as lien_slides,
    h5p_quiz_id as lien_video
FROM grains 
ORDER BY grain_id;

-- Tu dois voir 9 grains avec tes liens Google Drive !
