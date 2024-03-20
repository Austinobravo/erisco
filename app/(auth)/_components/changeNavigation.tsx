'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ChangeNavigation = () => {
    const pathname = usePathname()
  return (
    <div className='flex gap-x-10 text-xl'>
        <Link href={`/login`} className={`${pathname.includes('/login') ? 'border-b-2 pb-1 border-amber-500 text-black' : 'text-black/50'} `}>
            Login
        </Link>
        <Link href={`/register`} className={`${pathname.includes('/register') ? 'border-b-2 pb-1 border-amber-500 text-black' : 'text-black/50'} `}>
            Register
        </Link>
      
    </div>
  )
}

export default ChangeNavigation
