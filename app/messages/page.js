"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (authorized) {
      fetchMessages();
    }
  }, [authorized]);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").order("id", { ascending: false });
    setMessages(data || []);
  }

  function checkPassword() {
    if (password === "jehadmedroots25") {
      setAuthorized(true);
    } else {
      alert("❌ Wrong password!");
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
        <h1 className="text-2xl font-bold mb-4">🔒 Enter Password</h1>
        <input
          type="password"
          className="border p-2 rounded w-64 mb-3"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={checkPassword}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📜 All Messages</h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="bg-black p-4 rounded-xl shadow-md">
            <p className="font-semibold text-lg">{m.name}</p>
            <p className="text-gray-700">{m.content}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(m.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
