import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";
import { resetEmailTemplate } from "./resetEmailTemplate.js";

export default async function sendResetEmail(email) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "tarekahm555@gmail.com",
      pass: "ucrr bmbo hgij yjjg",
    },
  });

  let token = jwt.sign({ email }, "allahAkber");

  const info = await transporter.sendMail({
    from: '"noon-clone website 🛍️" <tarekahm555@gmail.com>',
    to: email, // list of receivers
    subject: "Reset Password-Noon ✔", // Subject line
    text: "Hello world?", // plain text body
    html: resetEmailTemplate(token), // html body
  });

  console.log("Message sent: %s", info.messageId);
}
