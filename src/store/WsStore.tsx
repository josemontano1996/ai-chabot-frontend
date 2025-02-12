import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWebSocketStore = create<AppStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
