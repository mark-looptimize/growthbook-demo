// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwkeEZXWPnI3rfz3YnxonQA8u22b1QNFY",
  authDomain: "growthbook-demo-384109.firebaseapp.com",
  projectId: "growthbook-demo-384109",
  storageBucket: "growthbook-demo-384109.appspot.com",
  messagingSenderId: "28913098437",
  appId: "1:28913098437:web:e8c34366cfa1d47a575aac",
  measurementId: "G-1824FFXNRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// eslint-disable-next-line no-console
console.log(`Automatic Data Collection Enabled: ${analytics.app.automaticDataCollectionEnabled}`);