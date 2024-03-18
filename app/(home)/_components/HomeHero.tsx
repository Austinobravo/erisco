import Button from '@/components/Button'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const HomeHero = () => {
  return (
    <section>
        <div className='flex bg-black w-full gap-5 h-[500px]'>
            <div className='md:basis-1/2 flex flex-col py-32 relative px-10 space-y-5'>
                <Image src={`/leaf.webp`} width={200} height={100} alt='leaf' className='absolute right-0 top-10' />
                <h2 className='text-5xl font-bold text-blue-500 leading-snug'>Still Looking for the right place to get your food Items.</h2>
                <p className='text-white'>Treat your taste buds to quality.</p>
                <Button icon={Phone} title={'Contact Us'} href=''/>

            </div>
            <div className='md:basis-1/2'>
                <Image src={`/hero.jpg`} width={200} height={100} alt='hero' className='w-full  h-[500px]'/>
            </div>

        </div>
      
    </section>
  )
}

export default HomeHero
