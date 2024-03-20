import { LucideIcon, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { ComponentProps } from 'react'


export type Props = ComponentProps<'a'> & {
    bgColor?: string
    border?: string
    icon: LucideIcon
    title: string
    href: string
}
const Button = ({bgColor,href, border,icon:Icon, title, ...otherTags}:Props) => {
  return (
    <div>
        <Link href={href} {...otherTags} className={`${border ? border : ''} py-2 w-fit items-center md:text-base text-sm md:px-4 px-2 flex text-white ${bgColor ? bgColor : 'bg-green-500'} `}><Icon size={15} className='mr-1'/>{title}</Link>
    </div>
  )
}

export default Button
