import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (opt: Mail.Options): Promise<SMTPTransport.SentMessageInfo> => {
  return new Promise((resolve, reject) => {
    transport.sendMail(opt, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
};

const sendBatchEmail = async (opt: Mail.Options[]): Promise<SMTPTransport.SentMessageInfo[]> => {
  const promises = opt.map((o) => sendEmail(o));
  return Promise.all(promises);
};

export { sendEmail, sendBatchEmail };
