export async function query(text: string, params?: any[]): Promise<{ rows: any[]; rowCount: number }> {
  console.log("[DB Stub Query]:", text, params);
  return { rows: [], rowCount: 0 };
}

export const pool = {
  query,
  connect: async () => ({
    query,
    release: () => {},
  }),
};
