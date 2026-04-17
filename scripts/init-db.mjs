
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Import db.js dynamically AFTER environment variables are loaded
const { initDb } = await import('../lib/db.js');

console.log('Starting database initialization...');

initDb()
  .then(() => {
    console.log('Database setup complete. You can now start the Next.js server.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database setup failed. Make sure your DATABASE_URL in .env.local is correct.', err);
    process.exit(1);
  });
