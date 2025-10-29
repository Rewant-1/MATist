"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Code, Home } from "lucide-react";
import type { Chat, Message } from "@/types/chat";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem("ai-tutor-chats");
    const savedSidebarWidth = localStorage.getItem("ai-tutor-sidebar-width");

    if (savedSidebarWidth) {
      setSidebarWidth(Number.parseInt(savedSidebarWidth));
    }

    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((message: any) => ({
          ...message,
          timestamp: new Date(message.timestamp),
        })),
      }));

      const nonEmptyChats = parsedChats.filter(
        (chat: Chat) => chat.messages.length > 0
      );

      if (nonEmptyChats.length > 0) {
        setChats(nonEmptyChats);
        setActiveChat(nonEmptyChats[0].id);
      } else {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: "New conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setChats([newChat]);
        setActiveChat(newChat.id);
      }
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: "New conversation",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setChats([newChat]);
      setActiveChat(newChat.id);
    }
    setIsInitialized(true);
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (isInitialized && chats.length > 0) {
      localStorage.setItem("ai-tutor-chats", JSON.stringify(chats));
    }
  }, [chats, isInitialized]);

  // Save sidebar width to localStorage
  useEffect(() => {
    localStorage.setItem("ai-tutor-sidebar-width", sidebarWidth.toString());
  }, [sidebarWidth]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats((prev) => {
      const updated = prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, ...updates, updatedAt: new Date() }
          : chat
      );
      return updated;
    });
  };

  const deleteChat = (chatId: string) => {
    setChats((prev) => {
      const filtered = prev.filter((chat) => chat.id !== chatId);
      if (activeChat === chatId && filtered.length > 0) {
        setActiveChat(filtered[0].id);
      } else if (filtered.length === 0) {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: "New conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setActiveChat(newChat.id);
        return [newChat];
      }
      return filtered;
    });
  };

  const renameChat = (chatId: string, newTitle: string) => {
    updateChat(chatId, { title: newTitle });
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats((prev) => {
      const updated = prev.map((chat) => {
        if (chat.id === chatId) {
          const newMessages = [...chat.messages, message];
          return {
            ...chat,
            messages: newMessages,
            updatedAt: new Date(),
          };
        }
        return chat;
      });
      return updated;
    });
  };

  const updateChatTitle = (chatId: string, firstMessage: string) => {
    const title =
      firstMessage.length > 30
        ? firstMessage.substring(0, 30) + "..."
        : firstMessage;
    updateChat(chatId, { title });
  };

  const currentChat = chats.find((chat) => chat.id === activeChat);

  if (!isInitialized) {
    return (
      <div className="flex h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center animate-pulse">
            <Code className="h-4 w-4 text-white" />
          </div>
          <span className="text-slate-600 dark:text-slate-400">
            Loading ECE MATLAB Helper...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-linear-to-br from-slate-50 via-cyan-50/40 to-slate-100 dark:from-slate-950 dark:via-slate-900/70 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-y-0 -right-72 z-0 h-[140%] w-220 rotate-12 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-secondary),transparent_70%)] opacity-40 blur-[140px]" />
      <div className="pointer-events-none absolute inset-y-0 -left-64 z-0 h-[140%] w-180 -rotate-6 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-primary),transparent_70%)] opacity-35 blur-[140px]" />
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sidebarWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-r border-slate-200 dark:border-slate-800"
          >
            <ChatSidebar
              chats={chats}
              activeChat={activeChat}
              onSelectChat={setActiveChat}
              onDeleteChat={deleteChat}
              onRenameChat={renameChat}
              onNewChat={createNewChat}
              width={sidebarWidth}
              onWidthChange={setSidebarWidth}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-surface relative z-10 mx-auto my-4 flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-2xl border border-white/20 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold bg-linear-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                    {currentChat?.title || "ECE MATLAB Helper"}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your ECE MATLAB practical assistant
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-white/50 bg-white/70 text-slate-700 hover:border-teal-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-teal-500 dark:hover:bg-slate-800/80 transition-all duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/ece-practical">
                <Button
                  variant="outline"
                  className="border-2 border-white/50 bg-white/70 text-slate-700 hover:border-teal-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-teal-500 dark:hover:bg-slate-800/80 transition-all duration-200"
                >
                  <Code className="h-4 w-4 mr-2" />
                  ECE MATLAB Helper
                </Button>
              </Link>
              <Button
                onClick={createNewChat}
                className="bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <div className="flex-1 min-h-0">
          {currentChat ? (
            <ChatInterface
              key={currentChat.id}
              chat={currentChat}
              onAddMessage={addMessage}
              onUpdateTitle={updateChatTitle}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center max-w-md mx-auto p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Code className="h-10 w-10 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4"
                >
                  Welcome to ECE MATLAB Helper
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  Your intelligent ECE MATLAB assistant is ready to help you with
                  ECE practicals, MATLAB programming, signal processing, and 
                  communication systems.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={createNewChat}
                    className="bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 text-lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Start Chatting
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
