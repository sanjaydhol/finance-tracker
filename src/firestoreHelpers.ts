import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentData } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

// Generic CRUD helpers
export async function createEntity<T>(collectionName: string, data: T) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function getEntities<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

export async function updateEntity<T>(collectionName: string, id: string, data: Partial<T>) {
  await updateDoc(doc(db, collectionName, id), data as DocumentData);
}

export async function deleteEntity(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function getEntityById<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDocs(collection(db, collectionName));
  const found = docSnap.docs.find(d => d.id === id);
  return found ? ({ id: found.id, ...found.data() } as T) : null;
}
