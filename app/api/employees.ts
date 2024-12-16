import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../constants/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database query failed:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
}
