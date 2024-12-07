import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUser,
  faRobot,
  faExpandAlt,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";

const ChatBot = ({ isTutorOrderButton, setIsTutorOrderButton }) => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botFullScreen, setBotFullScreen] = useState(false);
  const chatBoxRef = useRef(null);

  const handleUserMessage = async (message) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setUserInput("");
    setIsBotTyping(true);

    // Tutor Order Baru
    const orderBaruWords = ["cara", "buat", "order", "baru", "cargo"];
    const orderBaruContainsWord = orderBaruWords.every((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    );
    if (orderBaruContainsWord) {
      setIsBotTyping(true);
      setIsBotTyping("tutor"); // Set to a specific state for the Tutor Order loading

      // Simulate some delay for the loading effect
      setTimeout(() => {
        const botResponse =
          "Halo, silakan lihat di kanan atas ada opsi 'New Order'. Kamu bisa menekan di sana untuk melanjutkan. Setelah itu, pilih layanan 'Courier & Cargo Solutions'. Jangan lupa untuk mengisi semua Detail Kiriman dengan lengkap dan jelas ya. Terima kasih!";
        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        setIsTutorOrderButton(true);
        setTimeout(() => {
          setIsTutorOrderButton(false);
        }, 10000);
        setIsBotTyping(false); // Stop typing indicator after the message is sent
      }, 2000); // Simulate a delay to show loading effect

      return;
    }

    // OpenAI API Integration
    try {
      const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botResponse =
        response.data.choices[0]?.message?.content ||
        "Maaf, saya tidak mengerti pertanyaan Anda.";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, server sedang sibuk. Silakan coba lagi nanti.",
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleUserMessage(userInput);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Chat Bot Icon */}
      <div
        onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
        className="fixed bottom-4 right-4 z-[40] cursor-pointer p-4 rounded-full bg-blue-600 text-white shadow-lg"
      >
        <span className="mx-2">Chat With Our AI!</span>
        <FontAwesomeIcon icon={faComments} size="lg" />
      </div>

      {/* Chat Box */}
      {isChatBoxOpen && (
        <div
          className={`fixed bottom-16 right-4 z-[40] bg-base-200 shadow-lg rounded-lg ${
            botFullScreen ? "w-1/2 h-1/2" : "w-1/4"
          } `}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex">
              <h3 className="text-lg font-semibold mx-2">AI Chat Assistant</h3>
              <FontAwesomeIcon icon={faRobot} size="lg" />
            </div>
            <div>
              <button
                onClick={() => setBotFullScreen(!botFullScreen)}
                className="btn btn-square btn-ghost"
                title={botFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <FontAwesomeIcon
                  icon={botFullScreen ? faCompressAlt : faExpandAlt}
                />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="h-64 overflow-y-scroll p-4" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center my-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-gray-500 mr-2"
                    size="lg"
                  />
                )}
                <div
                  className={`p-2 max-w-xs rounded-lg text-sm text-white ${
                    msg.sender === "user" ? "bg-blue-500" : "bg-gray-500"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-blue-500 ml-2"
                    size="lg"
                  />
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse delay-400"></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex p-4 border-t">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ml-2">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
