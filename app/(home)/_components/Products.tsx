import Image from 'next/image'
import React from 'react'

const Products = () => {
  return (
    <section className='bg-slate-100 p-10'>
        <div className='text-center text-3xl space-y-3 text-blue-500 font-semibold pb-10'>
            <h2>Our Brands</h2>
            <p className='text-sm'>The Erisco, Ricgiko and Nagiko are 3 great brands from Erisco Foods Limited dedicated to producing a wide range of healthy and consumable food products ranging from tomato pastes, tomato mix, beverages, seasoning cubes, milk and chocolate cubes across several stores and markets in Nigeria.</p>
        </div>
        <div className='flex items-center gap-x-3 justify-center w-full'>
            <div>
                <Image src={`/erisco.jpg`} width={200} height={100} alt='erisco' className='w-full h-40 hover:h-80 transition-all duration-300'/>
            </div>
            <div>
                <Image src={`/nagiko.jpg`} width={200} height={100} alt='nagiko' className='w-full '/>
            </div>
            <div>
                <Image src={`/ricgiko.jpg`} width={200} height={100} alt='ricgiko' className='w-full h-40 hover:h-80 transition-all duration-300'/>
            </div>

        </div>
      
    </section>
  )
}

export default Products
