import React, { createContext, useContext, useState } from "react";

const ChatbotContext = createContext({
  chatbotConfig: {},
  setChatbotConfig: (config) => {},
  isChatbotOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
});

export const ChatbotProvider = ({ children }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Store multiple customization options
  const [chatbotConfig, setChatbotConfig] = useState({
    
  });

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
  };

  return (
    <ChatbotContext.Provider value={{chatbotConfig, setChatbotConfig, isChatExpanded, setIsChatExpanded,
      isChatbotOpen, openChatbot, closeChatbot
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}; 
