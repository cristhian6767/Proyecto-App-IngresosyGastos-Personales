// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBne1Bn86PvCD1c_0HrJUkZ_BjxUJ4vVEI",
  authDomain: "gastos-e-ingresos-personales.firebaseapp.com",
  projectId: "gastos-e-ingresos-personales",
  storageBucket: "gastos-e-ingresos-personales.firebasestorage.app",
  messagingSenderId: "829199897105",
  appId: "1:829199897105:web:98f89ca69260dde6bf17b0",
  measurementId: "G-KG6FKM80S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
