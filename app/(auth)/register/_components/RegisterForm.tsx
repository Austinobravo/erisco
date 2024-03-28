'use client'
import axios from 'axios'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const RegisterForm = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
    const router = useRouter()
    const submitUser =  async (event:React.FormEvent) => {
        event.preventDefault()

        const form = new FormData(event.currentTarget as any)
        const username = form.get('username')
        const email = form.get('email')
        const phone = form.get('phone')
        const password = form.get('password')

        try{
            setIsSubmitting(true)
            const response = await axios.post('/api/user', {username, email, phone, password})
            toast.success(`${response.data.message}`)
            return router.push('/login')
        }catch(error:any){
            toast.error(`${error.response.data.message}`)

        }finally{
            setIsSubmitting(false)
        }

    }
    
  return (
    <form className='mx-auto space-y-6 text-sm md:w-fit w-full' onSubmit={submitUser}>
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
            
            <div >
                <button type='submit' className='bg-amber-500 p-2 md:w-[500px] w-full text-white text-center flex justify-center font-bold'>{isSubmitting ? <Loader2 className='animate-spin'/> : 'Register'}</button>
            </div>
            <span className='text-sm'>You have an account? <Link href={`/login`} className='text-xs text-green-500'>Login</Link></span>
        </form>
  )
}

export default RegisterForm
