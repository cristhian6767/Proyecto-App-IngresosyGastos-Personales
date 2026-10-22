import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBne1Bn86PvCD1c_0HrJUkZ_BjxUJ4vVEI",
  authDomain: "gastos-e-ingresos-personales.firebaseapp.com",
  projectId: "mi-gestor-gastos",
  storageBucket: "gastos-e-ingresos-personales.firebasestorage.app",
  messagingSenderId: "829199897105",
  appId: "1:829199897105:web:98f89ca69260dde6bf17b0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
