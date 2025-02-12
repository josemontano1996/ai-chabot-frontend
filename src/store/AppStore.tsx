import { create } from 'zustand';

interface AppStore {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  error: '',
  setError: (newError: string) => set({ error: newError }),
  clearError: () => set({ error: '' }),
}));
