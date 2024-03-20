import Image from 'next/image'
import React from 'react'

const CeoWords = () => {
  return (
    <section className='py-10'>
        <div className='flex flex-wrap md:flex-nowrap gap-x-5'>
            <div className='w-full md:basis-1/2'>
                <Image src={`/ceo1.jpg`} width={200} height={100} alt='ceo' className='w-full rounded-md'/>
            </div>
            <div className='md:basis-1/2 pt-10 space-y-5 px-10'>
                <h3 className='md:text-3xl text-2xl font-bold text-blue-500'>Words From Our CEO</h3>
                <p className='leading-loose opacity-80 text-sm'>We believe that Nigeria has the potential to be a global leader in manufacturing, and we are proud to play a role in helping our local businesses succeed.As we applaud the outstanding achievements of our distributors and express gratitude to our customers, let us look forward to a future where the Made-in-Nigeria label continues to shine brightly on the global stage.</p>
                <div className='text-sm py-2 font-bold opacity-80'>Chief Dr. Eric Umeofia, NPOM, MFR, (Ikukuoma Amichi)</div>
            </div>
        </div>
    </section>
  )
}

export default CeoWords
