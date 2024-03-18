import React from 'react'
import Button from './Button'
import { Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <section>
        <div className='bg-blue-500 p-10 space-y-8'>
            <div className='text-center flex justify-center text-white text-3xl'>
                <h3 className='w-[800px] font-bold'>Join thousands of companies,business owners & constumers who trust Erisco</h3>
            </div>
            <div className='flex justify-center gap-x-2'>
                <Button title='Call Us Now'icon={Phone} href=''/>
                <Button title='Reach Us On Mail'icon={Mail} bgColor='bg-blue-500' border='border' href='' />
            </div>
        </div>
        <div>
            
        </div>
      
    </section>
  )
}

export default Footer
