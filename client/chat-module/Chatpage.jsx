import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../src/Store/auth";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

export default function Chatpage() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const socket = useRef(null);
  const selectedChatCompare = useRef(null);

  const {
    token,
    user,
    setChats,
    chats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get("http://localhost:5000/chat", config);
      setChats(data);
    } catch (error) {
      console.log("Error fetching chats:", error);
      alert("Failed to fetch chats. Please try again later.");
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/messages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.current.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("Error fetching messages:", error);
      alert("Failed to load messages. Please try again later.");
    }
  };

  const sendMessage = async () => {
    if (!newMessage || !selectedChat) return;
    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newMessage,
          chatId: selectedChat,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Initialize socket
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket.current) return;

    const handleMessageReceived = (newMessageRecieved) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    };

    socket.current.on("message recieved", handleMessageReceived);

    return () => {
      socket.current.off("message recieved", handleMessageReceived);
    };
  }, [notification, fetchAgain, selectedChat]);

  // Fetch messages when chat changes
  useEffect(() => {
    fetchMessages();
    selectedChatCompare.current = selectedChat;
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const setSelectedChatHandler = async (serachVal) => {
    if (!serachVal) {
      setSearchResult([]);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/user/peoples?search=${serachVal}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, "search result");
      const data = await res.json();
      console.log("Search Result:", data);
      setSearchResult(data);
    } catch (error) {
      console.log("Error setting selected chat:", error);
      alert("Failed to set selected chat. Please try again later.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {!isMobile ? (
        <div className="flex flex-1">
          <div className="w-1/4 border-r border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-500 rounded-full w-8 h-8"></div>
              <div>
                <div className="text-orange-400">{user?.name || "User"}</div>
                <div className="text-xs">Admin</div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search chats..."
              className="mb-4 w-full rounded p-1 bg-gray-800 text-sm"
              onClick={(e) => setSelectedChatHandler(e.target.value)}
            />
            {/* {chats && chats.map((chat) => (
              <div
                key={chat.id}
                className={`rounded p-2 mb-2 cursor-pointer ${
                  selectedChat?.id === chat.id
                    ? "bg-orange-500"
                    : "bg-orange-400"
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
                <div>{chat.name}</div>
                <div className="text-xs text-gray-200">{chat.lastMessage}</div>
              </div>
            ))} */}
            {searchResult.length > 0
              ? searchResult.map((chat) => (
                  <div
                    key={chat._id}
                    className={`rounded p-2 mb-2 cursor-pointer ${
                      selectedChat?.id === chat._id
                        ? "bg-orange-500"
                        : "bg-orange-400"
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </div>
                    <div className="text-xs text-gray-200">
                      {chat.lastMessage}
                    </div>
                  </div>
                ))
              : chats &&
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`rounded p-2 mb-2 cursor-pointer ${
                      selectedChat?.id === chat.id
                        ? "bg-orange-500"
                        : "bg-orange-400"
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </div>
                    <div className="text-xs text-gray-200">
                      {chat.lastMessage}
                    </div>
                  </div>
                ))}

            <button className="mt-2 border border-gray-500 w-full py-1 rounded">
              + Group
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="border-b border-gray-700 p-2 flex justify-between items-center">
              {selectedChat ? (
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-500 rounded-full w-6 h-6"></div>
                  <span className="text-orange-400">{selectedChat.name}</span>
                </div>
              ) : (
                <span className="text-gray-400">Select a chat</span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded max-w-xs ${
                    msg.sender?._id === user?._id
                      ? "bg-orange-400 self-end"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            {selectedChat && (
              <div className="flex p-2 border-t border-gray-700">
                <input
                  value={newMessage}
                  onChange={typingHandler}
                  className="flex-1 rounded p-1 bg-gray-800"
                  placeholder="Type a message..."
                />
                <button
                  className="ml-2 bg-orange-400 p-2 rounded"
                  onClick={sendMessage}
                >
                  📨
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {!selectedChat ? (
            <div className="p-2">
              <h2 className="text-xl mb-2">My Chats</h2>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="border border-gray-700 rounded p-2 mb-2 flex items-center"
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="bg-blue-500 rounded-full w-6 h-6 mr-2"></div>
                  <div>
                    <div>{chat.name}</div>
                    <div className="text-xs text-gray-400">
                      {chat.lastMessage}
                    </div>
                  </div>
                </div>
              ))}
              <button className="mt-2 border border-gray-500 w-full py-1 rounded">
                + Group
              </button>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex items-center p-2 border-b border-gray-700">
                <button onClick={() => setSelectedChat(null)}>⬅️</button>
                <span className="ml-2">{selectedChat.name}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded max-w-xs ${
                      msg.sender?._id === user?._id
                        ? "bg-orange-400 self-end"
                        : "bg-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="flex p-2 border-t border-gray-700">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 rounded p-1 bg-gray-800"
                  placeholder="Type a message..."
                />
                <button
                  className="ml-2 bg-orange-400 p-2 rounded"
                  onClick={sendMessage}
                >
                  📨
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
