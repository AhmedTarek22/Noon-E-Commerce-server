import { createTransport } from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export default async function sendEmail(email, userName) {
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
    subject: "verify account ✔", // Subject line
    text: "Hello world?", // plain text body
    html: template(userName, token), // html body
  });

  console.log("Message sent: %s", info.messageId);
}
