import nodemailer from 'nodemailer'

interface EmailInterface {
   to: string,
   from: string,
   subject: string,
   html: string
}

async function sendMail (send: EmailInterface) {

  const port = process.env.SMTP_PORT

  const transporter = nodemailer.createTransport(
    {
      host: process.env.SMTP,
      port: Number(port),
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    }
  )

  await transporter.sendMail(
    {
      from: send.from,
      to: send.to,
      subject: send.subject,
      html: send.html
    }
  )

}

export { sendMail }
