import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const WhoWeAre = () => {
  return (
    <section className='px-10 py-20'>
        <div className='text-center text-3xl text-blue-500 font-semibold pb-10'>
            <h2>Who We Are</h2>
        </div>
        <div className='flex gap-x-5'>
            <div className='md:basis-1/2 w-full'>
                <Image src={`/who.jpg`} width={100} height={100} alt='whoWeAre' className='w-full rounded-full'/>
            </div>
            <div className='md:basis-1/2 pt-20 space-y-4'>
                <h2 className='text-4xl font-bold'>Erisco Food Limited</h2>
                <p>Erisco Food Limited is the leading indigenous manufacturer of food products in Nigeria, We have served the country for over 40 years and we are committed to producing the best quality and healthy food products for Nigerians at affordable prices.</p>
                <div className='space-y-2'>
                    <div className='flex items-center gap-x-2 text-blue-500 text-sm'>
                        <Check/>
                        <span>50% + returning customers.</span>
                    </div>
                    <div className='flex items-center gap-x-2 text-blue-500 text-sm'>
                        <Check/>
                        <span>100+ positive feedbacks.</span>
                    </div>
                    <div className='flex items-center gap-x-2 text-blue-500 text-sm'>
                        <Check/>
                        <span>100% transparency - Money back guarantee.</span>
                    </div>

                </div>
            </div>
        </div>
        

    </section>
  )
}

export default WhoWeAre
