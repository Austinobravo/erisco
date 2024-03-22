'use client'
import Button from '@/components/Button'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import RelatedProducts from './_components/RelatedProducts'
import { usePathname, useSearchParams } from 'next/navigation'
import { allProducts } from '@/lib/globals'

const page = ({params}: {params:{id:string}}) => {
    const productId = parseInt(params.id)
    const getProductDataById = (id:number) =>{
        const gottenProduct = allProducts.filter(eachProductId => eachProductId.id === id)
        return gottenProduct
    }

    const [productDetail, setProductDetail] = React.useState<any[]>([])
    React.useEffect(() => {
        const fetchData = () => {
             const productDetail = getProductDataById(productId)
             setProductDetail(productDetail)
        }
        fetchData()
    },[])
  return (
    <section className='py-7'>
        {productDetail.length > 0 ? 
        <div className='flex px-10 gap-10 md:flex-nowrap flex-wrap'>
            <div className='md:basis-1/2 w-full'>
                <Image src={productDetail[0].image} width={500} height={100} alt='product' className='w-full'/>
            </div>
            <div className='md:basis-1/2 space-y-5 pr-10'>
                <h2 className='text-3xl font-bold'>{productDetail[0].title}</h2>
                <div className='text-sm'>
                    <span className='mr-1 line-through opacity-60'>{productDetail[0].previousPrice ? 'N' + productDetail[0].previousPrice.toFixed(2) : ''}</span>
                    <span className='text-blue-500'>N{productDetail[0].currentPrice.toFixed(2)}</span>
                </div>
                <div className='flex items-center gap-x-3'>
                    <div className=' space-x-2'>
                        <button className='border rounded-full px-1'>-</button>
                        <span>1</span>
                        <button className='border rounded-full px-1'>+</button>
                    </div>
                    <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                </div>
                <div>
                    <p className='leading-relaxed'>{productDetail[0].details}.</p>
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
