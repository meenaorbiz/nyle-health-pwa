import { Question } from '../entities/Question';
import { PatientSession } from '../entities/PatientSession';

export class ResolveAdaptiveNextQuestion {
  public execute(session: PatientSession, allQuestions: Question[]): Question[] {
    return allQuestions.filter(question => {
      if (!question.adaptiveRules || question.adaptiveRules.length === 0) {
        return true;
      }
      
      return question.adaptiveRules.every(rule => {
        const answer = session.answers[rule.field];
        if (!answer) return false;

        if (rule.operator === 'EQUALS') {
          return answer.selectedOptions?.includes(String(rule.value)) || 
                 answer.transcribedText?.toLowerCase() === String(rule.value).toLowerCase();
        }
        
        if (rule.operator === 'GREATER_THAN') {
          return (answer.severityRating ?? 0) > Number(rule.value);
        }

        return true;
      });
    });
  }
}
