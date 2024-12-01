import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUser,
  faRobot,
  faExpandAlt,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";

const ChatBot = () => {
  const [isWaitingForPackageId, setIsWaitingForPackageId] = useState(false);
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

    if (message.toLowerCase().includes("paket saya sekarang dimana")) {
      const botResponse =
        "Maaf Untuk Ketidaknyamanannya ya kak, boleh minta id paketnya?";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsWaitingForPackageId(true);
      setIsBotTyping(false);
      return;
    }

    if (isWaitingForPackageId) {
      const hubLocations = [
        "Hub A - Jakarta",
        "Hub B - Surabaya",
        "Hub C - Bandung",
      ];
      const randomLocation =
        hubLocations[Math.floor(Math.random() * hubLocations.length)];
      const botResponse = `Paket kakak saat ini berada di ${randomLocation}. Terima kasih!`;
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsWaitingForPackageId(false);
      setIsBotTyping(false);
      return;
    }

    if (message.toLowerCase().includes("cara buat order baru")) {
      const botResponse =
        "Kakak Bisa Lihat di kanan atas ada New Order? Bisa tekan disana ya kak";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsBotTyping(false);
      return;
    }

    // OpenAI API Integration
    try {
      const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
          }),
        }
      );

      const data = await response.json();
      const botResponse =
        data.choices[0]?.message?.content ||
        "Maaf, saya tidak mengerti pertanyaan Anda.";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, ada masalah dengan server kami. Silakan coba lagi nanti.",
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
