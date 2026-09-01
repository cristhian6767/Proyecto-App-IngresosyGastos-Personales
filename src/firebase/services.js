import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./config";

const COLECCION = "transactions";

// 1. Guardar un nuevo ingreso o gasto
export const addTransaction = async (userId, transaction) => {
  return await addDoc(collection(db, COLECCION), {
    ...transaction,
    userId,
    amount: parseFloat(transaction.amount),
    createdAt: serverTimestamp()
  });
};

// 2. Obtener los registros del usuario y ordenarlos localmente
export const getTransactions = async (userId) => {
  const q = query(
    collection(db, COLECCION),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Ordena por fecha de la más reciente a la más antigua
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// 3. Borrar un registro por su ID
export const deleteTransaction = async (id) => {
  const docRef = doc(db, COLECCION, id);
  await deleteDoc(docRef);
};