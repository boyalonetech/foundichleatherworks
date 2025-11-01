"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import allEmojis from "./chatdatabase";
import { fstat } from "fs";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FoundichAssistant = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your FOUNDICH assistant. How can I help you with our leather products today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState("");
  const [isOpen] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://www.chatbase.co/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ content: currentInput, role: "user" }],
          chatbotId: process.env.NEXT_PUBLIC_AI_ID,
          stream: false,
          temperature: 0.7,
        }),
      });
      const data = await response.json();

      const botResponse =
        data.text ||
        "Thank you for your message. Please Check your Internet Connection and try again.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const fallbackResponse =
        "I'm here to assist you with FOUNDICH leather products and services.";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: fallbackResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Option handlers
  const handleDeleteChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello 👋 I'm your FOUNDICH assistant. How can I help you with our premium leather products today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setShowOptions(false);
  };

  const handleEndChat = () => {
    if (confirm("Are you sure you want to end this chat?")) {
      router.back();
    }
  };

  const handleViewChatHistory = () => {
    // Implement chat history functionality here
    alert("Chat history feature would be implemented here");
    setShowOptions(false);
  };

  const handleNewChat = () => {
    handleDeleteChat(); // Same functionality as delete for now
    setShowOptions(false);
  };

  // Add click outside handler to close emoji picker
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (showEmojiPicker && !target.closest(".emoji-picker-container")) {
  //       setShowEmojiPicker(false);
  //       setEmojiSearch("");
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [showEmojiPicker]);

  return (
    <section
      className={`flex flex-col h-screen lg:h-full  rounded-3xl bg-[#fcfeff] ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 flex items-center justify-between lg:px-3 py-3 shadow-sm rounded-t-3xl">
        <div className="flex items-center gap-1 lg:gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center lg:hidden justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-found/80 to-found rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 border-2 border-gray-100 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-sm font-semibold">FOUNDICH ASSISTANT</h1>
              <p className="text-[10px] opacity-90">
                Online <span className="text-red-600">•</span> Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* OPTIONS BUTTON */}
        <div className="relative" ref={optionsRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Chat options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          {/* OPTIONS DROPDOWN */}
          {showOptions && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
              <button
                onClick={handleNewChat}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
                New Chat
              </button>

              <button
                onClick={handleDeleteChat}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Delete Chat
              </button>

              <button
                onClick={handleViewChatHistory}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View History
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleEndChat}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                End Chat
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                message.sender === "user"
                  ? "bg-red-600 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none border border-gray-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm max-w-[80%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="border-t border-gray-100 p-4">
        <div className="max-w-full">
          <div className="relative flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-gray-500 focus-within:bg-white transition-all shadow-sm px-4 py-3">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="AsK FOUNDiCH ..."
              className="flex-1 resize-none bg-transparent text-sm focus:outline-none max-h-32 placeholder:text-gray-400"
              rows={1}
            />

            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-all hover:scale-110 active:scale-95"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </button>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="flex-shrink-0 text-red-600 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              )}
            </button>

            {/* Emoji Picker Popup */}
            {showEmojiPicker && (
              <div className="absolute bottom-full -translate-y-5 lg:right-0 right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-lg lg:w-80 w-72 max-h-96 flex flex-col">
                {/* Search Bar */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search emojis..."
                    value={emojiSearch}
                    onChange={(e) => setEmojiSearch(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    autoFocus
                  />
                </div>

                {/* Emoji Grid */}
                <div className="p-3 overflow-y-auto flex-1">
                  <div className="grid grid-cols-8 gap-1">
                    {allEmojis
                      .filter(
                        (emoji) =>
                          emojiSearch === "" ||
                          emoji.keywords.some((keyword) =>
                            keyword
                              .toLowerCase()
                              .includes(emojiSearch.toLowerCase())
                          )
                      )
                      .map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputMessage(inputMessage + emoji.char);
                            setShowEmojiPicker(false);
                            setEmojiSearch("");
                            textareaRef.current?.focus();
                          }}
                          className="text-2xl hover:bg-gray-100 rounded-lg p-1 transition-colors"
                          type="button"
                          title={emoji.keywords[0]}
                        >
                          {emoji.char}
                        </button>
                      ))}
                  </div>
                  {allEmojis.filter(
                    (emoji) =>
                      emojiSearch === "" ||
                      emoji.keywords.some((keyword) =>
                        keyword
                          .toLowerCase()
                          .includes(emojiSearch.toLowerCase())
                      )
                  ).length === 0 && (
                    <div className="text-center text-gray-400 py-8 text-sm">
                      No emojis found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundichAssistant;
