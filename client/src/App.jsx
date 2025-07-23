import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [dailyTip, setDailyTip] = useState("");
  const [loadingTip, setLoadingTip] = useState(true);
  const [voices, setVoices] = useState([]);
  const lastBotMessageRef = useRef(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const loaded = window.speechSynthesis.getVoices();
      if (loaded.length > 0) setVoices(loaded);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Fetch health tip on first load
  useEffect(() => {
    const fetchHealthTip = async () => {
      setLoadingTip(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/health-tip`);
        setDailyTip(res.data.tip);
      } catch (err) {
        console.error("Tip fetch error:", err);
        setDailyTip("Stay hydrated and take care of your hygiene!");
      } finally {
        setLoadingTip(false);
      }
    };

    fetchHealthTip();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
      {
        message: userInput,
        language,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res.data;
    const sarthiMessage = { sender: "sarthi", text: data.reply };

    setMessages((prev) => [...prev, sarthiMessage]);
    lastBotMessageRef.current = sarthiMessage.text;
  };

  // Auto speak
  useEffect(() => {
    if (lastBotMessageRef.current && voices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(lastBotMessageRef.current);
      const langCode = getLangCode(language);

      const voice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes(langCode.toLowerCase()) ||
          v.name.toLowerCase().includes(langCode.toLowerCase())
      );

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      lastBotMessageRef.current = null;
    }
  }, [messages, voices, language]);

  const getLangCode = (lang) => {
    switch (lang.toLowerCase()) {
      case "hindi":
        return "hi-IN";
      case "gujarati":
        return "gu-IN";
      default:
        return "en-US";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="app-container">
      <h1 className="title">🌿 Arogya Mitra 🤖</h1>

      <div className="tip-banner">
        <strong style={{ color: "black" }}>💡 Health Tip of the Day:</strong>
        <p className="tip-text">{loadingTip ? "Loading..." : dailyTip}</p>
      </div>

      <div className="controls">
        <label>🗣 Select Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
          <option>Gujarati</option>
        </select>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "sarthi"}`}
          >
            <span className="sender-label">
              {msg.sender === "user" ? "👤 You" : "🤖 Sarthi"}:
            </span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your health question..."
        />
        <div className="button-group">
          <button onClick={sendMessage}>Send</button>
          <button onClick={() => window.speechSynthesis.cancel()}>
            Stop Voice
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
