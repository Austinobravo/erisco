import Image from 'next/image'
import React from 'react'

const CeoWords = () => {
  return (
    <section>
        <div className='flex flex-wrap md:flex-nowrap'>
            <div className='w-full md:basis-1/2'>
                <Image src={`/ceo1.jpg`} width={200} height={100} alt='ceo' className='w-full'/>
                <div>Chief Dr. Eric Umeofia, NPOM, MFR, (Ikukuoma Amichi)<span>CEO</span></div>
            </div>
            <div className='md:basis-1/2'>
                <h3>Words From Our CEO</h3>
                <p>We believe that Nigeria has the potential to be a global leader in manufacturing, and we are proud to play a role in helping our local businesses succeed.As we applaud the outstanding achievements of our distributors and express gratitude to our customers, let us look forward to a future where the Made-in-Nigeria label continues to shine brightly on the global stage.</p>
            </div>
        </div>
    </section>
  )
}

export default CeoWords
