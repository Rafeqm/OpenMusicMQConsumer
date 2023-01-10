import {
  createTransport,
  SendMailOptions,
  Transporter,
  TransportOptions,
} from "nodemailer";

export default class MailSender {
  private readonly _transporter: Transporter;

  constructor() {
    this._transporter = createTransport(<TransportOptions>{
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail: string, itemName: string, content: string) {
    const mail: SendMailOptions = {
      from: process.env.MAIL_SENDER,
      to: targetEmail,
      subject: `Requested ${itemName.charAt(0).toUpperCase()}${itemName.slice(
        1
      )} Data`,
      html: `This is a copy of your requested <strong>${itemName}</strong> data.`,
      attachments: [
        {
          filename: `${itemName}.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(mail);
  }
}
