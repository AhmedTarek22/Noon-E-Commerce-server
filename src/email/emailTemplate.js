export const template = (userName, token) => {
  let firstName = userName;
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Noon-Clone</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <img src="https://seeklogo.com/images/N/noon-com-logo-96C05327E1-seeklogo.com.png" alt="Noon Logo" style="display: block;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #ffe600; text-align: center; color: #333333;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to Noon-Clone!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 16px; color: #333333;">Hello ${firstName},</p>
                <p style="margin: 20px 0 0 0; font-size: 16px; color: #333333;">Thank you for signing up at Noon. We're excited to have you on board. Start shopping now and enjoy amazing deals and offers!</p>
                <a href="http://localhost:4200/verify/${token}" target="_blank" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #333333; text-decoration: none; border-radius: 5px;">Verify Your Account</a>
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
