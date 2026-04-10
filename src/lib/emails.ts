import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

const resendApiKey = process.env.RESEND_API_KEY;
const isMock = !resendApiKey || resendApiKey === 're_your_key';
const resend = isMock ? null : new Resend(resendApiKey);

const FROM_EMAIL = process.env.FROM_EMAIL || 'support@neurochiromastermind.com';

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

  async sendAppRejected(email: string, name: string) {
    const html = getEmailTemplate(
      'Application Update',
      'Admissions Decision',
      `<p>Dr. ${name}, thank you for your interest in the NeuroChiro Mastermind.</p><p>After reviewing your application, we've decided this isn't the right fit at this time. This isn't a reflection of your potential — the timing or circumstances may not be ideal right now.</p><p>You're welcome to reapply in the future. If you have questions, reply to this email and we'll be happy to help.</p>`
    );
    return this.send(email, 'Application Update: NeuroChiro Mastermind', html, 'app_rejected');
  },

  async sendAppWaitlisted(email: string, name: string) {
    const html = getEmailTemplate(
      'You\'re On the Waitlist',
      'Admissions Update',
      `<p>Dr. ${name}, thank you for applying to the NeuroChiro Mastermind.</p><p>We've reviewed your application and would like to offer you a spot on our waitlist for the next available cohort. We'll reach out as soon as a seat opens up.</p><p>In the meantime, feel free to reply to this email with any questions.</p>`
    );
    return this.send(email, 'Waitlist Confirmation: NeuroChiro Mastermind', html, 'app_waitlisted');
  },

  async sendWelcome(email: string, name: string) {
    const html = getEmailTemplate('Welcome to the Mastermind', 'Your Portal Is Ready', `<p>Dr. ${name}, your portal access is now active. Log in to start your 8-week program.</p>`);
    return this.send(email, 'Welcome to the Mastermind', html, 'welcome_onboarding');
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

  async sendReengagement(email: string, name: string, portalLink: string) {
    const action = `<a href="${portalLink}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Resume Implementation</a>`;
    const html = getEmailTemplate('Momentum Check', 'Action Required', `<p>Dr. ${name}, we noticed you haven't logged into the OS recently.</p>`, action);
    return this.send(email, 'Mastermind Momentum Check', html, 'reengagement');
  },

  async sendCouncilTransition(email: string, name: string, applyLink: string) {
    const action = `<a href="${applyLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Apply for Council</a>`;
    const html = getEmailTemplate('The Next Evolution', 'Mastermind Completion', `<p>Dr. ${name}, congratulations on completing the 8-week framework.</p>`, action);
    return this.send(email, 'Next Steps: NeuroChiro Council', html, 'council_transition');
  },

  async sendAdminPreview(adminEmail: string, previewName: string, previewLink: string) {
    const action = `<a href="${previewLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">View Admin Preview</a>`;
    const html = getEmailTemplate(
      'System: Onboarding Preview', 
      'Admin Utility', 
      `<p>You are viewing a preview of the onboarding sequence for: <strong>${previewName}</strong>.</p>`, 
      action
    );
    return this.send(adminEmail, `Admin Preview: ${previewName}`, html, 'admin_preview');
  },
  
  async sendEventConfirmation(email: string, name: string, eventTitle: string) {
    const html = getEmailTemplate('Seat Reserved', 'Event Confirmation', `<p>Dr. ${name}, you are registered for <strong>${eventTitle}</strong>.</p>`);
    return this.send(email, `Seat Reserved: ${eventTitle}`, html, 'event_confirmation');
  },

  // --- NURTURE & FOLLOW-UP SEQUENCES ---

  async sendApprovedReminder(email: string, name: string, checkoutUrl: string, daysSinceApproval: number) {
    const urgency = daysSinceApproval >= 5
      ? `<p><strong>Your approval expires soon.</strong> If you don't enroll in the next 48 hours, your seat will be released to the waitlist.</p>`
      : `<p>Your seat is still reserved — but cohort spots are filling up.</p>`;
    const action = `<a href="${checkoutUrl}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Complete Enrollment</a>`;
    const html = getEmailTemplate(
      `Your Seat Is Waiting, Dr. ${name}`,
      'Enrollment Reminder',
      `<p>You were approved for the NeuroChiro Mastermind, but we haven't received your enrollment yet.</p>${urgency}`,
      action
    );
    return this.send(email, `Reminder: Complete Your Mastermind Enrollment`, html, 'approved_reminder');
  },

  async sendPendingAppFollowUp(email: string, name: string, hoursWaiting: number) {
    const message = hoursWaiting >= 48
      ? `<p>Dr. ${name}, your application is in final review. We'll have a decision for you shortly.</p>`
      : `<p>Dr. ${name}, we're reviewing your application now. Dr. Nichols personally reviews every submission, so please allow up to 48 hours.</p><p>In the meantime, you can check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/curriculum" style="color: #E67E22;">curriculum overview</a> to see what's inside the program.</p>`;
    const html = getEmailTemplate('Application Status Update', 'Admissions', message);
    return this.send(email, 'Your Application Is Being Reviewed', html, 'pending_followup');
  },

  async sendWeeklyDrip(email: string, name: string, weekNumber: number, moduleLink: string) {
    const weekMessages: Record<number, string> = {
      1: "Your first module is live! Start with the Identity Worksheet — it takes about 15 minutes and sets the foundation for everything else.",
      2: "Week 2 is about patient communication. Practice the Day 1 script from the Playbook this week, and don't forget to submit your KPIs.",
      3: "This week's focus is the communication framework. Try using it on your next 3 patient conversations and see what changes.",
      4: "Week 4: care plan presentations. Record yourself presenting a care plan this week — even just to your phone. You'll be surprised what you notice.",
      5: "You're halfway through! Submit your KPIs and compare to Week 1. The numbers tell the story.",
      6: "Week 6 is about leadership and team dynamics. If you have staff, audit how your team handles patient interactions this week.",
      7: "Almost there. This week, prepare for the live immersion call. Bring your biggest question or challenge.",
      8: "Final week! Complete your last module and review your 8-week progress. You've come a long way.",
    };
    const message = weekMessages[weekNumber] || "A new week of content is available in your portal.";
    const action = `<a href="${moduleLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Open This Week's Module</a>`;
    const html = getEmailTemplate(
      `Week ${weekNumber} Is Live`,
      `Program Update`,
      `<p>Dr. ${name}, ${message}</p>`,
      action
    );
    return this.send(email, `Week ${weekNumber} — Your Next Steps`, html, `weekly_drip_w${weekNumber}`);
  },

  async sendProBookingReminder(email: string, name: string) {
    const bookingLink = "https://calendly.com/neurochiro-pro/1-on-1";
    const action = `<a href="${bookingLink}" style="background-color: #E67E22; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px;">Book Your 1:1 Call</a>`;
    const html = getEmailTemplate(
      'Your Private Call Is Waiting',
      'Pro Benefit Reminder',
      `<p>Dr. ${name}, you have a private 1:1 session included with your Pro membership, but you haven't booked it yet.</p><p>These calls are where the biggest breakthroughs happen. Book yours today — it takes 30 seconds.</p>`,
      action
    );
    return this.send(email, 'Reminder: Book Your Private 1:1 Call', html, 'pro_booking_reminder');
  },

  async sendPaymentFollowUp(email: string, name: string, updateUrl: string, daysSinceFailure: number) {
    const urgency = daysSinceFailure >= 7
      ? `<p><strong>Your portal access may be interrupted soon.</strong> Please update your payment method to continue the program.</p>`
      : `<p>We tried to process your payment but it didn't go through. This happens sometimes — just update your payment method and you're all set.</p>`;
    const action = `<a href="${updateUrl}" style="background-color: #E67E22; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px;">Update Payment Method</a>`;
    const html = getEmailTemplate(
      'Payment Update Needed',
      'Billing Reminder',
      `<p>Dr. ${name},</p>${urgency}`,
      action
    );
    return this.send(email, 'Reminder: Update Your Payment Method', html, 'payment_followup');
  },
};
