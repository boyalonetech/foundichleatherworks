import React from "react";

const ChatBot = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[90vw] h-[80vh] max-w-[350px] max-h-[500px] sm:w-[350px] sm:h-[500px] shadow-xl border border-gray-200 rounded-2xl overflow-hidden z-50 bg-white">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/N-OMv97nlQ-COiFowbYuh"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default ChatBot;