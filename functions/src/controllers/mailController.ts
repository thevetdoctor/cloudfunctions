const nodemailer = require("nodemailer");
import mailerCredentials from "../mailerCredentials";
import { StatusCodes } from "http-status-codes";

const mailController = {
  sendMail: async (req: any, res: any) => {
      const options = req.body;
      const bmhMailer = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        host: "smtp.gmail.com",
        auth: {...mailerCredentials}
        
      });
      const mailOptions = {
        from: "<info@buildmyhouse.com>",
        to: options.receiver,
        subject: options.subject,
        text: options.text,
        html: `${options.html}`,
      };
      await bmhMailer.sendMail(mailOptions, (error, info) => {
        if (error) {
          return {
            message: "Error found",
          };
        }
        return res.status(StatusCodes.OK).send({
          message: `Mail sent to ${options.receiver}`
        });
      });
  },
};

export default mailController;
