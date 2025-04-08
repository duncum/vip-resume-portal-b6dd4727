
/**
 * Email HTML templates
 */

export const createConfidentialTemplate = (resumeUrl: string): string => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #daa520; padding: 15px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Confidential Resume</h2>
    </div>
    <div style="padding: 20px; border: 1px solid #e0e0e0; background-color: #ffffff;">
      <p style="color: #333; font-size: 16px; line-height: 1.5;">This resume is being shared on a confidential basis.</p>
      <div style="background-color: #fff4e5; border-left: 4px solid #daa520; padding: 12px; margin: 15px 0;">
        <p style="margin: 0; color: #333;"><strong>Important:</strong> Please do not redistribute this resume without permission.</p>
      </div>
      <div style="margin-top: 25px; text-align: center;">
        <a href="${resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Confidential Resume</a>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center;">
        <p>This is a confidential document. For any questions, please contact our team.</p>
      </div>
    </div>
  </div>`;
};

export const createStandardTemplate = (resumeUrl: string): string => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #daa520; padding: 15px; text-align: center;">
      <h2 style="color: #fff; margin: 0;">Resume</h2>
    </div>
    <div style="padding: 20px; border: 1px solid #e0e0e0; background-color: #ffffff;">
      <p style="color: #333; font-size: 16px; line-height: 1.5;">Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
      <div style="margin-top: 25px; text-align: center;">
        <a href="${resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Resume</a>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center;">
        <p>For any questions about this resume, please contact our team.</p>
      </div>
    </div>
  </div>`;
};

/**
 * Create email in base64 format for Gmail API
 */
export const createEmail = (options: { to: string; subject: string; html: string }): string => {
  const { to, subject, html } = options;
  
  // Create email headers with generic from address
  const headers = [
    `From: Resume Service <resume-service@example.com>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0'
  ];
  
  // Create email content
  const email = headers.join('\r\n') + '\r\n\r\n' + html;
  
  // Encode as base64
  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};
