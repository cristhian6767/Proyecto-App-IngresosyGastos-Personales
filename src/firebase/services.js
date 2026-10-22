import { app, db } from "./config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

export const getTransactions = async (userId) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const transactions = [];
  querySnapshot.forEach((docSnap) => {
    transactions.push({ id: docSnap.id, ...docSnap.data() });
  });
  return transactions;
};

export const addTransaction = async (transaction) => {
  const docRef = await addDoc(collection(db, "transactions"), transaction);
  return docRef.id;
};

export const deleteTransaction = async (id) => {
  await deleteDoc(doc(db, "transactions", id));
};
