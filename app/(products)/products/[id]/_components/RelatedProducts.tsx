import Button from '@/components/Button'
import { allProducts } from '@/lib/globals'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RelatedProducts = () => {
    // React.useEffect(()=> {

    // },[])
  return (
    <section >
      <h4 className='py-3 font-bold text-center'>Related Products</h4>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-3 w-fit mx-auto '>
        {allProducts.map((product, index) => (
            <div key={index} className='flex shadow-2xl gap-2 p-3 h-fit w-80 rounded-md  '>
                    <Link href={`/products/${product.id}`} >
                        <Image src={product.image} width={100} height={100} alt={product.title} />
                    </Link>
                    <div className='space-y-2'>
                        <Link href={`/products/${product.id}`} >
                            <h3 className='font-bold'>{product.title}</h3>
                        </Link>
                        <div className='text-sm'>
                            <span className='mr-1 line-through opacity-60'>{product.previousPrice ? "N" + product.previousPrice + ".00" : ''}</span>
                            <span className='text-blue-500'>N{product.currentPrice}.00</span>
                        </div>
                        <div>
                            <Button href='' title='Add To Cart' icon={ShoppingBag} />

                        </div>
                    </div>

            </div>

        ))}

      </div>
    </section>
  )
}

export default RelatedProducts
