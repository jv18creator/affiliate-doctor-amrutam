import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const getInitialSidebarState = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  return false;
};

export const useSidebarStore = create<SidebarState>(set => ({
  isOpen: getInitialSidebarState(),
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
