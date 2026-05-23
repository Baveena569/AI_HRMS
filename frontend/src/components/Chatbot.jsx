import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 I am AI HRMS Assistant. Ask me anything!",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };

    const botMsg = {
      text: getReply(input.toLowerCase()),
      sender: "bot",
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  const getReply = (msg) => {
    if (msg.includes("add employee")) {
      return "Go to form → Fill details → Click Add Employee.";
    }

    if (msg.includes("edit")) {
      return "Click Edit button next to employee.";
    }

    if (msg.includes("delete")) {
      return "Click Delete button to remove employee.";
    }

    if (msg.includes("hrms")) {
      return "HRMS manages employee data, roles, and operations.";
    }

    if (msg.includes("employees")) {
      return "Scroll down to view employee table.";
    }

    return "I can help with: add, edit, delete, employees info.";
  };

  return (
    <div style={styles.chatBox}>
      <div style={styles.header}>AI HRMS Chatbot 🤖</div>

      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={m.sender === "bot" ? styles.bot : styles.user}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask HRMS..."
          style={styles.input}
        />
        <button style={styles.btn} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatBox: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    background: "#111827",
    borderRadius: "12px",
    overflow: "hidden",
    color: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },

  header: {
    background: "#8b5cf6",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },

  messages: {
    height: "250px",
    overflowY: "auto",
    padding: "10px",
  },

  bot: {
    background: "#1e293b",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
  },

  user: {
    background: "#3b82f6",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    textAlign: "right",
  },

  inputBox: {
    display: "flex",
    borderTop: "1px solid #333",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },

  btn: {
    background: "#8b5cf6",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};

export default Chatbot;