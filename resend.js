import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async ({email,subject,html})=> {
   try {
    const response = await resend.emails.send({
        from: "Project Camp <onboarding@resend.dev>",
        to:email,
        subject:subject,
        html
    })
    
    return response
   } catch (error) {
     console.log(error,"error sendind email");
     throw error
   }
}

export {sendMail}