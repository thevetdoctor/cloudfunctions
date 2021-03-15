// const nodemailer = require("nodemailer");
// // const smtpTransport = require("nodemailer-smtp-transport");
// const mailerCredentials = require('./mailerCredentials');

// const mailer = async (options) => {
//   console.log(options);
//   const bmhMailer = nodemailer
//                             .createTransport({
//                                                     service: "gmail",
//                                                     secure: true,
//                                                     port: 465,
//                                                     host: "smtp.gmail.com",
//                                                     auth: mailerCredentials
//                                                 });
//   // const bmhMailer = nodemailer.createTransport('smtps://consultoba@gmail.com:bafotfarms@smtp.gmail.com');
//   const mailOptions = {
//                     from: "<info@buildmyhouse.com>",
//                     to: options.receiver,
//                     subject: options.subject,
//                     text: options.text,
//                     html: options.output
//                 };

//   await bmhMailer.sendMail(mailOptions, (error, info) => {
//     console.log(mailOptions, info);
//     if (error) {
//         console.log(error);
//       // throw error;
//       return {
//         message: 'Error found'
//       }
//     }
//     return "Mail sent";
//   });
// };

// export { mailer };