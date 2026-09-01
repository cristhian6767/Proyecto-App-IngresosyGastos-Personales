import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBne1Bn86PvCD1c_0HrJUkZ_BjxUJ4vVEI",
  authDomain: "gastos-e-ingresos-personales.firebaseapp.com",
  projectId: "gastos-e-ingresos-personales",
  storageBucket: "gastos-e-ingresos-personales.firebasestorage.app",
  messagingSenderId: "829199897105",
  appId: "1:829199897105:web:98f89ca69260dde6bf17b0",
  measurementId: "G-KG6FKM80S7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);