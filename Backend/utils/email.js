const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const fs = require("fs");
const util = require("util");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Larry Chen <${process.env.SENDGRID_EMAIL_FROM}>`;
  }

  newTransport() {
    //sendgird
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  // async readHTMLTemplate(templateFilePath) {
  //   return await fs.readFile(templateFilePath, function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     return data;
  //   });
  // }
  // async readHTMLTemplate(templateFilePath) {
  //   const readFileAsync = util.promisify(fs.readFile);

  //   try {
  //     const data = await readFileAsync(templateFilePath, "utf8");
  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async readHTMLTemplate(templateFilePath, dynamicContent = {}) {
    const readFileAsync = util.promisify(fs.readFile);

    try {
      let data = await readFileAsync(templateFilePath, "utf8");

      // Replace placeholders in the template with dynamic content
      for (const [placeholder, value] of Object.entries(dynamicContent)) {
        const regex = new RegExp(`{{\\s*${placeholder}\\s*}}`, "g");
        data = data.replace(regex, value);
      }

      return data;
    } catch (err) {
      throw err;
    }
  }

  async send(template, subject, dynamicContent = {}) {
    const templateFilePath = `${__dirname}/../public/emailStyle/${template}.html`;
    const html = await this.readHTMLTemplate(templateFilePath, dynamicContent);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("email", "Welcome to the FlightEase Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      `Your password reset token (valid for 10 minutes)`,
      { resetUrl: this.url, firstName: this.firstName }
    );
  }

  async sendSubscribe() {
    await this.send(
      "subscribe",
      `Thank you for subscribing to our newsletter!`,
      { resetUrl: this.url, firstName: this.firstName }
    );
  }
};
