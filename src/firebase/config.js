import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBne1Bn86PvCD1c_0HrJUkZ_BjxUJ4vVEI",
  authDomain: "gastos-e-ingresos-personales.firebaseapp.com",
  projectId: "gastos-e-ingresos-personales",
  storageBucket: "gastos-e-ingresos-personales.firebasestorage.app",
  messagingSenderId: "829199897105",
  appId: "1:829199897105:web:98f89ca69260dde6bf17b0"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore para usarla en los servicios
export const db = getFirestore(app);
