import { auth } from '../firebase';

const signIn = async (email: string, password: string) => {
        let response = await auth
            .signInWithEmailAndPassword(email, password)
            .then((auth: any) => {
                // it successfully signed in a registered user with email and password
                if (auth) {
                    return { success: true, auth };
                }
            })
            .catch((error: any) => {
                return { success: false, message: error.message };
            });
            return response;
}

const register = async (email: string, password: string) => {
        let response = await auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth: any) => {
                // it successfully created a new user with email and password
                if (auth) {
                    return { success: true, auth };
                }
            })
            .catch((error: any) => {
                return { success: false, message: error.message };
            });
            return response;
}
    
const forgotPassword = async (email: string) => {

        let response = await auth
                        .sendPasswordResetEmail(email)
                        .then(() => {
                                return { success: true, message: 'Reset Email sent' };
                        })
                        .catch((error: any) => {
                            return { success: false, message: error.message };
                        });
            return response;
}

const resetPassword = async (code: string, newPassword: string) => {

        let response = await auth
                        .confirmPasswordReset(code, newPassword)
                        .then(() => {
                                return { success: true, message: 'Password reset was successful' };
                        })
                        .catch((error: any) => {
                            return { success: false, message: error.message };
                        });
            return response;
}
    
export { signIn, register, forgotPassword, resetPassword };