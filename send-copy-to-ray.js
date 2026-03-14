const { Resend } = require('resend');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

const FROM_EMAIL = 'support@neurochirodirectory.com';
const TARGET_EMAIL = 'drray@neurochirodirectory.com';
const TARGET_NAME = 'Dr. Misty Senz'; // Keeping her name in the copy for context

const BRAND_STYLE = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 40px 20px; 
  color: #ffffff;
  background-color: #0A192F;
  border-radius: 12px;
`;

function getDualTierTemplate(name) {
  const standardPIF = "https://buy.stripe.com/5kQdRb8Z1eEscGOfas7wA0f";
  const proPIF = "https://buy.stripe.com/3cIeVfa351RG6iqaUc7wA0h";
  
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; background-color: #050E1D;">
        <div style="${BRAND_STYLE}">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">[COPY] Admission Decision: Approved</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Congratulations, ${name}.</h1>
          <div style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 40px;">
            <p>You have been selected for the NeuroChiro Mastermind. After reviewing your practice data and your 29 years of experience, we believe your commitment to keeping the "true chiropractic flame alive" makes you a vital addition to Cohort II.</p>
            <p>Since you indicated you were undecided on the tier, we have provided secure enrollment links for both the Standard and Pro levels below. Please select the path that aligns with your current leadership goals:</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #E67E22; margin-bottom: 10px;">Option 1: Mastermind Standard ($997)</h3>
            <p style="font-size: 14px; margin-bottom: 15px;">Full access to the 8-week Clinical OS curriculum and weekly group calls.</p>
            <a href="${standardPIF}" style="background-color: #E67E22; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Enroll in Standard</a>
          </div>

          <div style="margin-bottom: 40px; padding: 20px; border: 1px solid rgba(230, 126, 34, 0.3); border-radius: 12px; background-color: rgba(230, 126, 34, 0.05);">
            <h3 style="color: #E67E22; margin-bottom: 10px;">Option 2: Mastermind Pro ($1,997 — Elite Access)</h3>
            <p style="font-size: 14px; margin-bottom: 15px;">Includes private 1:1 roadmap sessions with Dr. Nichols, direct practice audits, and priority hot-seat access.</p>
            <a href="${proPIF}" style="background-color: #ffffff; color: #0A192F; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Enroll in Pro Elite</a>
          </div>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
            NeuroChiro Global Mastermind &bull; Precision Clinical Intelligence
          </p>
        </div>
      </body>
    </html>
  `;
}

async function sendCopy() {
  console.log(`📤 Sending copy of Misty's approval to Dr. Nichols...`);
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TARGET_EMAIL,
      subject: 'COPY: Approval Email for Dr. Misty Senz',
      html: getDualTierTemplate(TARGET_NAME),
    });
    console.log("✅ Copy sent.");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

sendCopy();
