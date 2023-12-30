import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '@/store/zustand';

export const useCartItemsStore = create(
  persist(
    (set, get) => ({
      cartItems: new Map(),
      add: (newItem, selectedPlatform) => {
        const existingItem = get().cartItems.get(newItem?.id);
        const existingPlatforms = existingItem?.selectedPlatforms ? existingItem?.selectedPlatforms : []
        const selectedPlatforms = Array.from(new Set([...existingPlatforms, selectedPlatform]))

        set({ cartItems: new Map(get().cartItems.set(newItem?.id, { ...newItem, selectedPlatforms})) })},
      removePlatform: (item, selectedPlatform) => {
        const existingItem = get().cartItems.get(item?.id);
        const existingPlatforms = existingItem?.selectedPlatforms
        const selectedPlatforms = existingPlatforms.filter((platform) => selectedPlatform.id !== platform.id)
        const updateCartItems = selectedPlatforms.length > 0 ?
          get().cartItems.set(item?.id, { ...item, selectedPlatforms }) :
          get().cartItems.delete(item.id)

        set({ cartItems: new Map(get().cartItems)})
      },
      remove: (itmToRemove) => {
        get().cartItems.delete(itmToRemove?.id)
        set({ cartItems: new Map(get().cartItems) })},
      removeAll: () => set({cartItems: new Map()}),
    }),
    {
      name: 'cart-storage',
      storage: storage('cartItems', typeof localStorage !== 'undefined' ? localStorage : null),
    }
  )
)

export const useCartItems = () => useCartItemsStore((state) => state.cartItems)
