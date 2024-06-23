// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBO43XnrlYSFQ9EE4N3241La17fBqDoIJw',
  authDomain: 'moment-capsule.firebaseapp.com',
  projectId: 'moment-capsule',
  storageBucket: 'moment-capsule.appspot.com',
  messagingSenderId: '221664750667',
  appId: '1:221664750667:web:8396b78bea161f46b371ce',
  measurementId: 'G-7M43DELKJX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
