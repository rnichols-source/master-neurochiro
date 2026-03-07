'use server'

import fs from 'fs';
import path from 'path';

export async function getManuscriptContent() {
  try {
    const filePath = path.join(process.cwd(), 'MANUSCRIPT.md');
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, data: content };
  } catch (error) {
    console.error('Error reading MANUSCRIPT.md:', error);
    return { success: false, error: 'Failed to load manuscript.' };
  }
}
