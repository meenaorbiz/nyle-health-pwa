import { Question } from './Question';

export interface Playbook {
  id: string;
  title: string;
  version: string;
  isActive: boolean;
  sections: {
    sectionId: number;
    title: string;
    questions: Question[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}
