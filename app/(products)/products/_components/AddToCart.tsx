'use client'
import Button from '@/components/Button'
import { ShoppingBag, Trash2 } from 'lucide-react'

import React from 'react'

interface CartItem {
    item: ProductType
    quantity: number
}

interface Props{
    product: ProductType
    quantity: number
    addToCartFunction: (data: CartItem) => void
    removeFromCartFunction: (id: number) => void
    isAdded: (id: number)=> boolean
}
const AddToCart = ({product, quantity, addToCartFunction, removeFromCartFunction, isAdded}: Props) => {
  return (
    <div className='flex gap-x-1'>
            <button disabled={isAdded(product?.id)} className='disabled:opacity-50 disabled:!cursor-not-allowed'>
                <Button href='' title={isAdded(product?.id) ? 'Added' : 'Add to cart'} icon={ShoppingBag} onClick={()=>addToCartFunction({item:product, quantity: quantity})} />
            </button>
            {isAdded(product?.id) && 
            <button className='underline text-red-500'>
                <Button href='' title={`Remove`} icon={Trash2} onClick={()=> removeFromCartFunction(product?.id)} bgColor='bg-red-500'/>
            </button>
            }
    </div>
  )
}

export default AddToCart
