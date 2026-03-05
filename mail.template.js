import Mailgen from "mailgen";


const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'project camp',
        link: 'https://google.com'
    }
});


export const userVerificationMailTemplate = (username,verificationLink) => {
     const email = {
      body: {
        name: username,
        intro: 'Welcome to project camp! We\'re very excited to have you on board.',
        action: {
            instructions: 'To verify your email, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: verificationLink
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

   const html =  mailGenerator.generate(email)
   const text = mailGenerator.generatePlaintext(email);

   return {html,text}
}