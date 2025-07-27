"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*");
    setMessages(data || []);
  }

  async function addMessage() {
    if (!newMsg) return;
    await supabase.from("messages").insert([{ content: newMsg }]);
    setNewMsg("");
    fetchMessages();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>📩 Simple Messages</h1>

      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Write message..."
      />
      <button onClick={addMessage}>Send</button>

      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.content}</li>
        ))}
      </ul>
    </div>
  );
}
