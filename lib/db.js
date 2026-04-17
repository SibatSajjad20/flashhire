import { Pool } from 'pg';

// Initialize connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Executes raw SQL queries safely utilizing the connection pool.
 * @param {string} text - SQL Query string
 * @param {Array} params - Escaped parameters
 */
export const query = (text, params) => pool.query(text, params);

/**
 * Initialize Database tables securely.
 * Specifically creates: resumes, job_descriptions, optimized_resumes
 */
export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Resumes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id SERIAL PRIMARY KEY,
        original_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Job Descriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS job_descriptions (
        id SERIAL PRIMARY KEY,
        role_title VARCHAR(255),
        description_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Optimized Resumes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS optimized_resumes (
        id SERIAL PRIMARY KEY,
        resume_id INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
        job_description_id INTEGER REFERENCES job_descriptions(id) ON DELETE CASCADE,
        optimized_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query('COMMIT');
    console.log('Database initialized successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database schemas.', err);
    throw err;
  } finally {
    client.release();
  }
}
