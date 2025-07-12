const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyB6HSy33zBtvtkoxRyWL5O3jDVRMmmnLK0",
  authDomain: "finance-tracker-c2261.firebaseapp.com",
  projectId: "finance-tracker-c2261",
  storageBucket: "finance-tracker-c2261.firebasestorage.app",
  messagingSenderId: "160915753146",
  appId: "1:160915753146:web:51339b8f7d9bcd197c1a83",
  measurementId: "G-139VRW46QZ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createEntity(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return docRef.id;
}

module.exports = { createEntity };
