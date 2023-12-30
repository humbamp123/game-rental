import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '@/store/zustand';

export const useConfirmedStore = create(
  persist(
    (set) => ({
      confirmedItems: new Map(),
      copy: (newConfirmedItems) => {
        set({ confirmedItems: new Map(newConfirmedItems) })},
      clear: () => set({confirmedItems: new Map()}),
    }),
    {
      name: 'confirmed-storage',
      storage: storage('confirmedItems', typeof sessionStorage !== 'undefined' ? sessionStorage : null),
    }
  )
)

export const useConfirmedItems = () => useConfirmedStore((state) => state.confirmedItems)
