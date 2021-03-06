import * as functions from "firebase-functions";
const express = require('express');
import { StatusCodes} from "http-status-codes";
// import router from './routes/index';
import { graphqlHTTP } from 'express-graphql';
import Schema from './db/schema';
import { auth } from './firebase';
import userController from './controllers/userController';
const CORS = require("cors");


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
};

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

const app = express();

// app.use('/auth/', router);
app.use(CORS({ origin: true }));


app.post('/signup', async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
      const signupResponse = await register(email, password);
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
});

app.post('/login', async(req: any, res: any) => {
  const { email, password } = req.body;

    try {
        const loginResponse = await signIn(email, password);
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
  });

app.post('/forgotpassword', userController.forgotPassword);

app.post('/resetpassword', userController.resetPassword);

app.use('/graphql', graphqlHTTP({
schema: Schema,
pretty: true,
graphiql: true,
}));

app.get('/', (req: any, res: any) => res
  .status(StatusCodes.OK)
  .send({
    message: 'Welcome to BuildMyHouse',
    data: {},
  }));

export const bmhAPi = functions.https.onRequest(app);