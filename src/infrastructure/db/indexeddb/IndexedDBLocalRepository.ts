import { localDb, LocalDraftSession } from './client';
import { AnswerPayload } from '../../../domain/entities/PatientSession';

export class IndexedDBLocalRepository {
  public async saveLocalAnswer(sessionId: string, magicLinkToken: string, answer: AnswerPayload, currentSection: number): Promise<void> {
    const existing = await localDb.draftSessions.get(sessionId);
    const answers = existing?.answers || {};
    answers[answer.questionId] = answer;

    const draft: LocalDraftSession = {
      sessionId,
      magicLinkToken,
      currentSection,
      answers,
      isSynced: 0,
      updatedAt: new Date().toISOString(),
    };

    await localDb.draftSessions.put(draft);
  }

  public async getUnsyncedDrafts(): Promise<LocalDraftSession[]> {
    return await localDb.draftSessions.where('isSynced').equals(0).toArray();
  }

  public async markAsSynced(sessionId: string): Promise<void> {
    await localDb.draftSessions.update(sessionId, { isSynced: 1 });
  }
}
