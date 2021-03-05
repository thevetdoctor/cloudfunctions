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
  
const update = async (password: string) => {

        const passwordUpdate = async (password: any) => {
        let response = await auth
                        .currentUser
                        .updatePassword(password)
                        .then((auth: any) => {
                            if (auth) {
                                return { success: true, message: 'Update successful' };
                            }
                        })
                        .catch((error: any) => {
                            return { success: false, message: error.message };
                        });
            return response;
        }

        await auth
            .onAuthStateChanged((authUser: any) => {
                
                if (authUser) {
                    // the user just logged in / the user was logged in
                    console.log('user is signed in as > ', authUser?.email);      
                    passwordUpdate(password);
                } else {
                    // the user is logged out
                    console.log('User is not signed in');
                    return { success: false, message: 'User is not signed in' };
                };
            });
}
    
export { signIn, register, update };