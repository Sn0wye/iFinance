import { create } from 'zustand';

interface ContextType {
  isOpen: boolean;
  toggle: () => void;
}

export const useCommandPalette = create<ContextType>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen }))
}));
