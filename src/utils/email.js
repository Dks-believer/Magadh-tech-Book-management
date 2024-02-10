import nodeMailer from "nodemailer";

class Email {
  constructor(email, subject, message) {
    this.from = process.env.SMPT_MAIL;
    this.password = process.env.SMPT_PASSWORD;
    this.sendTo = email;
    this.subject = subject;
    this.message = message;
  }

//   redirection

  // Email address: mail2dpk.india@gmail.com
  // Password: 
  async sendMail() {
    console.log(
      `Sending mail to ${this.sendTo} with the subject:${this.subject}`
    );

    const transporter = nodeMailer.createTransport({
      host:process.env.SMPT_HOST,
      port:process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICES,
      auth: {
        user: this.from,
        pass: this.password,
      },
    });

    const mailOption = {
      from: this.from,
      to: this.sendTo,
      subject: this.subject,
      text: this.message,
    };

    await transporter.sendMail(mailOption);
  }
}

export default Email;
