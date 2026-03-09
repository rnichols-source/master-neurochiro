import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const isMock = !resendApiKey || resendApiKey === 're_your_key';
const resend = isMock ? null : new Resend(resendApiKey);

// SANDBOX RULE: Resend requires 'onboarding@resend.dev' as sender in free tier/sandbox
const FROM_EMAIL = 'onboarding@resend.dev';

export const EmailService = {
  // 1. Application Received
  async sendAppReceived(email: string, name: string) {
    console.log(`[EMAIL] Attempting 'Received' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Cohort II Application Received`);
      return { data: { id: "mock_id" }, error: null };
    }
    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Cohort II Application Received',
        html: `<p>Dr. ${name}, we have received your practice data. Review takes 24-48h.</p>`
      });
      console.log(`[EMAIL] Resend Result:`, result);
      return result;
    } catch (err) {
      console.error(`[EMAIL] Resend Error:`, err);
      throw err;
    }
  },

  // 2. Application Approved (With Payment Link)
  async sendAppApproved(email: string, name: string, checkoutUrl: string) {
    console.log(`[EMAIL] Attempting 'Approved' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Admission Decision: Approved | URL: ${checkoutUrl}`);
      return { data: { id: "mock_id" }, error: null };
    }
    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Admission Decision: Approved',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1A232E;">
            <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 24px;">Congratulations, Dr. ${name}.</h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              You have been selected for Cohort II of the NeuroChiro Mastermind. 
              After reviewing your practice data, we believe you are a strong fit for this reconstruction.
            </p>
            
            <div style="margin-bottom: 40px;">
              <a href="${checkoutUrl}" target="_blank" style="background-color: #E67E22; color: #ffffff; padding: 18px 36px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block; border: 1px solid #E67E22;">
                Complete Your Enrollment
              </a>
            </div>

            <p style="font-size: 12px; color: #6B7280; line-height: 1.4;">
              If the button above does not work, copy and paste this link into your browser: <br/>
              <a href="${checkoutUrl}" target="_blank" style="color: #E67E22; text-decoration: underline;">${checkoutUrl}</a>
            </p>

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 40px 0;" />
            <p style="font-size: 10px; font-weight: bold; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em;">
              NeuroChiro Global Mastermind &bull; Secure Enrollment
            </p>
          </div>
        `
      });
      console.log(`[EMAIL] Resend Result:`, result);
      return result;
    } catch (err) {
      console.error(`[EMAIL] Resend Error:`, err);
      throw err;
    }
  },

  // 3. Welcome / Onboarding
  async sendWelcome(email: string, name: string) {
    console.log(`[EMAIL] Attempting 'Welcome' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Welcome to the OS: Installation Day 1`);
      return { data: { id: "mock_id" }, error: null };
    }
    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to the OS: Installation Day 1',
        html: `<p>Dr. ${name}, your portal access is now active. Log in to start Week 1.</p>`
      });
      console.log(`[EMAIL] Resend Result:`, result);
      return result;
    } catch (err) {
      console.error(`[EMAIL] Resend Error:`, err);
      throw err;
    }
  },

// 4. Step 8: Onboarding Ready
  async sendOnboardingReady(email: string, name: string, activationLink: string) {
    console.log(`[EMAIL] Attempting 'Premium Onboarding' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Your NeuroChiro Mastermind Portal Is Ready | Link: ${activationLink}`);
      return { data: { id: "mock_id" }, error: null };
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your NeuroChiro Mastermind Portal Is Ready</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0A192F; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0A192F;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo-white.png" alt="NeuroChiro Mastermind" width="180" style="display: block; border: 0;">
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px;">
                <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; font-weight: 900; color: #E67E22; margin-bottom: 16px;">System Upgrade</p>
                <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 24px 0;">Your Mastermind Portal <br/>Is Ready.</h1>
                
                <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 32px;">
                  Dr. ${name}, we have upgraded the NeuroChiro Mastermind platform. 
                  Everything is now integrated into a single high-performance Command Center.
                </p>

                <div style="background-color: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; margin-bottom: 40px; border: 1px solid rgba(255,255,255,0.1);">
                  <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #ffffff; margin: 0 0 16px 0;">Inside Your New Portal:</h2>
                  <ul style="padding: 0; margin: 0; list-style: none; color: rgba(255,255,255,0.6); font-size: 14px;">
                    <li style="margin-bottom: 10px;">&bull; Complete 8-Week Curriculum</li>
                    <li style="margin-bottom: 10px;">&bull; Proprietary Implementation Resources</li>
                    <li style="margin-bottom: 10px;">&bull; Practice KPI Tracker</li>
                    <li style="margin-bottom: 10px;">&bull; Live Call Replay Library</li>
                    <li style="margin-bottom: 10px;">&bull; Direct Coaching Access</li>
                  </ul>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 32px;">
                  Your access is already included as an active Mastermind member. 
                  Please activate your new profile to begin.
                </p>

                <div align="center" style="margin-bottom: 48px;">
                  <a href="${activationLink}" style="background-color: #E67E22; color: #ffffff; padding: 20px 40px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">
                    Activate Your Profile
                  </a>
                </div>

                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 48px 0;" />
                
                <p style="font-size: 11px; font-weight: bold; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.2em; text-align: center; margin-bottom: 40px;">
                  NeuroChiro Mastermind &bull; Precision Clinical Intelligence
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your NeuroChiro Mastermind Portal Is Ready',
        html: html
      });
      return result;
    } catch (err) {
      console.error(`[EMAIL] Resend Error:`, err);
      throw err;
    }
  },

  async sendAdminPreview(adminEmail: string, previewName: string, previewLink: string) {
    console.log(`[EMAIL] Sending Admin Preview to ${adminEmail}`);
    return this.sendOnboardingReady(adminEmail, `ADMIN (${previewName})`, previewLink);
  },

  // 5. Step 9: Password Creation Flow
  async sendPasswordReset(email: string, resetLink: string) {
    console.log(`[EMAIL] Attempting 'Password Reset' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Set Your Password | Link: ${resetLink}`);
      return { data: { id: "mock_id" }, error: null };
    }
    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Set Your Password',
        html: `
          <p>You have been invited to the NeuroChiro Mastermind Command Center.</p>
          <p>Please use the link below to set your secure password. This link expires in 24 hours.</p>
          <a href="${resetLink}">Set Your Password</a>
        `
      });
      return result;
    } catch (err) {
      throw err;
    }
  },
  // 4. Event Confirmation
  async sendEventConfirmation(email: string, name: string, eventTitle: string) {
    console.log(`[EMAIL] Attempting 'Event Confirmation' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Seat Reserved: ${eventTitle}`);
      return { data: { id: "mock_id" }, error: null };
    }
    try {
      const result = await resend!.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Seat Reserved: ${eventTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1A232E;">
            <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 24px;">Your Seat is Secured, Dr. ${name}.</h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              You are officially registered for <strong>${eventTitle}</strong>. 
              This is a high-intensity immersion event. Prepare for two days of complete practice reconstruction.
            </p>
            
            <div style="background-color: #F8FAFC; border: 1px solid #E5E7EB; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748B; margin-bottom: 16px;">Event Details</h2>
              <p style="margin: 4px 0;"><strong>Location:</strong> Adelaide, Australia</p>
              <p style="margin: 4px 0;"><strong>Dates:</strong> May 29 – May 30, 2026</p>
              <p style="margin: 4px 0;"><strong>Time:</strong> 9:00 AM – 5:00 PM Daily</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              Specific venue information and a pre-event preparation guide will be sent to this email address in the coming weeks.
            </p>

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 40px 0;" />
            <p style="font-size: 10px; font-weight: bold; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em;">
              NeuroChiro Live &bull; Intensive Immersion
            </p>
          </div>
        `
      });
      return result;
    } catch (err) {
      console.error(`[EMAIL] Resend Error:`, err);
      throw err;
    }
  }
};
