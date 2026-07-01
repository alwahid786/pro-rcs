export type ContactFormEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const buildContactFormEmailSubject = ({ firstName, lastName }: ContactFormEmailData) => {
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName ? `New Lead — ${fullName}` : "New Contact Form Lead";
};

export const buildContactFormEmailText = (data: ContactFormEmailData) => {
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  return [
    "New contact form submission — PRO RCS",
    "",
    `Name: ${fullName || data.firstName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    "",
    "Message:",
    data.message,
    "",
    "—",
    "Sent from the PRO RCS website contact form.",
  ].join("\n");
};

export const buildContactFormEmailHtml = (data: ContactFormEmailData) => {
  const fullName = `${data.firstName} ${data.lastName}`.trim() || data.firstName;
  const safeName = escapeHtml(fullName);
  const safeFirstName = escapeHtml(data.firstName);
  const safeLastName = escapeHtml(data.lastName || "—");
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Lead</title>
  </head>
  <body style="margin:0;padding:0;background-color:#faf9f7;font-family:Arial,Helvetica,sans-serif;color:#1a1612;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#faf9f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #ece7e1;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1a1612;padding:28px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 8px;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:#eb692c;font-weight:700;">
                        PRO RCS
                      </p>
                      <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">
                        New Contact Lead
                      </h1>
                      <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.72);">
                        A visitor submitted the website contact form.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 16px;font-size:13px;line-height:1.5;color:#555353;">
                  Submitted on ${submittedAt}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #ece7e1;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 18px;border-bottom:1px solid #ece7e1;background-color:#fff8f4;">
                      <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                        Full Name
                      </p>
                      <p style="margin:0;font-size:16px;line-height:1.5;color:#1a1612;font-weight:700;">
                        ${safeName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;border-bottom:1px solid #ece7e1;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td width="50%" valign="top" style="padding-right:8px;">
                            <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                              First Name
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.5;color:#1a1612;">
                              ${safeFirstName}
                            </p>
                          </td>
                          <td width="50%" valign="top" style="padding-left:8px;">
                            <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                              Last Name
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.5;color:#1a1612;">
                              ${safeLastName}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;border-bottom:1px solid #ece7e1;">
                      <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                        Email
                      </p>
                      <p style="margin:0;font-size:15px;line-height:1.5;">
                        <a href="mailto:${safeEmail}" style="color:#eb692c;text-decoration:none;font-weight:600;">
                          ${safeEmail}
                        </a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;">
                      <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                        Phone
                      </p>
                      <p style="margin:0;font-size:15px;line-height:1.5;color:#1a1612;">
                        ${safePhone}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 32px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-left:4px solid #eb692c;background-color:#fff8f4;border-radius:0 12px 12px 0;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 10px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#555353;font-weight:700;">
                        Message
                      </p>
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#1a1612;">
                        ${safeMessage}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:999px;background-color:#eb692c;">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 20px;font-size:14px;line-height:1;font-weight:700;color:#ffffff;text-decoration:none;">
                        Reply to ${safeFirstName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px 24px;border-top:1px solid #ece7e1;background-color:#faf9f7;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#555353;text-align:center;">
                  This email was sent from the PRO RCS website contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
