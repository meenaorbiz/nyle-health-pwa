export class SessionRepository {
  private sessions = new Map<string, any>();

  async createSession(...args: any[]): Promise<any> {
    const firstArg = args[0] || {};
    const id = (typeof firstArg === "object" && firstArg?.id) ? firstArg.id : `sess_${Date.now()}`;
    const session = { id, args, createdAt: new Date(), updatedAt: new Date() };
    this.sessions.set(id, session);
    return session;
  }

  async updateAnswers(...args: any[]): Promise<any> {
    const [sessionId, answers, step] = args;
    const existing = this.sessions.get(sessionId) || {};
    const updated = {
      ...existing,
      answers: { ...(existing.answers || {}), ...answers },
      currentStep: step,
      updatedAt: new Date()
    };
    this.sessions.set(sessionId, updated);
    return updated;
  }

  async save(...args: any[]): Promise<any> {
    const session = args[0] || {};
    const id = session.id || `sess_${Date.now()}`;
    const data = { ...session, id, updatedAt: new Date() };
    this.sessions.set(id, data);
    return data;
  }

  async findById(...args: any[]): Promise<any | null> {
    return this.sessions.get(args[0]) || null;
  }

  async findByPhone(...args: any[]): Promise<any | null> {
    for (const session of this.sessions.values()) {
      if (session.phoneNumber === args[0]) return session;
    }
    return null;
  }

  async updateStatus(...args: any[]): Promise<any | null> {
    const [id, status] = args;
    const existing = this.sessions.get(id);
    if (!existing) return null;
    const updated = { ...existing, status, updatedAt: new Date() };
    this.sessions.set(id, updated);
    return updated;
  }
}
