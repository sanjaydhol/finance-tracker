"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { createEntity, getEntities } from "../../firestoreHelpers";
import { useRouter } from "next/navigation";

export default function RecordEarning() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [sources, setSources] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchDropdowns();
    fetchUserName();
  }, []);

  const fetchDropdowns = async () => {
    const srcs = await getEntities("earningSources");
    setSources(srcs);
    const pmts = await getEntities("paymentMethods");
    setPaymentMethods(pmts);
    setLoading(false);
  };

  const fetchUserName = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await createEntity("earnings", {
        date: new Date(date),
        amount: Number(amount),
        source,
        description,
        paymentMethod,
        recordedBy: userName,
        createdAt: new Date(),
      });
      setSuccess("Earning recorded successfully!");
      setDate("");
      setAmount("");
      setSource("");
      setDescription("");
      setPaymentMethod("");
    } catch (err: any) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Record Earning</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              value={source}
              onChange={e => setSource(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              required
            >
              <option value="">Select Source</option>
              {sources.map((src: any) => (
                <option key={src.id} value={src.name}>{src.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              required
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((pm: any) => (
                <option key={pm.id} value={pm.name}>{pm.name}</option>
              ))}
            </select>
          </div>
          <div className="text-gray-600 text-sm">Recorded By: <span className="font-semibold">{userName}</span></div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-lg font-semibold shadow hover:bg-gray-900 transition-colors"
            disabled={submitting}
          >
            {submitting ? "Recording..." : "Record Earning"}
          </button>
        </form>
      </div>
    </div>
  );
}
