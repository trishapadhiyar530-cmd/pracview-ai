
import { useState, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { askAI } from "../services/aiService";

function AICoachPage() {
    const defaultMessage = [
      {
        sender: "ai",
        text: "Hi! I'm your AI Career Coach 🤖\n\nHow can I help your career journey today? 🚀",
      },
    ];

    const [messages, setMessages] = useState(() => {
      const saved = localStorage.getItem("aiChatHistory");
      return saved ? JSON.parse(saved) : defaultMessage;
    });

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      localStorage.setItem("aiChatHistory", JSON.stringify(messages));
    }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askAI(input);

      const aiReply = {
        sender: "ai",
        text: response.response,
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);

    } catch (error) {
      const aiReply = {
        sender: "ai",
        text: "AI service unavailable right now.",
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }
  };

  return (
    <div className="coach-page">
      <div className="coach-container">
        <div className="coach-header">
          <FaRobot />
          <div>
            <h1>AI Career Coach</h1>
            <p>Your futuristic placement mentor</p>
          </div>
           <button
            className="clear-chat-btn"
            onClick={() => {
              localStorage.removeItem("aiChatHistory");

              setMessages([
                {
                  sender: "ai",
                  text: "Hi! I'm your AI Career Coach 🤖\n\nHow can I help your career journey today? 🚀",
                },
              ]);
            }}
          >
            Clear Chat
          </button>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "user" ? "user-msg" : "ai-msg"
                }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message ai-msg thinking-msg">
              🤖 AI is thinking<span className="dots"></span>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask your AI coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AICoachPage;