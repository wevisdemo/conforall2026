"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHATBOT_API_URL =
  "https://automation.playground.meeboon.dev/webhook/7f3e950b-9e6a-4607-96bf-f35d30dbc5cb";

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: 1,
    //   text: "สวัสดี เราคือ XXXXXXXXXXXX",
    //   isBot: true,
    // },
    {
      id: 1,
      text: "มีอะไรสงสัย ถามเราได้เลย",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a stable userId per session
  const userId = useMemo(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for environments without crypto.randomUUID
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userText = inputValue;
      const newMessage: Message = {
        id: messages.length + 1,
        text: userText,
        isBot: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch(CHATBOT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: userId,
            text: userText,
          }),
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        // Parse the response and add bot messages
        if (data.messagesPayload && Array.isArray(data.messagesPayload)) {
          data.messagesPayload.forEach(
            (payload: { type: string; text: string }, index: number) => {
              if (payload.type === "text" && payload.text) {
                const botResponse: Message = {
                  id: Date.now() + index,
                  text: payload.text,
                  isBot: true,
                };
                setMessages((prev) => [...prev, botResponse]);
              }
            }
          );
        }
      } catch (error) {
        console.error("Chatbot API error:", error);
        const errorMessage: Message = {
          id: Date.now(),
          text: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          isBot: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
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
      className={`fixed inset-0 m-2.5 md:m-0 md:inset-auto md:bottom-24 md:right-5 w-auto md:w-[340px] bg-white border-2 border-neutral rounded-2xl shadow-2xl overflow-hidden z-9999 transition-all duration-300 flex flex-col ${
        isMinimized ? "h-14" : "md:h-[550px]"
      }`}
    >
      {/* Header */}
      <div className="bg-yellow-1 px-4 py-3 flex items-center justify-between shrink-0">
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
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-white">
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
                      <div className="typo-body-02-normal text-neutral prose prose-sm prose-neutral max-w-none [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
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
            {isLoading && (
              <div className="flex justify-start">
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
                  <div className="bg-[#FFF9DB] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-neutral rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-neutral rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-neutral rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-base-200 bg-white shrink-0">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์คำถาม"
                disabled={isLoading}
                className="flex-1 bg-base-200 rounded-full px-4 py-3 typo-body-02-normal text-neutral placeholder:text-base-300 outline-none focus:ring-2 focus:ring-green-1 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shrink-0 disabled:opacity-50"
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
