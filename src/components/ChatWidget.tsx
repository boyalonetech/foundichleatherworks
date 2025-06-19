import React from "react";

const ChatBot = () => {

  const chatBotUrl = process.env.NEXT_PUBLIC_BOT_KEY

  return (
    <div className="fixed bottom-[10%] md:bottom-20 lg:bottom-10 right-4 md:right-4 sm:bottom-6 sm:right-6 w-[90vw] h-[100vh] md:h-[80vh] max-w-[350px] max-h-[600px] lg:max-h-[500px] sm:w-[350px] sm:h-[500px] shadow-xl border border-gray-200 rounded-2xl overflow-hidden z-40 bg-white">
      <iframe
        src={chatBotUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default ChatBot;