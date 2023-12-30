import { useCartItemsStore } from "@/store/useCartItemsStore"

export const useCartItems = () => useCartItemsStore((state) => state.cartItems)
