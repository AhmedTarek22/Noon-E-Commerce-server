export const resetEmailTemplate = (token) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password - Noon-Clone</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f2f2f2;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <img src="https://seeklogo.com/images/N/noon-com-logo-96C05327E1-seeklogo.com.png" alt="Noon Logo" style="display: block; width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #ffe600; text-align: center; color: #333333;">
                <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 16px; color: #333333;">Hello</p>
                <p style="margin: 20px 0 0 0; font-size: 16px; color: #333333;">We received a request to reset your password. Click the button below to reset it:</p>
                <a href="http://localhost:4200/pressreset-password/${token}" target="_blank" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #333333; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p style="margin: 20px 0 0 0; font-size: 14px; color: #666666;">If you did not request a password reset, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #666666;">
                <p style="margin: 0;">If you have any questions, feel free to <a href="mailto:support@noon.com" style="color: #333333;">contact our support team</a>.</p>
                <p style="margin: 20px 0 0 0;">&copy; 2024 Noon-Clone. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>

    `;
};
