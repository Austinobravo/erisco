'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {   allProducts } from '@/lib/globals'
import AddToCart from './AddToCart'
import uniqueCart from '@/hooks/useCart'

const Products = () => {
    const cart = uniqueCart()
  return (
    <section className='p-10'>
        <h1 className='py-2'>All Available Products</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5'>
            {allProducts.map((product, index) =>(
                <div key={index} className='flex gap-5 shadow-2xl rounded-md p-5 '>
                    <Link href={`/products/${product.id}`}>
                        <Image src={product.image} width={100} height={100} alt={product.title} className=''/>
                    </Link>
                    <div className='space-y-2'>
                        <Link href={`/products/${product.id}`} >
                            <h3 className='font-bold'>{product.title}</h3>
                        </Link>
                        <div className='text-sm'>
                            <span className='mr-1 line-through opacity-60'>{product.previousPrice ? "N" + product.previousPrice + ".00" : ''}</span>
                            <span className='text-blue-500'>N{product.currentPrice}.00</span>
                        </div>
                        <p className='text-xs '>{product.details}</p>
                        <AddToCart product={product as ProductType} quantity={1} addToCartFunction={cart.addItem}  removeFromCartFunction={cart.removeItem} isAdded={cart.confirmIfItemInCart}/>
                    </div>

                </div>
            ))}

        </div>
      
    </section>
  )
}

export default Products
