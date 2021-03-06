import * as functions from "firebase-functions";
const express = require('express');
import { StatusCodes} from "http-status-codes";
// import router from './routes/index';
import { graphqlHTTP } from 'express-graphql';
import Schema from './db/schema';
import { auth } from './firebase';
import userController from './controllers/userController';
const CORS = require("cors");

const app = express();

// app.use('/auth/', router);
app.use(CORS({ origin: true }));


app.post('/signup', userController.signup);

app.post('/login', userController.login);

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