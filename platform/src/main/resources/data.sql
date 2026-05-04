INSERT INTO users (user_id, email, first_name, last_name, role) VALUES 
(1, 'prof.alami@ensa.ma', 'Prof', 'Alami', 'ENSEIGNANT'),
(2, 'youssef.amrani@ensa.ma', 'Youssef', 'Amrani', 'APPRENANT');

INSERT INTO vark_profile (profile_id, user_id, visual_score, auditory_score, reading_score, kinesthetic_score, dominant_style) VALUES 
(1, 2, 40, 20, 30, 10, 'VISUAL');

INSERT INTO grains (grain_id, title, description, difficulty_level, target_vark_style, estimated_duration, is_published, teacher_id) VALUES 
(1, 'Introduction aux Bases de Données', 'Découvrez les concepts fondamentaux des SGBD relationnels.', 'DEBUTANT', 'VISUAL', 5, true, 1),
(2, 'La commande SELECT', 'Apprenez à interroger une base de données avec SQL.', 'DEBUTANT', 'READING', 8, true, 1),
(3, 'Les Jointures (JOIN)', 'Maîtrisez la combinaison de données provenant de plusieurs tables.', 'INTERMEDIAIRE', 'KINESTHETIC', 12, true, 1);

INSERT INTO badges (badge_id, badge_type, name, description, requirement, icon_url, user_id) VALUES 
(1, 'FIRST_GRAIN', 'Premier Pas', 'Compléter votre premier grain', 'Compléter 1 grain', 'book', 2);
