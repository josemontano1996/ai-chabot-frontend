import { create } from "zustand";

interface AppStore {
  success: string;
  setSuccess: (successMessage: string) => void;
  clearSuccess: () => void;
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  success: "",
  error: "",
  setSuccess: (successMesage: string) => set({ success: successMesage }),
  clearSuccess: () => set({ success: "" }),
  setError: (newError: string) => set({ error: newError }),
  clearError: () => set({ error: "" }),
}));
