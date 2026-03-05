import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure:false, 
  auth: {
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
  },
});


export const sendEmailWithNodeMailer = async ({to,subject,html})=> {
   try {
      const response = await transporter.sendMail({
      from: `"project camp|" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
     })
     return response
   }
   catch (error) {
    console.log(error)
   }
}

