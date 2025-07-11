"use client";
import { useRouter } from "next/navigation";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (user) fetchItems();
  }, [user]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setSubmitting(true);
    await addDoc(collection(db, "items"), { name: newItem });
    setNewItem("");
    setSubmitting(false);
    fetchItems();
  };

  const handleDeleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
    fetchItems();
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to the Dashboard!</h1>
        <form onSubmit={handleAddItem} className="flex gap-2 mb-6 w-full">
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Enter item name"
            className="border p-2 rounded w-full"
            disabled={submitting}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
            disabled={submitting}
          >
            Add
          </button>
        </form>
        <ul className="w-full mb-8">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name}</span>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSignOut}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
