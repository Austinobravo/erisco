import React from 'react'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartItem {
    item: ProductType
    quantity: number
}
interface CartStore {
    cartItems: CartItem[]
    
    addItem: (item:CartItem) => void
    removeItem: (id:number) => void
    increaseQuantity: (id:number) => void
    decreaseQuantity: (id:number) => void
    clearCart: () => void
    confirmIfItemInCart: (id: number) => boolean
}
const uniqueCart = create(persist<CartStore>( (set,get) => ({
    cartItems: [],
    addItem(data:CartItem) {
        const {item, quantity} = data
        const currentItems = get().cartItems
        const existingItem = currentItems.find((cartItem)=> cartItem.item.id === item.id)
        if(existingItem){
            return 
        }

        set({cartItems: [...currentItems,{item,quantity}]})
        toast.success("Added")
    },
    removeItem(id:number) {
        const currentItems = get().cartItems
        const newCartData = currentItems.filter((cartItem)=> cartItem.item.id !== id)
        set({cartItems: newCartData})
        toast.success("Removed")
    },
    increaseQuantity(id:number){
        const currentItems = get().cartItems
        const newCartData = currentItems.map((cartItem)=> cartItem.item.id === id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
        set({cartItems: newCartData})
    },
    decreaseQuantity(id:number){
        const currentItems = get().cartItems
        const newCartData = currentItems.map((cartItem)=> cartItem.item.id === id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
        set({cartItems: newCartData})
    },
    clearCart(){
        set({cartItems: []})
    },
    confirmIfItemInCart(id:number){
        const currentItems = get().cartItems
        const newCartData = currentItems.find((cartItem)=> cartItem.item.id === id )
        return !!newCartData
        
    }
    
}),
    {
        name: "cart",
        storage: createJSONStorage(()=> localStorage),
    }
))
export default uniqueCart
