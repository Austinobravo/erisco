import Button from '@/components/Button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const AboutHero = () => {
  return (
    <section className='text-center md:py-28 py-16 space-y-5 px-10'>
        <h1 className='font-bold text-sm opacity-60'>About Us</h1>
        <h2 className='md:text-5xl text-4xl font-bold md:px-20 px-0 leading-snug'>Taste the Richness when locality meets quality on your taste buds.</h2>
        <p className='text-sm opacity-80'>Erisco Food Limited is the leading indigenous manufacturer of food products in Nigeria.</p>
        <div className='flex justify-center'>
            <Button title='Contact Us' href='' icon={ArrowRight} />
        </div>
    </section>
  )
}

export default AboutHero
