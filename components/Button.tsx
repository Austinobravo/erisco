import { LucideIcon, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
interface Props{
    bgColor?: string
    border?: string
    icon: LucideIcon
    title: string
    href: string
}
const Button = ({bgColor,href, border,icon:Icon, title}:Props) => {
  return (
    <div>
        <Link href={href} className={`${border ? border : ''} py-2 w-fit items-center px-4 flex text-white ${bgColor ? bgColor : 'bg-green-500'} `}><Icon size={15} className='mr-1'/>{title}</Link>
    </div>
  )
}

export default Button
