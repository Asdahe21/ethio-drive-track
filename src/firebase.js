import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getDatabase} from 'firebase/database';  

const firebaseConfig = {
  apiKey: "AIzaSyD8kfrwrlLzU_DbxEU9JYNWAv6kDf7tcEY",
  authDomain: "ethio-drive-track-d3168.firebaseapp.com",
  projectId: "ethio-drive-track-d3168",
  storageBucket: "ethio-drive-track-d3168.firebasestorage.app",
  messagingSenderId: "989302353465",
  appId: "1:989302353465:web:2ef2c494cc6f753df0a7e8",
  measurementId: "G-LRZ2YQJ85J",
  databaseURL:"https://ethio-drive-track-d3168-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);