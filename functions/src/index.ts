// Import/require dependencies
import * as functions from "firebase-functions";
const express = require('express');
import { StatusCodes} from "http-status-codes";
import { graphqlHTTP } from 'express-graphql';
import Schema from './db/schema/schema';
// import Schema from './db/schema/index';
import userController from './controllers/userController';
import mailController from "./controllers/mailController";
const CORS = require("cors");

// Initialize express app
const app = express();

// Set cross origin access
app.use(CORS({ origin: true }));


// Set authentication endpoints
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/forgotpassword', userController.forgotPassword);
app.post('/resetpassword', userController.resetPassword);
app.post('/sendmail', mailController.sendMail);

// Set graphQL endpoint
app.use('/graphql', graphqlHTTP({
schema: Schema,
pretty: true,
graphiql: true,
}));

// Set home/default route
app.get('/', (req: any, res: any) => res
  .status(StatusCodes.OK)
  .send({
    message: 'Welcome to BuildMyHouse'
  }));

// Connect express app to firebase serverless platform
export const bmhAPi = functions.https.onRequest(app);