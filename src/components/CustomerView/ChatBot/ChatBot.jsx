import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

const ChatBot = () => {
  const [isWaitingForPackageId, setIsWaitingForPackageId] = useState(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const handleUserMessage = (message) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setUserInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      let botResponse = "Maaf, saya tidak mengerti pertanyaan Anda.";

      if (message.toLowerCase().includes("paket saya sekarang dimana")) {
        botResponse =
          "Maaf Untuk Ketidaknyamanannya ya kak, boleh minta id paketnya?";
        setIsWaitingForPackageId(true);
      } else if (isWaitingForPackageId) {
        const hubLocations = [
          "Hub A - Jakarta",
          "Hub B - Surabaya",
          "Hub C - Bandung",
        ];
        const randomLocation =
          hubLocations[Math.floor(Math.random() * hubLocations.length)];
        botResponse = `Paket kakak saat ini berada di ${randomLocation}. Terima kasih!`;
        setIsWaitingForPackageId(false);
      }
      if (message.toLowerCase().includes("cara buat order baru")) {
        botResponse =
          "Kakak Bisa Lihat di kanan atas ada New Order? Bisa tekan disana ya kak";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsBotTyping(false);
    }, 1500);
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
        <div className="fixed bottom-16 right-4 z-[40] bg-base-200 shadow-lg rounded-lg w-1/4">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">AI Chat Assistant</h3>
            <FontAwesomeIcon icon={faRobot} size="lg" />
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
