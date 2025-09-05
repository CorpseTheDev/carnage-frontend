import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Home() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (token) {
      socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        auth: { token }
      });
      socket.emit("join_main");
      socket.on("new_message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, [token]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { chatId: "main", content: message });
      setMessage("");
    }
  };

  return (
    <div className="p-6">
      {!token ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            // for now just fake a token
            setToken("demo.jwt.token");
          }}
        >
          Login (Fake)
        </button>
      ) : (
        <>
          <div className="border p-4 h-64 overflow-y-scroll mb-4">
            {messages.map((m, i) => (
              <div key={i}>{m.content}</div>
            ))}
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </>
      )}
    </div>
  );
}
