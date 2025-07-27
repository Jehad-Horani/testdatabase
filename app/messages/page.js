"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").order("id", { ascending: false });
    setMessages(data || []);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
