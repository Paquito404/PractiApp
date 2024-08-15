import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth } from 'firebase/auth'
// import {...} from "firebase/auth";

// Optionally import the services that you want to use

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDa-gc3VqqzxGkFdizKxh84vF-0zPRTrGQ",
  authDomain: "practicas-unison.firebaseapp.com",
  projectId: "practicas-unison",
  storageBucket: "practicas-unison.appspot.com",
  messagingSenderId: "353731455312",
  appId: "1:353731455312:web:85596ce59dc5019ddb6455",
  measurementId: "G-K8ZBV0TBZ7",
  storageBucket: "gs://practicas-unison.appspot.com",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
