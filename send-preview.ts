import { EmailService } from './src/lib/emails';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function main() {
  const adminEmail = 'drray@neurochirodirectory.com';
  const previewName = 'Dr. Raymond (Admin Preview)';
  const previewLink = 'https://neurochiromastermind.com/portal';
  
  console.log('Sending preview to ' + adminEmail + '...');
  try {
    const result = await EmailService.sendOnboardingReady(adminEmail, previewName, previewLink);
    console.log('Preview sent successfully!', result);
  } catch (err) {
    console.error('Failed to send preview:', err);
  }
}

main();
