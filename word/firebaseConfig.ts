// Firebase configuration and initialization
import { FirebaseApp, initializeApp } from 'firebase/app';
//import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
//import AsyncStorage from '@react-native-async-storage/async-storage';

// Extend globalThis to include firebaseApp
declare global {
  // eslint-disable-next-line no-var
  var firebaseApp: FirebaseApp | undefined;
}

const firebaseConfig = {
  apiKey: "AIzaSyBCDicGefcJXexElwqAWIjtGpsD7foIEqY",
  authDomain: "quifi-note.firebaseapp.com",
  projectId: "quifi-note",
  storageBucket: "quifi-note.firebasestorage.app",
  messagingSenderId: "1008536426768",
  appId: "1:1008536426768:web:cfaf80602669c8c588ed95",
  measurementId: "G-514FVQGWJX"
};

let app: FirebaseApp;

if (!globalThis.firebaseApp) 
{
  app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  globalThis.firebaseApp = app;

  // initializeAuth(app, {
  //   persistence: getReactNativePersistence(AsyncStorage),
  // });

} 
else 
{
  app = globalThis.firebaseApp;
}

export const firestore = getFirestore(app);
