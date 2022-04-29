// "use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "harmanjaggs@gmail.com", // generated ethereal user
      pass: "sxyzhknxkwrspbpn", // generated ethereal password
    },
  });
    
    var Osubject, Ohtml;
    if (str == "signup") {
        Osubject = "Thank you for signing ${data.name}";
        Ohtml = '<h1>Welcome to foodApp.com</h1>\
            Hope you have a good time!\
            Here are your details-\
            Name - '+ data.name + '\
            Email -' + data.email
    } else if (str == "resetpassword") {
        Osubject = "Reset Password";
        Ohtml = '<h1>foodAp.com</h1>\
            Hope you have a good time!\
            Here are your details-\
            Name - '+ data.name + '\
            Email - '+ data.email
    }

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <harmanjaggs@gmail.com>', // sender address
    to: data.email,
    subject: Osubject,

    html: Ohtml
  });
  console.log("Message sent %s", info.messageId);
}