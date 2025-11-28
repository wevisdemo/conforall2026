"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "สวัสดี เราคือ XXXXXXXXXXXX",
      isBot: true,
    },
    {
      id: 2,
      text: "มีอะไรสงสัย ถามเราได้เลย",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        isBot: false,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "ขอบคุณสำหรับคำถาม เราจะติดต่อกลับโดยเร็วที่สุด",
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 m-2.5 md:m-0 md:inset-auto md:bottom-24 md:right-5 w-auto md:w-[340px] bg-white border-2 border-neutral rounded-2xl shadow-2xl overflow-hidden z-9999 transition-all duration-300 ${
        isMinimized ? "h-14" : "h-auto md:h-[550px]"
      }`}
    >
      {/* Header */}
      <div className="bg-yellow-1 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/ark-q.svg"
            alt="chatbot"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="typo-body-02-semibold text-neutral">คุยกับเรา</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hidden md:block text-neutral hover:opacity-70 transition-opacity text-2xl leading-none"
          >
            —
          </button>
          <button
            onClick={onClose}
            className="text-neutral hover:opacity-70 transition-opacity text-2xl leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 h-[calc(100vh-160px)] md:h-[400px] overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                {message.isBot && (
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src="/images/profile.svg"
                        alt="bot"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-[#FFF9DB] rounded-2xl px-4 py-3 max-w-[220px]">
                      <p className="typo-body-02-normal text-neutral">
                        {message.text}
                      </p>
                    </div>
                  </div>
                )}
                {!message.isBot && (
                  <div className="bg-green-1 rounded-2xl px-4 py-3 max-w-[220px]">
                    <p className="typo-body-02-normal text-white">
                      {message.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-base-200 bg-white">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์คำถาม"
                className="flex-1 bg-base-200 rounded-full px-4 py-3 typo-body-02-normal text-neutral placeholder:text-base-300 outline-none focus:ring-2 focus:ring-green-1 transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
