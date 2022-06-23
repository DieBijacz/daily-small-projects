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

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0 //if there is item qith passed id ?.quantity return that item quantity else return 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      // id there is only one item with passed id then remove it
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        // else decrese quantity by -1
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id === id)
    })
  }

  return (
    <ShoppingcartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
      {children}
    </ShoppingcartContext.Provider>
  )
}