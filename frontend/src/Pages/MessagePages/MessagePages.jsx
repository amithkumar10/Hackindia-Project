import React from "react";
import MessageBox from "../../Components/MessagesComps/MessageBox";
import Conversation from "../../Components/MessagesComps/Conversation";
import { useState } from "react";

const MessagePages = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="border-l border-white h-full p-0">
      <div className="flex h-full">
        {/* Messages List */}
        <div
          className={`flex-1 max-w-full border-r border-gray-500 h-screen ${
            isChatOpen ? "hidden" : "block"
          } md:block`}
        >
          <Conversation
            onSelectMessage={(conversation) => {
              setSelectedConversation(conversation);
              setIsChatOpen(true);
            }}
          />
        </div>

        {/* Message Box (Chat Window) */}
        <div
          className={`flex-3 max-w-full border border-gray-200 h-screen ${
            isChatOpen ? "block" : "hidden"
          } md:block`}
        >
          {selectedConversation ? (
            <MessageBox
              conversation={selectedConversation}
              onBack={() => setIsChatOpen(false)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-200 font-bold">
              <svg
                aria-label="Messenger"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="128"
                role="img"
                viewBox="0 0 24 24"
                width="128"
              >
                <path
                  d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.739"
                ></path>
                <path
                  d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="mt-4 text-lg">
                Select a conversation to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePages;
