// Import/require dependencies
import * as functions from "firebase-functions";
const express = require("express");
import { StatusCodes } from "http-status-codes";
import { graphqlHTTP } from "express-graphql";
import Schema from "./db/schema/schema";
import mailController from "./controllers/mailController";
import { errorType } from "./helpers/constants";
const CORS = require("cors");

// Initialize express app
const app = express();

// Set cross origin access
app.use(CORS({ origin: true }));

// Set authentication endpoints

const middleware = (req, res, next) => {
  console.log('user agent:', req.headers['user-agent']);
  next();
}
app.use(middleware);

app.post("/sendmail", mailController.sendMail);

const getError = errorName => {
  return errorType[errorName]
}

// Set graphQL endpoint
app.use(
  "/graphql", (req, res) => {
  graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: {
      headerEditorEnabled: true
    },
    customFormatErrorFn: (err: any) => {
      console.log('err:', err.message);
      if(err.message.search('required') >= 0){
        const error = getError('REQUIRED');
        return { message: error.message, statusCode: error.statusCode }
      } else {
      const error = getError(err.message);
      return { message: error.message, statusCode: error.statusCode }
      }
    }
  })(req, res)
  });

// Set home/default route
app.get("/", (req: any, res: any) =>
  res.status(StatusCodes.OK).send({
    message: "Welcome to BuildMyHouse",
    data: {},
  })
);

// Connect express app to firebase serverless platform
export const bmhAPi = functions.https.onRequest(app);
