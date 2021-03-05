import firebase from 'firebase';
import * as functions from "firebase-functions";
// import { config } from 'dotenv';
require("dotenv").config();

// config();

// const {
//   APP_API_KEY,
//   APP_AUTH_DOMAIN,
//   APP_DATABASE_URL,
//   APP_PROJECT_ID,
//   APP_STORAGE_BUCKET, APP_MESSAGING_SENDER_ID,
//   APP_ID,
//   APP_MEASUREMENT_ID,
// } = process.env;

// const {
//   apiKey,
//   authDomain,
//   databaseURL,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId: any,
// } = JSON.parse(process.env.FIREBASE_CONFIG);

const firebaseConfig = {
  apiKey: "AIzaSyAys4Gc-dGXZmLn_zvNPMie_7d6oZicCuQ",
  authDomain: "build-myhouse.firebaseapp.com",
  databaseURL: "",
  projectId: "build-myhouse",
  storageBucket: "build-myhouse.appspot.com",
  messagingSenderId: "213894694941",
  appId: "1:1:213894694941:web:2969dcd47d9b8e6e851ef4",
  measurementId: "G-GCF6BNXJ2K",
};
// const firebaseConfig = {
//   apiKey: APP_API_KEY,
//   authDomain: APP_AUTH_DOMAIN,
//   databaseURL: APP_DATABASE_URL,
//   projectId: APP_PROJECT_ID,
//   storageBucket: APP_STORAGE_BUCKET,
//   messagingSenderId: APP_MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: APP_MEASUREMENT_ID,
// };

console.log(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth: any = firebase.auth();

export { auth };
