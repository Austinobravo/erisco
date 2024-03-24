'use client'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const RegisterForm = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState<boolean>(false)
    
  return (
    <form className='mx-auto space-y-6 text-sm md:w-fit w-full'>
            <div>
                <label htmlFor='username'></label>
                <input type='text' id='username' name='username' placeholder='Username *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
            </div>
            <div>
                <label htmlFor='email'></label>
                <input type='email' id='email' name='email' placeholder='Email address *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
            </div>
            <div>
                <label htmlFor='phone'></label>
                <input type='number' id='phone' name='phone' placeholder='Phone number *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
            </div>
            <div className='relative'>
                <label htmlFor='password'></label>
                <input type={isPasswordToggled ? 'text' : 'password'} id='password' name='password' placeholder='Password *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
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
  )
}

export default RegisterForm
