export class NotificationService {
  private static WEBHOOK_URL = process.env.ADMIN_NOTIFY_WEBHOOK_URL;

  static async sendNewApplicationAlert(app: {
    full_name: string;
    email: string;
    score: number;
    role: string;
    id: string;
    type?: 'Mastermind' | 'Private Coaching';
  }) {
    if (!this.WEBHOOK_URL) return;
    const isSlack = this.WEBHOOK_URL.includes("hooks.slack.com");
    const reviewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications`;
    const appType = app.type || 'Mastermind';

    const payload = isSlack ? {
      text: `🚀 *New ${appType} Application Received*`,
      attachments: [{
        color: app.score > 40 ? "#22c55e" : "#d66829",
        fields: [
          { title: "Applicant", value: app.full_name, short: true },
          { title: "Readiness Score", value: `${app.score}/100`, short: true },
          { title: "Current Role", value: app.role, short: false },
          { title: "Review Link", value: `<${reviewUrl}|Open Review Queue>`, short: false }
        ]
      }]
    } : {
      username: "NeuroChiro Intelligence",
      avatar_url: "https://www.neurochiromastermind.com/favicon.ico",
      embeds: [{
        title: `🚀 New ${appType} Application`,
        description: `A new clinic diagnostic has been submitted for ${appType}.`,
        color: app.score > 40 ? 2278750 : 14051369,
        fields: [
          { name: "Name", value: app.full_name, inline: true },
          { name: "Readiness Score", value: `**${app.score}**/100`, inline: true },
          { name: "Role", value: app.role, inline: false },
        ],
        url: reviewUrl,
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(this.WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      return { success: true };
    } catch (error) {
      console.error("❌ Notification Error:", error);
      return { success: false, error };
    }
  }

  static async sendAdminAlert(message: string, alertLevel: 'info' | 'warning' | 'critical' = 'info') {
    if (!this.WEBHOOK_URL) return;
    
    let color = 3447003; // blue
    let icon = "ℹ️";
    if (alertLevel === 'warning') { color = 16753920; icon = "⚠️"; }
    if (alertLevel === 'critical') { color = 15158332; icon = "🚨"; }

    const payload = {
      username: "NeuroChiro System Monitor",
      embeds: [{
        title: `${icon} System Alert`,
        description: message,
        color: color,
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(this.WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}
