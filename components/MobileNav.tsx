'use client'
import { AlignRight, ShoppingCart, SquareX, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartSidebar from './CartSidebar'


const navLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Products',
      href: '/products'
    },
    {
      name: 'Pre Order',
      href: '/preorder'
    },
  ]

const MobileNav = () => {
    const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false)
    const [isCartToggled, setIsCartToggled] = React.useState<boolean>(false)

  return (
    <>
    <div className='px-10 py-5 fixed top-0 bg-white z-20 w-full '>
        <div className='flex items-center justify-between'>
            <div>
                <Image src={`https://eriscofoodsltd.com.ng/images/logo.png`} width={100} height={100} alt='logo'/>
            </div>
            <div className='flex gap-x-5'>
                <div className='flex items-center gap-2 text-xs'>
                    <User size={15}/>
                    <div className='relative cursor-pointer' onClick={()=>setIsCartToggled(!isCartToggled)}>
                        <ShoppingCart size={20}/>
                        <span className='absolute top-0 right-0 -mt-2 -mr-2 px-1 bg-green-500 rounded-full text-white text-xs font-bold'>1</span>
                    </div>
                </div>
                <div onClick={()=>setIsMenuToggled(!isMenuToggled)} className='cursor-pointer'>
                    {isMenuToggled ?
                    <SquareX size={35}/>
                    :
                    <AlignRight size={35}/>
                    }
                </div>
            </div>
        </div>
        {isMenuToggled && 
            <div className='text-xs'>
                <ul className='flex flex-col shadow mr-5 p-2 space-y-2 font-semibold'>
                    {navLinks.map((navLink, index) => (
                        <li key={index} className={`${navLink.name === 'Pre Order' && 'bg-green-500 px-2 rounded-md py-1 text-white w-fit  '}`}>
                            <Link href={navLink.href}>
                                {navLink.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        }

      
    </div>
    {isCartToggled && 
        <div className={``} >
          <CartSidebar toggleCart={()=>setIsCartToggled(!isCartToggled)}/>
        </div>
      }
    </>
  )
}

export default MobileNav
