-- SCHEMA POSTGRESQL
DROP TABLE IF EXISTS ai_generated_content CASCADE;
DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS learner_progress CASCADE;
DROP TABLE IF EXISTS grains CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS vark_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS difficulty_level CASCADE;
DROP TYPE IF EXISTS vark_style CASCADE;

CREATE TYPE user_role AS ENUM ('APPRENANT', 'ENSEIGNANT', 'ADMINISTRATEUR');
CREATE TYPE difficulty_level AS ENUM ('DEBUTANT', 'INTERMEDIAIRE', 'AVANCE');
CREATE TYPE vark_style AS ENUM ('VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'APPRENANT',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE vark_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    visual_score INTEGER CHECK (visual_score BETWEEN 0 AND 100),
    auditory_score INTEGER CHECK (auditory_score BETWEEN 0 AND 100),
    reading_score INTEGER CHECK (reading_score BETWEEN 0 AND 100),
    kinesthetic_score INTEGER CHECK (kinesthetic_score BETWEEN 0 AND 100),
    dominant_style vark_style,
    current_level difficulty_level DEFAULT 'DEBUTANT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    teacher_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_area VARCHAR(100),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, order_index)
);

CREATE TABLE grains (
    grain_id SERIAL PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(module_id) ON DELETE CASCADE,
    teacher_id INTEGER NOT NULL REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level difficulty_level NOT NULL,
    estimated_duration INTEGER CHECK (estimated_duration BETWEEN 3 AND 7),
    target_vark_style vark_style NOT NULL,
    learning_objective TEXT NOT NULL,
    h5p_content_id VARCHAR(255),
    h5p_content_url TEXT,
    h5p_content_json JSONB,
    h5p_quiz_id VARCHAR(255),
    h5p_quiz_url TEXT,
    quiz_passing_score INTEGER DEFAULT 70,
    prerequisites INTEGER[],
    order_index INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(module_id, order_index)
);

CREATE TABLE learner_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    grain_id INTEGER NOT NULL REFERENCES grains(grain_id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('NON_COMMENCE', 'EN_COURS', 'COMPLETE', 'MAITRISE')),
    best_score INTEGER CHECK (best_score BETWEEN 0 AND 100),
    attempts_count INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, grain_id)
);

CREATE TABLE quiz_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    grain_id INTEGER NOT NULL REFERENCES grains(grain_id) ON DELETE CASCADE,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    answers_json JSONB,
    missed_concepts TEXT[],
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    duration INTEGER,
    is_passed BOOLEAN GENERATED ALWAYS AS (score >= 70) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    grain_id INTEGER NOT NULL REFERENCES grains(grain_id) ON DELETE CASCADE,
    recommendation_score DECIMAL(5,2) CHECK (recommendation_score BETWEEN 0 AND 100),
    reason TEXT,
    recommendation_type VARCHAR(50) CHECK (recommendation_type IN ('NEXT_GRAIN', 'ALTERNATIVE', 'REMEDIATION', 'SIMILAR_LEARNERS')),
    algorithm_used VARCHAR(100),
    is_accepted BOOLEAN,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP
);

CREATE TABLE ai_generated_content (
    content_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    grain_id INTEGER NOT NULL REFERENCES grains(grain_id) ON DELETE CASCADE,
    attempt_id INTEGER REFERENCES quiz_attempts(attempt_id) ON DELETE SET NULL,
    content_type VARCHAR(50) CHECK (content_type IN ('SUPPLEMENTARY_QUESTIONS', 'ALTERNATIVE_EXPLANATION', 'REMEDIATION_EXERCISE')),
    generated_content JSONB NOT NULL,
    generation_prompt TEXT,
    adapted_vark_style vark_style,
    target_concepts TEXT[],
    model_used VARCHAR(50) DEFAULT 'claude-sonnet-4',
    generation_time INTEGER,
    tokens_used INTEGER,
    is_helpful BOOLEAN,
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE badges (
    badge_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    badge_type VARCHAR(50) CHECK (badge_type IN ('FIRST_GRAIN', 'STREAK_3', 'STREAK_7', 'PERFECT_SCORE', 'FAST_LEARNER', 'PERSISTENT', 'MODULE_MASTER', 'COURSE_COMPLETED', 'EARLY_ADOPTER')),
    badge_name VARCHAR(100) NOT NULL,
    badge_description TEXT,
    badge_icon_url TEXT,
    grain_id INTEGER REFERENCES grains(grain_id),
    module_id INTEGER REFERENCES modules(module_id),
    course_id INTEGER REFERENCES courses(course_id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_grains_prerequisites ON grains USING GIN(prerequisites);
CREATE INDEX idx_progress_user ON learner_progress(user_id);
