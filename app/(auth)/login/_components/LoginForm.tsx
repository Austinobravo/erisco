'use client'
import { Eye, EyeOff, Loader2, Router } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const LoginForm = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const router = useRouter()
    const submitLoginForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget as any)
        const email = data.get('email')
        const password = data.get('password')
        try{
            setIsSubmitting(true)

            const response =await signIn('credentials',{
                redirect:false,
                email: email,
                password: password,
                callbackUrl: callbackUrl
            })

            if(response?.error) return toast.error(response.error)
            if(response?.ok){
                toast.success('Login Successful')
                return router.push('/products')
            }
        }catch(error){
            toast.error(`${error}`)
        }finally{
            setIsSubmitting(false)
        }
    }
  return (
    <form className='mx-auto space-y-6 text-sm md:w-fit w-full' onSubmit={submitLoginForm}>
            <div>
                <label htmlFor='email'></label>
                <input type='email' id='email' name='email' placeholder='Email address *' className='border-2 outline-none focus:border-amber-500 p-2 md:w-[500px] w-full' required/>
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
            <div >
                <button type='submit' className='bg-amber-500 p-2 md:w-[500px] w-full text-white text-center flex justify-center font-bold'>{isSubmitting ? <Loader2 className='animate-spin'/> : 'Log in'}</button>
            </div>
            <span className='text-sm'>Don&apos;t have an account yet? <Link href={`/register`} className='text-xs text-green-500'>Register</Link></span>
        </form>
  )
}

export default LoginForm
