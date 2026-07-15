import postgres from 'postgres';

export const getData = async () => {
  const sql = postgres(`${process.env.DATABASE_URL}`, { ssl: 'require' });
  const response = await sql`SELECT version()`;
  return response[0].version;
}