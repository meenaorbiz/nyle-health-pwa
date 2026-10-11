export type SupportedLanguage = "en" | "hi" | "mr" | "ta" | "te" | "bn";

export interface PatientIntakeSession {
  id: string;
  playbookId: string;
  firstName: string;
  lastName: string;
  preferredLanguage: SupportedLanguage;
  currentStep: number;
  answers: Record<string, any>;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
