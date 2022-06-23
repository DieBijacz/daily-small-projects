import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = { children: ReactNode }
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}
type CartItem = {
  id: number
  quantity: number
}

const ShoppingcartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingcartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])


  return (
    <ShoppingcartContext.Provider value={{}}>
      {children}
    </ShoppingcartContext.Provider>
  )
}