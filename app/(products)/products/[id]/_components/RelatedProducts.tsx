import Button from '@/components/Button'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RelatedProducts = () => {
  return (
    <section >
      <h4 className='py-3 font-bold text-center'>Related Products</h4>
      <div className='flex gap-x-3'>
        <div className='flex gap-5 shadow-2xl rounded-md p-5 '>
                <Link href={``}>
                    <Image src={`/nagiko.jpg`} width={100} height={100} alt={`nagiko`} className=''/>
                </Link>
                <div className='space-y-2'>
                    <h3 className='font-bold'>Nagiko</h3>
                    <div className='text-sm'>
                        <span className='mr-1 line-through opacity-60'></span>
                        <span className='text-blue-500'>N250.00</span>
                    </div>
                    <p className='text-xs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat neque, iure culpa, suscipit ratione eaque quisquam, velit repellendus architecto in temporibus sapiente eveniet dolorem ipsum natus beatae perferendis officiis laudantium.</p>
                    <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                </div>

        </div>
        <div className='flex gap-5 shadow-2xl rounded-md p-5 '>
                <Link href={``}>
                    <Image src={`/nagiko.jpg`} width={100} height={100} alt={`nagiko`} className=''/>
                </Link>
                <div className='space-y-2'>
                    <h3 className='font-bold'>Nagiko</h3>
                    <div className='text-sm'>
                        <span className='mr-1 line-through opacity-60'></span>
                        <span className='text-blue-500'>N250.00</span>
                    </div>
                    <p className='text-xs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat neque, iure culpa, suscipit ratione eaque quisquam, velit repellendus architecto in temporibus sapiente eveniet dolorem ipsum natus beatae perferendis officiis laudantium.</p>
                    <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                </div>

        </div>
        <div className='flex gap-5 shadow-2xl rounded-md p-5 '>
                <Link href={``}>
                    <Image src={`/nagiko.jpg`} width={100} height={100} alt={`nagiko`} className=''/>
                </Link>
                <div className='space-y-2'>
                    <h3 className='font-bold'>Nagiko</h3>
                    <div className='text-sm'>
                        <span className='mr-1 line-through opacity-60'></span>
                        <span className='text-blue-500'>N250.00</span>
                    </div>
                    <p className='text-xs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat neque, iure culpa, suscipit ratione eaque quisquam, velit repellendus architecto in temporibus sapiente eveniet dolorem ipsum natus beatae perferendis officiis laudantium.</p>
                    <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                </div>

        </div>
        <div className='flex gap-5 shadow-2xl rounded-md p-5 '>
                <Link href={``}>
                    <Image src={`/nagiko.jpg`} width={100} height={100} alt={`nagiko`} className=''/>
                </Link>
                <div className='space-y-2'>
                    <h3 className='font-bold'>Nagiko</h3>
                    <div className='text-sm'>
                        <span className='mr-1 line-through opacity-60'></span>
                        <span className='text-blue-500'>N250.00</span>
                    </div>
                    <p className='text-xs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat neque, iure culpa, suscipit ratione eaque quisquam, velit repellendus architecto in temporibus sapiente eveniet dolorem ipsum natus beatae perferendis officiis laudantium.</p>
                    <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                </div>

        </div>

      </div>
    </section>
  )
}

export default RelatedProducts
