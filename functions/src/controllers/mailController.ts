import { mailer } from '../helpers/mailer';
import {
    StatusCodes,
} from 'http-status-codes';


const mailController = {
    sendMail () {
        async (req: any, res: any) => {
            const { options } = req.body;
            console.log(req.body);

            try {
                const sendMail = await mailer(options);
                console.log(sendMail);
                return res
                .status(StatusCodes.OK)
                .send({
                    data: {
                       response: sendMail
                    }
                });
            }catch(e) {
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    error: e.message
                });
            }
        }
    }
}

export default mailController;