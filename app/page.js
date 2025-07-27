"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").order("id", { ascending: false });
    setMessages(data || []);
  }

  async function addMessage() {
    if (!name || !msg) return;
    await supabase.from("messages").insert([{ name, content: msg }]);
    setName("");
    setMsg("");
    fetchMessages();
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">💬 Simple Guestbook</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={addMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Send Message
        </button>
      </div>

      <a href="/messages" className="mt-4 text-blue-500 hover:underline">
        📜 View All Messages
      </a>
    </div>
  );
}
