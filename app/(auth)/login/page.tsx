'use client'
import Link from 'next/link'
import React from 'react'
import ChangeNavigation from '../_components/changeNavigation'
import { Eye, EyeOff } from 'lucide-react'

const page = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState<boolean>(false)
    
  return (
    <div className='flex flex-col space-y-7 py-20 justify-center items-center px-10'>
        <div>
            <ChangeNavigation/>
        </div>
        <form className='mx-auto space-y-6 text-sm md:w-fit w-full'>
            <div>
                <label htmlFor='email'></label>
                <input type='text' id='email' name='email' placeholder='Email address *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
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
                    <span> Remember me</span>
                </div>
                <Link href={``} className='text-xs underline'>
                    Lost Password
                </Link>
            </div>
            <div className='bg-amber-500 p-2 md:w-[500px] w-full text-white text-center font-bold'>
                <button>Log In</button>
            </div>
            <span className='text-sm'>Don&apos;t have an account yet? <Link href={`/register`} className='text-xs text-green-500'>Register</Link></span>
        </form>
      
    </div>
  )
}

export default page
