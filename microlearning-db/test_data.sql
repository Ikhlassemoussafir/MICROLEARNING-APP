INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@ensa.ma', '1234', 'Ahmed', 'Alaoui', 'ADMINISTRATEUR'),
('prof.benali@ensa.ma', '1234', 'Fatima', 'Benali', 'ENSEIGNANT'),
('youssef.amrani@ensa.ma', '1234', 'Youssef', 'Amrani', 'APPRENANT'),
('sara.idrissi@ensa.ma', '1234', 'Sara', 'Idrissi', 'APPRENANT');

INSERT INTO vark_profiles (user_id, visual_score, auditory_score, reading_score, kinesthetic_score, current_level) VALUES
(3, 85, 45, 60, 50, 'DEBUTANT'),
(4, 55, 40, 90, 45, 'INTERMEDIAIRE');

INSERT INTO courses (teacher_id, title, subject_area, is_published) VALUES
(2, 'Introduction aux Bases de Données', 'Bases de Données', TRUE);

INSERT INTO modules (course_id, title, order_index) VALUES
(1, 'Fondamentaux des BDD', 1),
(1, 'Requêtes SQL', 2);

INSERT INTO grains (module_id, teacher_id, title, difficulty_level, estimated_duration, target_vark_style, learning_objective, h5p_content_id, h5p_quiz_id, prerequisites, order_index, is_published) VALUES
(1, 2, 'C''est quoi une BDD ?', 'DEBUTANT', 5, 'VISUEL', 'Comprendre les bases de données', 'h5p-1', 'quiz-1', '{}', 1, TRUE),
(1, 2, 'Tables et types', 'DEBUTANT', 6, 'LECTURE', 'Maîtriser les types de données', 'h5p-2', 'quiz-2', '{1}', 2, TRUE),
(2, 2, 'SELECT de base', 'INTERMEDIAIRE', 5, 'AUDITIF', 'Écrire des requêtes SELECT', 'h5p-3', 'quiz-3', '{1,2}', 1, TRUE);
