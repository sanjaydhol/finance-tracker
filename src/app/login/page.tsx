"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import { createEntity } from "../../firestoreHelpers";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupMode, setSignupMode] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createEntity("users", {
        email,
        name,
        phone: "",
        role: "member",
        clubId: "",
        isApproved: false,
        createdAt: new Date(),
      });
      setSignupMode(false);
      setEmail("");
      setPassword("");
      setName("");
      alert("Signup successful! Await admin approval.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4">
      <form onSubmit={signupMode ? handleSignup : handleLogin} className="flex flex-col gap-4 w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">{signupMode ? "Sign Up" : "Login"}</h2>
        {signupMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded font-semibold shadow">
          {signupMode ? "Sign Up" : "Login"}
        </button>
        <button
          type="button"
          className="text-blue-600 underline text-sm mt-2"
          onClick={() => setSignupMode(!signupMode)}
        >
          {signupMode ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}
