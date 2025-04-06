
/**
 * Email templates for various email types
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  textBody: string;
  htmlBody: string;
}

/**
 * Template variable format: {{variableName}}
 * These will be replaced with actual values when the email is sent
 */
export interface TemplateVariables {
  [key: string]: string;
}

// Default resume sharing template
export const RESUME_TEMPLATE: EmailTemplate = {
  id: "resume-default",
  name: "Standard Resume",
  subject: "Resume from CRE Recruitment",
  textBody: "You can view the resume at: {{resumeUrl}}",
  htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your Requested Resume</h2>
      <p>Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
      <p><a href="{{resumeUrl}}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Resume</a></p>
      <p>If you have any questions, please contact us.</p>
      <p>Best regards,<br>CRE Recruitment Team</p>
    </div>
  `,
};

// Additional template for confidential resumes
export const CONFIDENTIAL_TEMPLATE: EmailTemplate = {
  id: "confidential-resume",
  name: "Confidential Resume",
  subject: "Confidential Resume from CRE Recruitment",
  textBody: "You can view the confidential resume at: {{resumeUrl}}\n\nPlease note this resume is confidential and should not be shared.",
  htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Confidential Resume</h2>
      <p>Thank you for your interest in our candidate. This resume is being shared on a confidential basis.</p>
      <div style="background-color: #fff4e5; border-left: 4px solid #daa520; padding: 12px; margin: 15px 0;">
        <p style="margin: 0; color: #333;"><strong>Important:</strong> Please do not redistribute this resume without our permission.</p>
      </div>
      <p><a href="{{resumeUrl}}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Confidential Resume</a></p>
      <p>If you have any questions, please contact us.</p>
      <p>Best regards,<br>CRE Recruitment Team</p>
    </div>
  `,
};

// Executive search template
export const EXECUTIVE_TEMPLATE: EmailTemplate = {
  id: "executive-resume",
  name: "Executive Search",
  subject: "Executive Candidate Profile - CRE Recruitment",
  textBody: "You can view the executive candidate profile at: {{resumeUrl}}",
  htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Executive Candidate Profile</h2>
      <p>Thank you for your interest in our executive candidate. This profile is being shared as part of our executive search services.</p>
      <p><a href="{{resumeUrl}}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Executive Profile</a></p>
      <p>Our team is available to discuss this candidate's qualifications in more detail.</p>
      <p>Best regards,<br>CRE Executive Search Team</p>
    </div>
  `,
};

// Collection of all available templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  RESUME_TEMPLATE,
  CONFIDENTIAL_TEMPLATE,
  EXECUTIVE_TEMPLATE
];

/**
 * Get a template by its ID
 */
export const getTemplateById = (id: string): EmailTemplate => {
  const template = EMAIL_TEMPLATES.find(t => t.id === id);
  return template || RESUME_TEMPLATE; // Fall back to default template
};

/**
 * Process a template by replacing variables with actual values
 */
export const processTemplate = (
  template: EmailTemplate, 
  variables: TemplateVariables
): EmailTemplate => {
  let processedSubject = template.subject;
  let processedTextBody = template.textBody;
  let processedHtmlBody = template.htmlBody;
  
  // Replace all variable placeholders with actual values
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    processedSubject = processedSubject.replace(placeholder, value);
    processedTextBody = processedTextBody.replace(placeholder, value);
    processedHtmlBody = processedHtmlBody.replace(placeholder, value);
  });
  
  return {
    ...template,
    subject: processedSubject,
    textBody: processedTextBody,
    htmlBody: processedHtmlBody
  };
};
