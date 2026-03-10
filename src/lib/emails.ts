import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const isMock = !resendApiKey || resendApiKey === 're_your_key';
const resend = isMock ? null : new Resend(resendApiKey);

// PRODUCTION SENDER: Verified domain required
const FROM_EMAIL = 'support@neurochirodirectory.com';

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

// 4. Step 8: Onboarding Ready (Mastermind Transition)
  async sendOnboardingReady(email: string, name: string, activationLink?: string) {
    const finalLink = activationLink || `${process.env.NEXT_PUBLIC_SITE_URL}/portal`;
    console.log(`[EMAIL] Attempting 'Premium Transition' email to ${email}`);
    if (isMock) {
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Your NeuroChiro Mastermind Portal Is Ready | Link: ${finalLink}`);
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
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0A192F; border-radius: 24px; overflow: hidden; margin-top: 40px; margin-bottom: 40px;">
            <tr>
              <td align="center" style="padding: 60px 0 40px 0; background: linear-gradient(180deg, #162C4E 0%, #0A192F 100%);">
                <img src="https://neurochiromastermind.com/logo-white.png" alt="NeuroChiro Mastermind" width="220" style="display: block; border: 0;">
              </td>
            </tr>
            <tr>
              <td style="padding: 0 50px 60px 50px;">
                <p style="text-transform: uppercase; letter-spacing: 0.4em; font-size: 11px; font-weight: 900; color: #E67E22; margin-bottom: 20px; text-align: center;">Platform Transition</p>
                <h1 style="font-size: 36px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 32px 0; text-align: center;">Your Mastermind Portal <br/>Is Ready.</h1>
                
                <p style="font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 32px;">
                  Dr. ${name}, we are moving the Mastermind into the new NeuroChiro platform for the <strong>final two weeks</strong> of the program.
                </p>

                <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 40px;">
                  This upgrade gives you immediate, centralized access to the full ecosystem we've built:
                </p>

                <div style="background-color: rgba(255,255,255,0.03); border-radius: 20px; padding: 32px; margin-bottom: 48px; border: 1px solid rgba(255,255,255,0.08);">
                  <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; color: #ffffff; margin: 0 0 20px 0; font-weight: 800;">Inside Your Command Center:</h2>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 15px; color: rgba(255,255,255,0.7);">&bull; Weeks 1–8 Curriculum Unlocked</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 15px; color: rgba(255,255,255,0.7);">&bull; The Script & ROF Vault</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 15px; color: rgba(255,255,255,0.7);">&bull; Clinical Operating Playbooks</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 15px; color: rgba(255,255,255,0.7);">&bull; Practice KPI Tracking Tools</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 15px; color: rgba(255,255,255,0.7);">&bull; Live Call Replay Library</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-bottom: 48px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #E67E22; margin-bottom: 24px; font-weight: 800;">Activation Steps:</h3>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 15px; color: rgba(255,255,255,0.8);">
                    <tr><td style="padding-bottom: 8px;"><strong>Step 1:</strong> Click the activation button below.</td></tr>
                    <tr><td style="padding-bottom: 8px;"><strong>Step 2:</strong> Create your profile.</td></tr>
                    <tr><td style="padding-bottom: 8px;"><strong>Step 3:</strong> Set your secure password.</td></tr>
                    <tr><td style="padding-bottom: 8px;"><strong>Step 4:</strong> Log in and access the portal.</td></tr>
                  </table>
                </div>

                <div align="center" style="margin-bottom: 56px;">
                  <a href="${finalLink}" style="background-color: #E67E22; color: #ffffff; padding: 22px 44px; border-radius: 14px; text-decoration: none; font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; box-shadow: 0 10px 20px rgba(230, 126, 34, 0.2);">
                    Activate Your Mastermind Portal
                  </a>
                </div>

                <p style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.5); font-style: italic; margin-bottom: 48px; text-align: center;">
                  "We're actively refining the platform and your feedback over these final two weeks will help shape the future of the NeuroChiro experience."
                </p>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; color: #ffffff; margin: 0 0 4px 0; font-weight: 800;">Looking forward to finishing strong,</p>
                      <p style="font-size: 18px; color: #E67E22; margin: 0 0 8px 0; font-weight: 900;">Dr. Raymond Nichols</p>
                      <p style="font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">Founder &bull; NeuroChiro</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <p style="font-size: 10px; font-weight: bold; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.2em; text-align: center; margin-bottom: 60px;">
            NeuroChiro Global Mastermind &bull; Precision Clinical Intelligence
          </p>
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
