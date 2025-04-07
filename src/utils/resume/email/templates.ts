
/**
 * Email HTML templates
 */

export const createConfidentialTemplate = (resumeUrl: string): string => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">Confidential Resume</h2>
    <p>This resume is being shared on a confidential basis.</p>
    <div style="background-color: #fff4e5; border-left: 4px solid #daa520; padding: 12px; margin: 15px 0;">
      <p style="margin: 0; color: #333;"><strong>Important:</strong> Please do not redistribute this resume without permission.</p>
    </div>
    <p><a href="${resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Confidential Resume</a></p>
  </div>`;
};

export const createStandardTemplate = (resumeUrl: string): string => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">Resume from CRE Recruitment</h2>
    <p>Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
    <p><a href="${resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Resume</a></p>
  </div>`;
};

/**
 * Create email in base64 format for Gmail API
 */
export const createEmail = (options: { to: string; subject: string; html: string }): string => {
  const { to, subject, html } = options;
  
  // Create email headers
  const headers = [
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
