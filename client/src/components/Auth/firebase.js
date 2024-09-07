import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC9Xnu4M_aN37ukBiH31zwuP1T2yRUWEY8",
  authDomain: "voicenews-be5c4.firebaseapp.com",
  projectId: "voicenews-be5c4",
  storageBucket: "voicenews-be5c4.appspot.com",
  messagingSenderId: "1038988043909",
  appId: "1:1038988043909:web:2883574a4c9ed8a8abebec",
  measurementId: "G-J4TNFM6KTR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;