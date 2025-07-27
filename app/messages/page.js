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
    <div style={{ padding: 30 }}>
      <h1>📜 All Messages</h1>
      <a href="/messages" style={{ marginLeft: 10 }}>📜 View All Messages</a>

      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.content}</li>
        ))}
      </ul>
    </div>
  );
}
