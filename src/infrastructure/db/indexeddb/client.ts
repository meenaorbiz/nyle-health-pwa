import Dexie, { Table } from 'dexie';
import { AnswerPayload } from '../../../domain/entities/PatientSession';

export interface LocalDraftSession {
  sessionId: string;
  magicLinkToken: string;
  currentSection: number;
  answers: Record<string, AnswerPayload>;
  isSynced: number; // 0: pending sync, 1: synced to Cloud SQL
  updatedAt: string;
}

export class NyleLocalDatabase extends Dexie {
  draftSessions!: Table<LocalDraftSession>;

  constructor() {
    super('NyleHealthLocalDB');
    this.version(1).stores({
      draftSessions: 'sessionId, magicLinkToken, isSynced, updatedAt',
    });
  }
}

export const localDb = new NyleLocalDatabase();
