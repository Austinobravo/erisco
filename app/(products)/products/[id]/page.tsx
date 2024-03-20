import Button from '@/components/Button'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import RelatedProducts from './_components/RelatedProducts'

const page = () => {
  return (
    <section className='py-7'>
        <div className='flex px-10 gap-7'>
            <div className='w-full'>
                <Image src={`/erisco.jpg`} width={500} height={100} alt='product' className='w-full'/>
            </div>
            <div className='space-y-5 pr-10'>
                <h2 className='text-3xl font-bold'>Erisco Sugar Cubes</h2>
                <div className='text-sm'>
                    <span className='mr-1 line-through opacity-60'>N250.00</span>
                    <span className='text-blue-500'>N200.00</span>
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
                    <p className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptates ut cum libero incidunt aspernatur, molestias, et placeat cupiditate culpa unde adipisci accusamus ullam velit esse? Exercitationem odit doloribus iste.</p>
                </div>
            </div>
        
        </div>
        <div>
            <RelatedProducts/>
        </div>

    </section>
  )
}

export default page
