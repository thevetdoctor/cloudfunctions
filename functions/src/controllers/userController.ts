import { forgotPassword, resetPassword, register, signIn } from '../helpers/functions.js';
import {
    StatusCodes,
} from 'http-status-codes';
const cors = require("cors")({ origin : true });

const userController = {

    signup() {
        async (req: any, res: any) => {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Headers", "Content-Type");

            const { email, password } = req.body;
            try {
                const signupResponse = await register(email, password);
                // console.log(req.body, signupResponse);
                if(signupResponse.success) {
                    const { auth: { user: { uid, email, authDomain, createdAt, lastLoginAt } } } = signupResponse;
                    return res
                            .status(StatusCodes.OK)
                            .send({
                                data: {
                                    uid,
                                    email,
                                    authDomain,
                                    createdAt,
                                    lastLoginAt
                                },
                                // auth: signupResponse.auth.user
                            });
                } else {
                    return res
                    .status(StatusCodes.NOT_ACCEPTABLE)
                .send({
                    error: signupResponse.message
                }); 
                }
            } catch(e) {
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    error: e.message
                });
            }
        }
    },

    login() {
        async (req, res) => {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Headers", "Content-Type");
            
            const { email, password } = req.body;
        
            try {
                const loginResponse = await signIn(email, password);
                // console.log(req.body, loginResponse);
                if(loginResponse.success) {
                    const { uid, email, authDomain, createdAt, lastLoginAt } = loginResponse.auth.user;
                    return res
                            .status(StatusCodes.OK)
                            .send({
                                data: {
                                    uid,
                                    email,
                                    authDomain,
                                    createdAt,
                                    lastLoginAt
                                },
                                // auth: loginResponse.auth.user
                            });
                } else {
                    return res
                            .status(StatusCodes.NOT_ACCEPTABLE)
                            .send({
                                error: loginResponse.message
                            }); 
                }
            } catch(e) {
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    error: e.message
                });
            }
        }
    },

    forgotPassword: async (req, res) => {
            const { email } = req.body;
        
            try {
                const forgotPasswordResponse = await forgotPassword(email);
                if(forgotPasswordResponse.success) {
                    // const { uid, email, authDomain, createdAt, lastLoginAt } = loginResponse.auth.u;
                    return res
                            .status(StatusCodes.OK)
                            .send({
                                data: {
                                    response: forgotPasswordResponse
                                },
                            });
                } else {
                    return res
                            .status(StatusCodes.NOT_ACCEPTABLE)
                            .send({
                                error: forgotPasswordResponse.message
                            }); 
                }
            } catch(e) {
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    error: e.message
                });
            }
    },

    resetPassword: async (req, res) => {
            const { code, newPassword } = req.body;
        
            try {
                const resettPasswordResponse = await resetPassword(code, newPassword);
                if(resettPasswordResponse.success) {
                    return res
                            .status(StatusCodes.OK)
                            .send({
                                data: {
                                    response: resettPasswordResponse
                                },
                            });
                } else {
                    return res
                            .status(StatusCodes.NOT_ACCEPTABLE)
                            .send({
                                error: resettPasswordResponse.message
                            }); 
                }
            } catch(e) {
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    error: e.message
                });
            }
        }
}

export default userController;