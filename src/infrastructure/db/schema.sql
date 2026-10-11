-- 1. Playbooks Table
CREATE TABLE IF NOT EXISTS playbooks (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  version VARCHAR(32) NOT NULL DEFAULT 'v1.0',
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(64) PRIMARY KEY,
  playbook_id VARCHAR(64) REFERENCES playbooks(id) ON DELETE CASCADE,
  section VARCHAR(32) NOT NULL CHECK (section IN ('baseline', 'adaptive')),
  sequence INT NOT NULL,
  question_text TEXT NOT NULL,
  input_type VARCHAR(32) NOT NULL,
  is_required BOOLEAN DEFAULT true,
  conditional_rules JSONB DEFAULT '{}'::jsonb,
  voice_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Patient Intake Sessions Table (Captures Language & Identity for AI Personalization)
CREATE TABLE IF NOT EXISTS patient_sessions (
  id VARCHAR(64) PRIMARY KEY,
  playbook_id VARCHAR(64) REFERENCES playbooks(id),
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  preferred_language VARCHAR(10) NOT NULL DEFAULT 'en',
  current_step INT DEFAULT 1,
  answers JSONB DEFAULT '{}'::jsonb,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
