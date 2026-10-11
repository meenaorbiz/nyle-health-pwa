import { IPatientSessionRepository } from '../repositories/IPatientSessionRepository';
import { AnswerPayload } from '../entities/PatientSession';

export class SubmitOnboardingAnswer {
  constructor(private sessionRepo: IPatientSessionRepository) {}

  public async execute(sessionId: string, answer: AnswerPayload): Promise<void> {
    if (!sessionId || !answer.questionId) {
      throw new Error('Invalid answer submission payload.');
    }

    await this.sessionRepo.updateAnswer(sessionId, answer);
  }
}
