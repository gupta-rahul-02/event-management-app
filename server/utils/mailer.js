import nodemailer from 'nodemailer'

export const mailHelper = async(option) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    });

    const message ={
        from: 'rahulguptaslg20@gmail.com', // sender address
        to: option.email, // list of receivers
        subject: option.subject, // subject line
        text: option.message, // plain text body
    }

    await transporter.sendMail(message)
}
