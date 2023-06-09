const nodemailer = require("nodemailer")

module.exports.transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com", 
    port: 587, 
    secure: false, 
    auth:{
        user:process.env.PERSONAL_GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

// module.exports.mailOption={
//     from:"",
//     to:"",
//     subject:"",
//     text:""
// }