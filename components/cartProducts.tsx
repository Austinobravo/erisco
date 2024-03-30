'use client'

import { ShoppingBag, X } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props{
    toggle: () => void
    productsInCart: any[]
    addProductToCart: (id:number) => void
    subtractProductToCart: (id:number) => void
    updateProductQuantityInCart: (id:number) => number
    deleteItemInCart: (id:number) => void
}
const CartProducts =  ({ toggle, productsInCart, addProductToCart, subtractProductToCart, updateProductQuantityInCart, deleteItemInCart}: Props) => {
  return (
    <div className='overflow-y-auto h-full pb-28'>
            {productsInCart.length > 0 ?
                productsInCart.map((product:any, index:any) => (
                    <div key={index} className='w-full border rounded-md p-2 my-5 space-y-3'>
                        <div title='Delete' className='ml-auto w-fit cursor-pointer' onClick={()=> deleteItemInCart(product.item.id)}>
                            <X/>
                        </div>
                        <div className='flex items-center justify-between '>
                            <div className='basis-1/2 pl-3 text-sm space-y-2'>
                            <span className='text-[9px] bg-black text-white p-1 rounded-md'>N{updateProductQuantityInCart(product.item.id) * product.item.currentPrice?.toFixed(2)}</span>
                                <h2 className='font-semibold'>{product.item.title}</h2>
                                <span className='text-xs opacity-80'>{updateProductQuantityInCart(product.item.id)} x N{product.item.currentPrice?.toFixed(2)}</span>
                                <div className=' space-x-2'>
                                    <button className='border rounded-full px-1' onClick={()=>subtractProductToCart(product.item.id)}>-</button>
                                    <span>{updateProductQuantityInCart(product.item.id)}</span>
                                    <button className='border rounded-full px-1' onClick={()=>addProductToCart(product.item.id)}>+</button>
                                </div>
                            </div>
                            <div className='basis-1/2 '>
                                <Image src={product.item.image} width={100} height={100} alt={product.item.title} className='w-fit ml-auto rounded-md'/>
                            </div>

                        </div>
                    </div> 

                ))
            :
                <div className='flex flex-col justify-center items-center pt-10 space-y-4'>
                    <ShoppingBag color='#bbb' size={50}/>
                    <p className='text-sm'>Your Shopping Cart is empty</p>
                    <span className='text-xs'>Try Shopping <Link href={`/products`} onClick={toggle}  className='text-blue-500 font-bold'>now</Link></span>
                </div> 
            }
        </div>
  )
}

export default CartProducts
