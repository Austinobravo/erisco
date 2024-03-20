import Button from '@/components/Button'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { allProducts } from '@/lib/globals'

// const allProducts = [
//     {
//         id: 1,
//         image: '/erisco.jpg',
//         title: 'Erisco Packet Sugar Cubes',
//         previousPrice: 250.00,
//         currentPrice: 200.00,
//         details: 'The packet sugar cubes that supersedes other cubes.'
//     },
//     {
//         id: 2,
//         image: '/nagiko.jpg',
//         title: 'Nagiko Tin Tomato',
//         previousPrice: 150.00,
//         currentPrice: 100.00,
//         details: 'The tin tomato that supersedes other tomato paste.'
//     },
//     {
//         id: 3,
//         image: '/ricgiko.jpg',
//         title: 'Ricgiko Sachet Tomato ',
//         previousPrice: '',
//         currentPrice: 200.00,
//         details: 'The sachet tomato that supersedes other tomato paste.'
//     },
//     {
//         id: 4,
//         image: '/erisco.jpg',
//         title: 'Erisco Packet Sugar Cubes',
//         previousPrice: 250.00,
//         currentPrice: 200.00,
//         details: 'The packet sugar cubes that supersedes other cubes.'
//     },
//     {
//         id: 5,
//         image: '/nagiko.jpg',
//         title: 'Nagiko Tin Tomato',
//         previousPrice: 150.00,
//         currentPrice: 100.00,
//         details: 'The tin tomato that supersedes other tomato paste.'
//     },
//     {
//         id: 6,
//         image: '/ricgiko.jpg',
//         title: 'Ricgiko Sachet Tomato ',
//         previousPrice: '',
//         currentPrice: 200.00,
//         details: 'The sachet tomato that supersedes other tomato paste.'
//     },
// ]
const Products = () => {
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
                        <h3 className='font-bold'>{product.title}</h3>
                        <div className='text-sm'>
                            <span className='mr-1 line-through opacity-60'>{product.previousPrice ? "N" + product.previousPrice + ".00" : ''}</span>
                            <span className='text-blue-500'>N{product.currentPrice}.00</span>
                        </div>
                        <p className='text-xs '>{product.details}</p>
                        <Button href='' title='Add To Cart' icon={ShoppingBag}/>
                    </div>

                </div>
            ))}

        </div>
      
    </section>
  )
}

export default Products
