export type LeadStatus = 'INVITED' | 'IN_PROGRESS' | 'COMPLETED' | 'CONVERTED';

export interface AnswerPayload {
  questionId: string;
  rawAudioUrl?: string;
  transcribedText?: string;
  selectedOptions?: string[];
  severityRating?: number;
  confidenceScore?: number;
  updatedAt: string;
}

export interface PatientSession {
  sessionId: string;
  clientPhone: string;
  clientName?: string;
  playbookId: string;
  magicLinkToken: string;
  leadStatus: LeadStatus;
  currentSection: number;
  completionPercentage: number;
  answers: Record<string, AnswerPayload>;
  autoNudgeCount: number;
  lastNudgeSentAt?: Date;
  createdAt: Date;
  lastActiveAt: Date;
}
