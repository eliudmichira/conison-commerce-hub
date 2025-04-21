import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';
import { sendMessage } from '../services/chatService';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useDarkMode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await sendMessage(inputMessage);
      const aiResponse = {
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = "I'm having trouble connecting to the AI service.";
      
      // Add detailed debugging information
      console.log('Error details:', {
        message: error.message,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        envVarSet: !!process.env.REACT_APP_GEMINI_API_KEY
      });
      
      if (error.message === 'API key is missing') {
        errorMessage = "The Gemini API key is missing. Please check your .env.local file and restart the server.";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid request to Gemini API. Please try again with different input.";
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = "Invalid or unauthorized Gemini API key. Please check your API key.";
      } else if (error.response?.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again later.";
      } else if (error.response?.data?.error?.message) {
        errorMessage = `Gemini API error: ${error.response.data.error.message}`;
      }
      
      setError(errorMessage);
      const errorResponse = {
        text: errorMessage,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-full shadow-lg ${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          } hover:bg-blue-700 transition-all duration-300`}
        >
          <FaRobot className="text-2xl" />
        </button>
      ) : (
        <div
          className={`w-80 h-96 rounded-lg shadow-xl flex flex-col ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-blue-500" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {error && (
            <div className="p-2 bg-red-100 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-50 block mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 rounded-lg px-4 py-2 focus:outline-none ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                } hover:bg-blue-600 transition-colors duration-300`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant; 