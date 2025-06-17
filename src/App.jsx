import React, { useState } from "react";
import "./App.css";
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI("AIzaSyDRwsz-d66ev330rwpcqi9fV2JiXNgj-D8"); // 🔑 Replace your key here
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    const response = await result.response.text();

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: response }
    ];

    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  return (
  <>
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#4e8bae] text-white">
      {/* Header */}
      {isResponseScreen && (
        <div className="pt-[25px] px-[300px] flex items-center justify-between">
          <h2 className="text-2xl">Assky 🤖 </h2>
          <button
            id="newChatBtn"
            className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
            onClick={newChat}
          >
            New Chat
          </button>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto px-[300px] py-4 space-y-4">
        {isResponseScreen ? (
          <div className="messages space-y-4">
            {messages?.map((msg, index) => (
<div
  key={index}
  className={`p-4 rounded-md bg-[#181818] max-w-[1000%] min-w-[20%] ${
    msg.type === "userMsg" ? "self-end text-right" : "self-start text-left"
  }`}
>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col">
            <h1 className="text-4xl">Assky 🤖</h1>
            <div className="boxes mt-[30px] flex items-center gap-2">
              {[{ text: "What is coding ?\nHow we can learn it.", icon: <IoCodeSlash /> },
                { text: "Which is the red planet of solar system", icon: <BiPlanet /> },
                { text: "In which year python was invented?", icon: <FaPython /> },
                { text: "How we can use the AI for adopt?", icon: <TbMessageChatbot /> }
              ].map((card, i) => (
                <div
                  key={i}
                  className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]"
                >
                  <p className="text-[18px] whitespace-pre-line">{card.text}</p>
                  <i className="absolute right-3 bottom-3 text-[18px]">{card.icon}</i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Box and Footer */}
      <div className="p-4 flex flex-col items-center border-t border-[#222]">
        <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && hitRequest()}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none text-white placeholder-gray-400"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message && (
            <i
              className="text-blue-500 text-[20px] mr-5 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>

      </div>
    </div>
  </>
);

};

export default App;
