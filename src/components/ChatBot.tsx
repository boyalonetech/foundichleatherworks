"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatBot from "./ChatWidget";

const AIAssistantIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatWindowRef = useRef(null);
  const buttonRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        event.target &&
        !(chatWindowRef.current as HTMLDivElement).contains(event.target as Node) &&
        buttonRef.current &&
        !(buttonRef.current as HTMLButtonElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Close when scrolling
    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-20 lg:bottom-6 z-40">
      {/* Floating AI Assistant Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          isOpen ? "bg-gray-500" : "bg-found hover:bg-found"
        } text-white shadow-lg transition-all duration-300 hover:scale-110`}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path d="M6.25 9.016a.75.75 0 0 1 .75.748v1.496a.749.749 0 0 1-1.5 0V9.764a.75.75 0 0 1 .75-.748m4.25.748a.749.749 0 0 0-1.5 0v1.496a.749.749 0 0 0 1.5 0z"></path>
              <path d="M7.86 1.805q.075.079.14.164q.065-.085.14-.164c.681-.729 1.737-.897 2.943-.763c1.23.136 2.145.526 2.724 1.257c.566.714.693 1.61.693 2.478c0 .57-.053 1.144-.254 1.651l.168.836l.066.033A2.74 2.74 0 0 1 16 9.75v1.26c0 .24-.086.438-.156.566c-.075.137-.169.26-.259.366c-.18.21-.404.411-.605.578c-.205.17-.407.322-.556.43q-.359.257-.741.478c-.307.176-.749.408-1.296.64C11.296 14.53 9.756 15 8 15s-3.296-.47-4.387-.932a12 12 0 0 1-1.296-.64a9 9 0 0 1-.74-.479a10 10 0 0 1-.557-.429a5 5 0 0 1-.605-.578a2 2 0 0 1-.259-.366A1.2 1.2 0 0 1 0 11.011V9.75c0-1.04.589-1.99 1.52-2.454l.067-.033l.167-.836c-.201-.507-.254-1.08-.254-1.65c0-.869.127-1.765.693-2.479c.579-.73 1.494-1.12 2.724-1.257c1.206-.134 2.262.034 2.944.763M3.024 7.728L3 7.843v4.25l.065.038c.264.151.65.355 1.134.56c.972.41 2.307.813 3.801.813s2.83-.402 3.8-.813a11 11 0 0 0 1.2-.598v-4.25l-.023-.115c-.49.21-1.075.29-1.727.29c-1.146 0-2.06-.326-2.71-.988A3.2 3.2 0 0 1 8 6.29a3.2 3.2 0 0 1-.54.74c-.65.662-1.564.989-2.71.989c-.652 0-1.237-.082-1.727-.29m3.741-4.902c-.193-.207-.637-.413-1.681-.297c-1.02.113-1.48.403-1.713.698c-.247.312-.37.787-.37 1.55c0 .79.129 1.168.308 1.367c.162.18.52.379 1.442.379c.854 0 1.339-.235 1.638-.54c.315-.32.527-.824.618-1.548c.117-.933-.038-1.392-.242-1.61m2.472 0c-.204.217-.359.676-.242 1.61c.09.723.303 1.226.618 1.547c.299.305.784.54 1.638.54c.922 0 1.28-.199 1.442-.379c.179-.199.308-.576.308-1.367c0-.763-.123-1.238-.37-1.55c-.233-.295-.693-.585-1.713-.698c-1.044-.116-1.488.09-1.681.297"></path>
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path d="M6.25 9.016a.75.75 0 0 1 .75.748v1.496a.749.749 0 0 1-1.5 0V9.764a.75.75 0 0 1 .75-.748m4.25.748a.749.749 0 0 0-1.5 0v1.496a.749.749 0 0 0 1.5 0z"></path>
              <path d="M7.86 1.805q.075.079.14.164q.065-.085.14-.164c.681-.729 1.737-.897 2.943-.763c1.23.136 2.145.526 2.724 1.257c.566.714.693 1.61.693 2.478c0 .57-.053 1.144-.254 1.651l.168.836l.066.033A2.74 2.74 0 0 1 16 9.75v1.26c0 .24-.086.438-.156.566c-.075.137-.169.26-.259.366c-.18.21-.404.411-.605.578c-.205.17-.407.322-.556.43q-.359.257-.741.478c-.307.176-.749.408-1.296.64C11.296 14.53 9.756 15 8 15s-3.296-.47-4.387-.932a12 12 0 0 1-1.296-.64a9 9 0 0 1-.74-.479a10 10 0 0 1-.557-.429a5 5 0 0 1-.605-.578a2 2 0 0 1-.259-.366A1.2 1.2 0 0 1 0 11.011V9.75c0-1.04.589-1.99 1.52-2.454l.067-.033l.167-.836c-.201-.507-.254-1.08-.254-1.65c0-.869.127-1.765.693-2.479c.579-.73 1.494-1.12 2.724-1.257c1.206-.134 2.262.034 2.944.763M3.024 7.728L3 7.843v4.25l.065.038c.264.151.65.355 1.134.56c.972.41 2.307.813 3.801.813s2.83-.402 3.8-.813a11 11 0 0 0 1.2-.598v-4.25l-.023-.115c-.49.21-1.075.29-1.727.29c-1.146 0-2.06-.326-2.71-.988A3.2 3.2 0 0 1 8 6.29a3.2 3.2 0 0 1-.54.74c-.65.662-1.564.989-2.71.989c-.652 0-1.237-.082-1.727-.29m3.741-4.902c-.193-.207-.637-.413-1.681-.297c-1.02.113-1.48.403-1.713.698c-.247.312-.37.787-.37 1.55c0 .79.129 1.168.308 1.367c.162.18.52.379 1.442.379c.854 0 1.339-.235 1.638-.54c.315-.32.527-.824.618-1.548c.117-.933-.038-1.392-.242-1.61m2.472 0c-.204.217-.359.676-.242 1.61c.09.723.303 1.226.618 1.547c.299.305.784.54 1.638.54c.922 0 1.28-.199 1.442-.379c.179-.199.308-.576.308-1.367c0-.763-.123-1.238-.37-1.55c-.233-.295-.693-.585-1.713-.698c-1.044-.116-1.488.09-1.681.297"></path>
            </g>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col"
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-found focus:outline-none"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantIcon;
