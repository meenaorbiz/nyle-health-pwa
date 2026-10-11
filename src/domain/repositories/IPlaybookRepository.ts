import { Playbook } from '../entities/Playbook';

export interface IPlaybookRepository {
  getActivePlaybook(): Promise<Playbook | null>;
  findById(id: string): Promise<Playbook | null>;
  save(playbook: Playbook): Promise<Playbook>;
}
