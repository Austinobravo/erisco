'use client'
import React from 'react'
import ChangeNavigation from '../_components/changeNavigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

const page = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState<boolean>(false)
    
  return (
    <div className='flex flex-col space-y-7 py-20 justify-center items-center px-10 '>
        <div>
            <ChangeNavigation/>
        </div>
        <form className='space-y-6 text-sm w-full'>
            <div>
                <label htmlFor='username'></label>
                <input type='text' id='username' name='username' placeholder='Username *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full'/>
            </div>
            <div>
                <label htmlFor='email'></label>
                <input type='email' id='email' name='email' placeholder='Email address *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full'/>
            </div>
            <div className='relative'>
                <label htmlFor='password'></label>
                <input type={isPasswordToggled ? 'text' : 'password'} id='password' name='password' placeholder='Password *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full'/>
                <span className='absolute right-5 top-3 cursor-pointer' onClick={()=> setIsPasswordToggled(!isPasswordToggled)}>
                    {isPasswordToggled ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                    }
                </span>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                    <input type='checkbox' id='remember' name='remember' className='cursor-pointer'/>
                    <span> Accept Terms and Conditions</span>
                </div>
                
            </div>
            
            <div className='bg-amber-500 p-2 md:w-[500px] w-full text-white text-center font-bold'>
                <button>Register</button>
            </div>
            <span className='text-sm'>You have an account? <Link href={`/login`} className='text-xs text-green-500'>Login</Link></span>
        </form>
      
    </div>
  )
}

export default page
