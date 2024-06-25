import { credential } from "firebase-admin"; // credential is usually used for authentication
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

// intialising the app

initializeApp({credential: credential.applicationDefault()});

// creating an instance of firestore
const firestore = new Firestore();

// Note: This requires setting an env variable in Cloud Run
/** if (process.env.NODE_ENV !== 'production') {
  firestore.settings({
      host: "localhost:8080", // Default port for Firestore emulator
      ssl: false
  });
} */


// defining where the videos would be stored 
const videoCollectionId = 'videos';

// creating a  video interface to define the structure of objects
export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string
}

// retrives video 
async function getVideo(videoId: string) {
  const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
  return (snapshot.data() as Video) ?? {};
}
// updates video
export function setVideo(videoId: string, video: Video) {
  return firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video, { merge: true })
}

// checks if the video is undefined or not

export async function isVideoNew(videoId: string) {
  const video = await getVideo(videoId);
  return video?.status === undefined;
}
