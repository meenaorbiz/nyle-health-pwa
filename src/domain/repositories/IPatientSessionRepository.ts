import { PatientSession, AnswerPayload } from '../entities/PatientSession';

export interface IPatientSessionRepository {
  findByToken(token: string): Promise<PatientSession | null>;
  findByPhone(phone: string): Promise<PatientSession | null>;
  save(session: PatientSession): Promise<PatientSession>;
  updateAnswer(sessionId: string, answer: AnswerPayload): Promise<void>;
  updateProgress(sessionId: string, section: number, percentage: number): Promise<void>;
}
