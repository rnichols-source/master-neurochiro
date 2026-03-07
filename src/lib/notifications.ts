export class NotificationService {
  private static WEBHOOK_URL = process.env.ADMIN_NOTIFY_WEBHOOK_URL;

  /**
   * Sends a high-priority alert to the admin when a new application is submitted.
   * Optimized for mobile notifications (Discord/Slack).
   */
  static async sendNewApplicationAlert(app: {
    full_name: string;
    email: string;
    score: number;
    role: string;
    id: string;
  }) {
    if (!this.WEBHOOK_URL) {
      console.warn("⚠️ Notification skipped: ADMIN_NOTIFY_WEBHOOK_URL not set in environment.");
      return;
    }

    const isSlack = this.WEBHOOK_URL.includes("hooks.slack.com");
    const reviewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications`;

    // 1. Prepare Payload for Discord or Slack
    const payload = isSlack ? {
      text: `🚀 *New Admission Application Received*`,
      attachments: [
        {
          color: app.score > 40 ? "#22c55e" : "#d66829",
          fields: [
            { title: "Applicant", value: app.full_name, short: true },
            { title: "Readiness Score", value: `${app.score}/100`, short: true },
            { title: "Current Role", value: app.role, short: false },
            { title: "Review Link", value: `<${reviewUrl}|Open Review Queue>`, short: false }
          ]
        }
      ]
    } : {
      username: "NeuroChiro Intelligence",
      avatar_url: "https://www.neurochiromastermind.com/favicon.ico",
      embeds: [
        {
          title: "🚀 New Admission Application",
          description: `A new doctor has applied for the Mastermind.`,
          color: app.score > 40 ? 2278750 : 14051369, // Green or Orange
          fields: [
            { name: "Name", value: app.full_name, inline: true },
            { name: "Readiness Score", value: `**${app.score}**/100`, inline: true },
            { name: "Role", value: app.role, inline: false },
          ],
          url: reviewUrl,
          footer: { text: "NeuroChiro Mastermind OS • System Alert" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      const response = await fetch(this.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error("❌ Notification Error:", error);
      return { success: false, error };
    }
  }
}
