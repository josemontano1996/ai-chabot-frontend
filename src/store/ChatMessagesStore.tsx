import { IChatMessage } from '@/types/chat';
import { create } from 'zustand';

interface ChatStore {
  messages: IChatMessage[];
  setChatMessages: (newHistory: IChatMessage[]) => void;
  appendMessage: (newMessage: IChatMessage) => void;
}

// TODO: change flow so the history is loaded when connection is stablished
// then individual messges are appended to the history
// and individual bot messages are streamed to the client
// messages will have an unique index so they can be streamed to the client
export const useChatMessagesStore = create<ChatStore>((set) => ({
  messages: [],
  setChatMessages: (newHistory: IChatMessage[]) =>
    set({ messages: newHistory }),
  appendMessage: (newMessage: IChatMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
