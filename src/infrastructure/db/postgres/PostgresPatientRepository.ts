import { pgPool } from './client';
import { IPatientSessionRepository } from '../../../domain/repositories/IPatientSessionRepository';
import { PatientSession, AnswerPayload } from '../../../domain/entities/PatientSession';

export class PostgresPatientRepository implements IPatientSessionRepository {
  public async findByToken(token: string): Promise<PatientSession | null> {
    const res = await pgPool.query(
      `SELECT session_id as "sessionId", client_phone as "clientPhone", client_name as "clientName",
              playbook_id as "playbookId", magic_link_token as "magicLinkToken", lead_status as "leadStatus",
              current_section as "currentSection", completion_percentage as "completionPercentage",
              answers_data as "answers", auto_nudge_count as "autoNudgeCount",
              last_nudge_sent_at as "lastNudgeSentAt", created_at as "createdAt", last_active_at as "lastActiveAt"
       FROM patient_onboarding_sessions WHERE magic_link_token = $1`,
      [token]
    );
    return res.rows[0] || null;
  }

  public async findByPhone(phone: string): Promise<PatientSession | null> {
    const res = await pgPool.query(
      `SELECT session_id as "sessionId", client_phone as "clientPhone", client_name as "clientName",
              playbook_id as "playbookId", magic_link_token as "magicLinkToken", lead_status as "leadStatus",
              current_section as "currentSection", completion_percentage as "completionPercentage",
              answers_data as "answers", auto_nudge_count as "autoNudgeCount",
              last_nudge_sent_at as "lastNudgeSentAt", created_at as "createdAt", last_active_at as "lastActiveAt"
       FROM patient_onboarding_sessions WHERE client_phone = $1`,
      [phone]
    );
    return res.rows[0] || null;
  }

  public async save(session: PatientSession): Promise<PatientSession> {
    await pgPool.query(
      `INSERT INTO patient_onboarding_sessions 
       (session_id, client_phone, client_name, playbook_id, magic_link_token, lead_status, current_section, completion_percentage, answers_data)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (session_id) DO UPDATE SET
         lead_status = EXCLUDED.lead_status,
         current_section = EXCLUDED.current_section,
         completion_percentage = EXCLUDED.completion_percentage,
         answers_data = EXCLUDED.answers_data,
         last_active_at = CURRENT_TIMESTAMP`,
      [
        session.sessionId,
        session.clientPhone,
        session.clientName || null,
        session.playbookId,
        session.magicLinkToken,
        session.leadStatus,
        session.currentSection,
        session.completionPercentage,
        JSON.stringify(session.answers),
      ]
    );
    return session;
  }

  public async updateAnswer(sessionId: string, answer: AnswerPayload): Promise<void> {
    await pgPool.query(
      `UPDATE patient_onboarding_sessions
       SET answers_data = jsonb_set(answers_data, ARRAY[$1], $2::jsonb, true),
           last_active_at = CURRENT_TIMESTAMP
       WHERE session_id = $3`,
      [answer.questionId, JSON.stringify(answer), sessionId]
    );
  }

  public async updateProgress(sessionId: string, section: number, percentage: number): Promise<void> {
    await pgPool.query(
      `UPDATE patient_onboarding_sessions
       SET current_section = $1, completion_percentage = $2, last_active_at = CURRENT_TIMESTAMP
       WHERE session_id = $3`,
      [section, percentage, sessionId]
    );
  }
}
