import { create } from 'zustand';

export interface ChatMessage {
  type: string;
  message: string;
}

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message: ChatMessage) =>
    set((state: { messages: ChatMessage[] }) => {
      return { messages: [...state.messages, message] };
    }),
}));
