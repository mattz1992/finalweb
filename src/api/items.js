import {
  collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter, serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

const COL = "items";
const colRef = collection(db, COL);

export async function createItem(data){
  const payload = {
    ...data,
    precio: Number(data.precio),
    stock: Number(data.stock),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(colRef, payload);
  return ref.id;
}

export async function getItem(id){
  const snap = await getDoc(doc(db, COL, id));
  if(!snap.exists()) throw new Error("No existe el item");
  return { id: snap.id, ...snap.data() };
}

export async function updateItem(id, data){
  const payload = {
    ...data,
    precio: Number(data.precio),
    stock: Number(data.stock),
    updatedAt: serverTimestamp(),
  };
  await updateDoc(doc(db, COL, id), payload);
}

export async function removeItem(id){
  await deleteDoc(doc(db, COL, id));
}

/**
 * listItems con filtro (categoria opcional) + paginación
 * @param {Object} opts { categoria, pageSize, cursor }
 * cursor: último DocumentSnapshot devuelto (para startAfter)
 */
export async function listItems({ categoria, pageSize=6, cursor } = {}){
  let q = query(colRef, orderBy("nombre"));
  if (categoria) q = query(colRef, where("categoria","==",categoria), orderBy("nombre"));
  if (pageSize) q = query(q, limit(pageSize));
  if (cursor) q = query(colRef, orderBy("nombre"), ...(categoria ? [where("categoria","==",categoria)] : []), startAfter(cursor), limit(pageSize));
  const snap = await getDocs(q);
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const nextCursor = snap.docs.length ? snap.docs[snap.docs.length-1] : null;
  return { data, nextCursor };
}
