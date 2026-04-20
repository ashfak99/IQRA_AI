import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transport = nodemailer.createTransport(
    {
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : process.env.EmailId,
            pass : process.env.EmailPass
        }
    }
)

const sendEmail = async(options)=>{
    const info = await transport.sendMail(
        {
            from : `IQRA AI  <${process.env.EmailId}>`,
            to : options.email,
            subject : options.subject,
            text : options.message
        }
      )

      console.log(`Mail send Successfully to ${options.email}`)
    }

const welcomeEMail = async (useremail)=>{
    await transport.sendMail({
        from : `IQRA AI<${process.env.EmailId}>`,
        to : useremail,
        subject : `Welcome Mail`,
        text : `Hi,\n\nWelcome to our service! We are excited to have you on board.\n\nBest regards,\nThe IQRA AI Team`
})
}
export {sendEmail,
    welcomeEMail
};