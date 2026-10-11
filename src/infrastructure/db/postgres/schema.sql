-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CLINIC CONFIGURATION & BRANDING
CREATE TABLE IF NOT EXISTS clinic_config (
    clinic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_name VARCHAR(255) NOT NULL DEFAULT 'Nyle Health',
    doctor_name VARCHAR(255) NOT NULL DEFAULT 'Dr. Neha Jain',
    doctor_title VARCHAR(255) DEFAULT 'MBBS, MS - Lead Gynecologist',
    logo_url TEXT NOT NULL,
    doctor_photo_url TEXT NOT NULL,
    promo_video_url TEXT,
    show_promo_video BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CLINICAL PLAYBOOKS & ADAPTIVE RULES
CREATE TABLE IF NOT EXISTS playbooks (
    playbook_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    version VARCHAR(20) DEFAULT 'v1.0',
    is_active BOOLEAN DEFAULT true,
    schema_definition JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PATIENT ONBOARDING SESSIONS & PERSISTENCE
CREATE TABLE IF NOT EXISTS patient_onboarding_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_phone VARCHAR(20) UNIQUE NOT NULL,
    client_name VARCHAR(255),
    playbook_id UUID REFERENCES playbooks(playbook_id),
    magic_link_token VARCHAR(255) UNIQUE NOT NULL,
    
    lead_status VARCHAR(50) DEFAULT 'INVITED', -- 'INVITED', 'IN_PROGRESS', 'COMPLETED', 'CONVERTED'
    current_section INT DEFAULT 1,
    completion_percentage INT DEFAULT 0,
    
    answers_data JSONB DEFAULT '{}'::jsonb,
    
    auto_nudge_count INT DEFAULT 0,
    last_nudge_sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_phone ON patient_onboarding_sessions(client_phone);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON patient_onboarding_sessions(magic_link_token);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON patient_onboarding_sessions(lead_status);
