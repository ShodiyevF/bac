"use strict";
const nodemailer = require("nodemailer");

async function recoverpass(email, pass) {
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: false,
        auth: {
            user: 'servicecontroluz@gmail.com',
            pass: '5555555as',
        }
    });
    
    let info = await transporter.sendMail({
        from: '"Service Control" <servicecontrol@gmail.com>', 
        to: email,
        subject: "Service Controll new password",
        text: "Hello world?",
        html: `your new password is: <b>${pass}</b><br><b>please remember it</b>`,
    });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
    recoverpass
}