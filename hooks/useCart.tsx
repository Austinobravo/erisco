
import { allProducts } from '@/lib/globals'
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
    getCurrentQuantity: (id: number) => number
    totalAmountOfItemsInCart: () => number
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
        console.log("items", currentItems)
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
        const newCartData = currentItems.map((cartItem)=> cartItem.item.id === id ? {...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1}: cartItem)
        set({cartItems: newCartData})
    },
    clearCart(){
        set({cartItems: []})
    },
    confirmIfItemInCart(id:number){
        const currentItems = get().cartItems
        if (currentItems.length > 0){
            const newCartData = currentItems.find((cartItem)=> cartItem.item.id === id )
            return !!newCartData
        }
        return false
        
    },
    getCurrentQuantity(id:number){
        const currentItems = get().cartItems
        if (currentItems.length > 0){
            const gottenItem =  currentItems.find((cartItem) => cartItem.item.id === id )
            if(gottenItem){
                return gottenItem.quantity
            } else{
                return 1
            }
        }
        else{
            return 1
        }

        
    },
    totalAmountOfItemsInCart() {
        const currentItems = get().cartItems
        if (currentItems.length > 0){
            const totalAmount = currentItems.map((product) => {
                const {quantity, item} = product
                const uniqueProduct = allProducts.find((product) => product.id === item.id)
                return (
                    quantity * uniqueProduct?.currentPrice!
                    )
                }).reduce((total, nextNumber) => total + nextNumber,0)

            return totalAmount
        }else{
            return 0
        }
    }
    
}),
    {
        name: "cart",
        storage: createJSONStorage(()=> localStorage),
    }
))
export default uniqueCart
