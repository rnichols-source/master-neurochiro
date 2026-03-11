import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

const resendApiKey = process.env.RESEND_API_KEY;
const isMock = !resendApiKey || resendApiKey === 're_your_key';
const resend = isMock ? null : new Resend(resendApiKey);

const FROM_EMAIL = 'support@neurochirodirectory.com';

const BRAND_STYLE = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 40px 20px; 
  color: #ffffff;
  background-color: #0A192F;
  border-radius: 12px;
`;

function getEmailTemplate(title: string, preheader: string, contentHtml: string, actionHtml?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050E1D;">
        <div style="${BRAND_STYLE}">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">${preheader}</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">${title}</h1>
          <div style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 40px;">
            ${contentHtml}
          </div>
          ${actionHtml ? `<div style="margin-bottom: 40px;">${actionHtml}</div>` : ''}
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
            NeuroChiro Global Mastermind &bull; Precision Clinical Intelligence
          </p>
        </div>
      </body>
    </html>
  `;
}

export const EmailService = {
  async logAutomation(data: { email: string, event_type: string, status: 'sent' | 'failed', metadata?: any, error_message?: string }) {
    try {
      const supabase = createAdminClient();
      await supabase.from('automation_logs').insert([{
        user_email: data.email,
        event_type: data.event_type,
        automation_type: 'email',
        status: data.status,
        metadata: data.metadata || {},
        error_message: data.error_message
      }]);
    } catch (e) {
      console.error("[LOGGING ERROR]", e);
    }
  },

  async send(to: string, subject: string, html: string, event_type: string) {
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
      await this.logAutomation({ email: to, event_type, status: 'sent', metadata: { subject, mock: true } });
      return { data: { id: "mock_id" }, error: null };
    }
    
    try {
      const result = await resend!.emails.send({ from: FROM_EMAIL, to, subject, html });
      await this.logAutomation({ email: to, event_type, status: 'sent', metadata: { subject, resend_id: result.data?.id } });
      return result;
    } catch (err: any) {
      await this.logAutomation({ email: to, event_type, status: 'failed', error_message: err.message });
      throw err;
    }
  },

  // 1. APPLICATION FLOW
  async sendAppReceived(email: string, name: string) {
    const html = getEmailTemplate('Application Received', 'Admissions Update', `<p>Dr. ${name}, we have received your application data for the NeuroChiro Mastermind.</p>`);
    return this.send(email, 'Application Received: NeuroChiro Mastermind', html, 'app_received');
  },

  async sendAppApproved(email: string, name: string, checkoutUrl: string, planUrl?: string) {
    const pifAction = `<a href="${checkoutUrl}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Option 1: Paid in Full</a>`;
    const planAction = planUrl ? `<a href="${planUrl}" style="background-color: #2D3748; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-left: 12px;">Option 2: 3-Month Plan</a>` : '';
    
    const html = getEmailTemplate(
      `Congratulations, Dr. ${name}.`,
      'Admission Decision: Approved',
      `<p>You have been selected for the NeuroChiro Mastermind. After reviewing your practice data, we believe you are a strong fit for this reconstruction.</p><p>Please select your preferred enrollment option below to secure your seat:</p>`,
      `<div style="display: flex; flex-wrap: wrap; gap: 12px;">${pifAction}${planAction}</div>`
    );
    return this.send(email, 'Admission Decision: Approved', html, 'app_approved');
  },

  async sendWelcome(email: string, name: string) {
    const html = getEmailTemplate('Welcome to the OS', 'Installation Day 1', `<p>Dr. ${name}, your portal access is now active.</p>`);
    return this.send(email, 'Welcome to the OS: Installation Day 1', html, 'welcome_onboarding');
  },

  async sendProWelcome(email: string, name: string) {
    const bookingLink = "https://calendly.com/neurochiro-pro/1-on-1";
    const action = `<a href="${bookingLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Book Private 1:1 Call</a>`;
    const html = getEmailTemplate(
      'Welcome to Mastermind Pro', 
      'Elite Tier Activated', 
      `<p>Dr. ${name}, congratulations on joining the Pro tier. This level of access includes direct practice audits, private roadmap sessions, and hot-seat priority.</p><p><strong>Step 1:</strong> Use the button below to schedule your first 1:1 session with Dr. Nichols.</p>`, 
      action
    );
    return this.send(email, 'Welcome to Mastermind Pro: Execution Phase', html, 'pro_welcome');
  },

  async sendProCallReminder(email: string, name: string) {
    const bookingLink = "https://calendly.com/neurochiro-pro/1-on-1";
    const action = `<a href="${bookingLink}" style="background-color: #2D3748; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Book 1:1 Session</a>`;
    const html = getEmailTemplate(
      'Pro Benefit: 1:1 Call Pending',
      'Execution Reminder',
      `<p>Dr. ${name}, you haven't scheduled your private 1:1 call for this month. Don't let your momentum stall—book your session today.</p>`,
      action
    );
    return this.send(email, 'Mastermind Pro: Monthly 1:1 Reminder', html, 'pro_booking_reminder');
  },

  async sendPaymentFailed(email: string, name: string, updateUrl: string) {
    const action = `<a href="${updateUrl}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Update Billing</a>`;
    const html = getEmailTemplate('Action Required: Payment Failed', 'Billing Alert', `<p>Dr. ${name}, we were unable to process your most recent mastermind payment.</p>`, action);
    return this.send(email, 'Action Required: Update Mastermind Billing', html, 'payment_failed');
  },

  async sendOnboardingReady(email: string, name: string, activationLink?: string) {
    const link = activationLink || `${process.env.NEXT_PUBLIC_SITE_URL}/portal`;
    const action = `<a href="${link}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Activate Portal</a>`;
    const html = getEmailTemplate('Your Mastermind Portal Is Ready', 'Platform Transition', `<p>Dr. ${name}, your Command Center is fully configured.</p>`, action);
    return this.send(email, 'Your NeuroChiro Mastermind Portal Is Ready', html, 'onboarding_ready');
  },

  async sendPasswordReset(email: string, resetLink: string) {
    const action = `<a href="${resetLink}" style="background-color: #2D3748; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Set Password</a>`;
    const html = getEmailTemplate('Set Your Password', 'Account Security', '<p>Please click below to set your secure password.</p>', action);
    return this.send(email, 'Set Your NeuroChiro Password', html, 'password_reset');
  },

  async sendCallReminder(email: string, timeText: string, zoomLink: string) {
    const action = `<a href="${zoomLink}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Join Zoom Call</a>`;
    const html = getEmailTemplate('Live Mastermind Call', timeText, `<p>Our next clinical call is starting soon.</p>`, action);
    return this.send(email, `Mastermind Call ${timeText}`, html, 'call_reminder');
  },

  async sendReplayAvailable(email: string, callTitle: string, replayLink: string) {
    const action = `<a href="${replayLink}" style="background-color: #2D3748; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Watch Replay</a>`;
    const html = getEmailTemplate('Call Replay Available', 'Vault Update', `<p>The recording for <strong>${callTitle}</strong> is now in the Vault.</p>`, action);
    return this.send(email, `Replay Uploaded: ${callTitle}`, html, 'replay_available');
  },

  async sendReengagement(email: string, name: string, portalLink: string) {
    const action = `<a href="${portalLink}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Resume Implementation</a>`;
    const html = getEmailTemplate('Momentum Check', 'Action Required', `<p>Dr. ${name}, we noticed you haven't logged into the OS recently.</p>`, action);
    return this.send(email, 'Mastermind Momentum Check', html, 'reengagement');
  },

  async sendProInvite(email: string, name: string, infoLink: string) {
    const action = `<a href="${infoLink}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">View Pro Details</a>`;
    const html = getEmailTemplate('Mastermind Pro Invitation', 'Advanced Access', `<p>Dr. ${name}, based on your progress, you are eligible to upgrade to the Mastermind Pro tier.</p>`, action);
    return this.send(email, 'Invitation: Upgrade to Mastermind Pro', html, 'pro_invite');
  },

  async sendCouncilTransition(email: string, name: string, applyLink: string) {
    const action = `<a href="${applyLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Apply for Council</a>`;
    const html = getEmailTemplate('The Next Evolution', 'Mastermind Completion', `<p>Dr. ${name}, congratulations on completing the 8-week framework.</p>`, action);
    return this.send(email, 'Next Steps: NeuroChiro Council', html, 'council_transition');
  },
  
  async sendEventConfirmation(email: string, name: string, eventTitle: string) {
    const html = getEmailTemplate('Seat Reserved', 'Event Confirmation', `<p>Dr. ${name}, you are registered for <strong>${eventTitle}</strong>.</p>`);
    return this.send(email, `Seat Reserved: ${eventTitle}`, html, 'event_confirmation');
  }
};
