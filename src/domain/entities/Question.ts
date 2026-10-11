export type InputType = 'VOICE_AND_TEXT' | 'MULTIPLE_CHOICE' | 'SEVERITY_SCALE' | 'TEXT_ONLY';

export interface AnswerOption {
  label: string;
  value: string;
  isFlagged?: boolean;
}

export interface AdaptiveRule {
  field: string;
  operator: 'EQUALS' | 'GREATER_THAN' | 'INCLUDES';
  value: string | number;
  targetQuestionId: string;
}

export interface Question {
  id: string;
  sectionId: number; // 1: Baseline, 2: Profile/Symptoms, 3: Review
  promptText: string;
  voiceSynthesisScript: string; // Used by Sarvam/TTS to speak in Dr. Neha's voice
  inputType: InputType;
  options?: AnswerOption[];
  adaptiveRules?: AdaptiveRule[];
  isRequired: boolean;
}
