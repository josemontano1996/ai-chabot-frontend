import { create } from 'zustand';

interface AppStore {
  isConnected: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsConnected: (isConnected: boolean) => void;
}

export const useWebSocketStore = create<AppStore>((set) => ({
  isLoading: false,
  isConnected: false,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
