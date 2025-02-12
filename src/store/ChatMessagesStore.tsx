import { IChatMessage } from '@/types/chat';
import { create } from 'zustand';

interface ChatStore {
  messages: IChatMessage[];
  setChatMessages: (newHistory: IChatMessage[]) => void;
  appendMessage: (newMessage: IChatMessage) => void;
}

export const useChatMessagesStore = create<ChatStore>((set) => ({
  messages: [],
  setChatMessages: (newHistory: IChatMessage[]) =>
    set({ messages: newHistory }),
  appendMessage: (newMessage: IChatMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
