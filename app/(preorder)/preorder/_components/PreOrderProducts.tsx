'use client'
import Button from '@/components/Button'
import { allProducts } from '@/lib/globals'
import { ArrowDown, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PreOrderProducts = () => {
    const [isPreOrderFormToggled, setIsPreOrderFormToggled] = React.useState<boolean>(false)
    const [currentProductId, setCurrentProductId] = React.useState<number>(1)
  return (
    <section className='p-10'>
        <h1 className='py-2'>Products available on pre order</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5'>
            {allProducts.map((product, index) =>(
                <div key={index}>
                    <div className='flex gap-5 shadow-2xl rounded-md p-5 '>
                        <Link href={``}>
                            <Image src={product.image} width={100} height={100} alt={product.title} className=''/>
                        </Link>
                        <div className='space-y-2'>
                            <h3 className='font-bold'>{product.title}</h3>
                            <div className='text-sm'>
                                <span className='mr-1 line-through opacity-60'>{product.previousPrice ? "N" + product.previousPrice + ".00" : ''}</span>
                                <span className='text-blue-500'>N{product.currentPrice}.00</span>
                            </div>
                            <p className='text-xs '>{product.details}</p>
                            <Button href='' title='Pre Order' icon={ArrowDown} onClick={()=> {currentProductId === index + 1 && setIsPreOrderFormToggled(!isPreOrderFormToggled), setCurrentProductId(product.id)}}/>
                        </div>

                    </div>
                    {isPreOrderFormToggled && index + 1 === currentProductId &&
                        <form className='space-y-2'>
                            <div className='flex flex-col space-y-2'>
                                <div>
                                    <label htmlFor='email'></label>
                                    <input type='email' id='email' name='email' placeholder='Email Address' className=' border border-blue-500 outline-none py-2 px-3 w-full' required/>
                                </div>
                                <div className='flex border border-blue-500 w-full'>
                                    <div className='w-full'>
                                        <label htmlFor='quantity'></label>
                                        <input type='number' id='quantity' name='quantity' placeholder="What's the quantity?" className=' outline-none py-2 px-3 w-full' required/>
                                    </div>
                                    <select className='outline-none shadow'>
                                        <option>roll</option>
                                        <option>carton</option>
                                        <option>truck</option>
                                    </select>
                                </div>
                            </div>
                            <Button title='Place preorder' href='' icon={ShoppingBag} bgColor='bg-blue-500'/>
                        </form>
                    }
                </div>
            ))}

        </div>
      
    </section>
  )
}

export default PreOrderProducts
