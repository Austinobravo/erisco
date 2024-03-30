'use client'

import Image from 'next/image'
import React from 'react'
import RelatedProducts from './_components/RelatedProducts'
import { allProducts } from '@/lib/globals'
import AddToCart from '../_components/AddToCart'

import uniqueCart from '@/hooks/useCart'

const page = ({params}: {params:{id:string}}) => {

    const productId = parseInt(params.id)
    const getProductDataById = (id:number) =>{
        const gottenProduct = allProducts.find(eachProductId => eachProductId.id === id)
        return gottenProduct
    }

    const [productDetail, setProductDetail] = React.useState({} as ProductType)
    React.useEffect(() => {
        const fetchData = () => {
            const productDetail = getProductDataById(productId)
            setProductDetail(productDetail as ProductType)     
        }
        fetchData()
    },[])
    
    const cart = uniqueCart()

    
  return (
    <section className='py-7'>
        {Object.entries(productDetail).length > 0 ? 
        <div className='flex px-10 gap-10 md:flex-nowrap flex-wrap'>
            <div className='md:basis-1/2 w-full'>
                <Image src={productDetail.image} width={500} height={100} alt='product' className='w-full'/>
            </div>
            <div className='md:basis-1/2 space-y-5 pr-10'>
                <h2 className='text-3xl font-bold'>{productDetail.title}</h2>
                <div className='text-sm space-x-2 item-center flex'>
                    <span className='line-through opacity-60'>{productDetail.previousPrice ? 'N' + productDetail.previousPrice.toFixed(2) : ''}</span>
                    <span className='text-blue-500'>N{productDetail.currentPrice.toFixed(2)}</span>
                    {cart.confirmIfItemInCart(productDetail.id) && 
                    <span className='text-[9px] bg-black text-white p-1 rounded-md'>N{Number(cart.getCurrentQuantity(productDetail.id)) * Number(productDetail.currentPrice.toFixed(2))}</span>
                    }
                </div>
                <div className='flex items-center gap-x-3'>
                    {cart.confirmIfItemInCart(productDetail.id) && 
                        <div className=' space-x-2'>
                            <button className='border rounded-full px-1' onClick={()=>cart.decreaseQuantity(productDetail.id)}>-</button>
                            <span>{cart.getCurrentQuantity(productDetail.id)}</span>
                            <button className='border rounded-full px-1' onClick={()=>cart.increaseQuantity(productDetail.id)}>+</button>
                        </div>
                    }
                    
                    <AddToCart product={productDetail} quantity={1} addToCartFunction={cart.addItem}  removeFromCartFunction={cart.removeItem} isAdded={cart.confirmIfItemInCart}/>
                </div>
                <div>
                    <p className='leading-relaxed'>{productDetail.details}.</p>
                </div>
            </div>
        
        </div>
        :
        <p>Loading...</p>
        }
        <div>
            <RelatedProducts/>
        </div>

    </section>
  )
}

export default page
