import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Contact, Message, ChatConversation } from '../types/chat';
import {
  mockCurrentUser,
  mockContacts,
  mockMessages,
  mockConversations,
} from '../mock/data';

interface ChatContextType {
  currentUser: User;
  updateCurrentUser: (user: Partial<User>) => void;
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  messages: Message[];
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  conversations: ChatConversation[];
  getConversation: (contactId: string) => ChatConversation | undefined;
  markMessagesAsRead: (contactId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);

  const updateCurrentUser = (userData: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...userData }));
  };

  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
    // Initialize empty conversation for new contact
    setConversations((prev) => [
      ...prev,
      {
        contactId: contact.id,
        messages: [],
        unreadCount: 0,
      },
    ]);
  };

  const sendMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Update conversations
    setConversations((prev) =>
      prev.map((conv) => {
        if (
          conv.contactId === messageData.receiverId ||
          conv.contactId === messageData.senderId
        ) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage,
            unreadCount:
              messageData.senderId !== currentUser.id
                ? conv.unreadCount + 1
                : conv.unreadCount,
          };
        }
        return conv;
      })
    );
  };

  const getConversation = (contactId: string): ChatConversation | undefined => {
    return conversations.find((conv) => conv.contactId === contactId);
  };

  const markMessagesAsRead = (contactId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        (msg.senderId === contactId && msg.receiverId === currentUser.id)
          ? { ...msg, isRead: true }
          : msg
      )
    );

    setConversations((prev) =>
      prev.map((conv) =>
        conv.contactId === contactId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        contacts,
        addContact,
        messages,
        sendMessage,
        conversations,
        getConversation,
        markMessagesAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
