/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {initializeApp} from "firebase-admin/app";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import {Firestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();

const firestore = new Firestore();// Firestore object
const storage = new Storage();

const rawVideoBucketName = "renewtube-raw-videos";

export const createUser = functions.auth.user().onCreate((user) => {
  // 1st gen cloud function
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
  return;
});

// Need authentication users for this to run
export const generateUploadUrl = onCall({maxInstances: 1}, async (request) => {
  // Generally supposed to have a lower number of instances
  // Checking if the user is authenticated
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function can only be called while the user is authenticated"
    );
  }
  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);
  // Generating a unique file name
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;
  // Get a v4 signed URL for uploading file, sourced from the documentation
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  return {url, fileName};
});
