export class PlaybookRepository {
  private playbooks = new Map<string, any>();

  async findById(id: string): Promise<any | null> {
    return this.playbooks.get(id) || null;
  }

  async findAll(): Promise<any[]> {
    return Array.from(this.playbooks.values());
  }

  async save(playbook: any): Promise<any> {
    const id = playbook.id || `pb_${Date.now()}`;
    const data = { ...playbook, id };
    this.playbooks.set(id, data);
    return data;
  }

  async getActivePlaybook(): Promise<any> {
    return { id: "default", steps: [] };
  }

  async getByStep(step: number): Promise<any> {
    return null;
  }
}
