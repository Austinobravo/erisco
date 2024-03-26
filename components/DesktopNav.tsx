'use client'
import { LogOut, Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartSidebar from './CartSidebar'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

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

const DesktopNav = () => {
  const [isCartToggled, setIsCartToggled] = React.useState<boolean>(false)
  const [totalNumberOfItemsInCart, setTotalNumberOfItemsInCart] = React.useState<number>(0)
  const pathname = usePathname()
  const {data:session} = useSession()


  const storedSelectedProducts = localStorage.getItem('selectedProductsInCart');
  const parsedSelectedProducts = storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
  React.useEffect(()=>{
    const fetchData = () => {
      const totalValue = parsedSelectedProducts.map((value:any) => value.quantity).reduce((total:number, nextNumber:number) => total + nextNumber, 0)
      setTotalNumberOfItemsInCart((prev)=> {return prev=totalValue})
    }
    fetchData()
  },[parsedSelectedProducts,totalNumberOfItemsInCart]) 
  return (
    <>
      <div className='flex justify-between fixed bg-white z-20 px-10 w-full py-5 items-center'>
        <div className='flex items-center gap-5'>
          <Link href={`/`}>
              <Image src={`https://eriscofoodsltd.com.ng/images/logo.png`} width={100} height={100} alt='logo'/>
          </Link>
          <div>
            <form className='flex items-center shadow p-2 rounded-md space-x-2 text-xs'>
              <div>
                <button type='submit'><Search size={15}/></button>
              </div>
              <div>
                <label htmlFor='search'></label>
                <input type='text' id='search' name='search' placeholder='Search products...' className='outline-none'/>
              </div>
              <div>
                <label htmlFor='category'></label>
                <select className='outline-none cursor-pointer'>
                  <option>All Category</option>
                  <option>Tomatoes</option>
                  <option>Cubes</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-xs'>
            <ul className='flex space-x-4 items-center'>
                {navLinks.map((navLink, index) => (
                  <li key={index} className={`${navLink.name === 'Pre Order' && 'bg-green-500 px-2 rounded-md py-1 text-white '} ${pathname === navLink.href && 'font-bold text-blue-500'}`} >
                    <Link href={navLink.href}>
                        {navLink.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className='flex items-center gap-2 text-xs'>
            {session?.user ?
              <div className='text-xs flex flex-col items-center cursor-pointer' onClick={()=>signOut({redirect:false, callbackUrl:'/'})}>
                <LogOut color='red' size={10}/>
                <span className='font-semibold'>{session.user.username}</span>      
              </div>
            :
            <Link href={`/register`}>
              <User size={15}/>
            </Link>
            }
            <div className='relative cursor-pointer' onClick={()=>setIsCartToggled(!isCartToggled)}>
              <ShoppingCart size={20}/>
              <span className='absolute top-0 right-0 -mt-2 -mr-2 px-1 bg-green-500 rounded-full text-white text-xs font-bold'>{totalNumberOfItemsInCart}</span>
            </div>
          </div>

        </div>
        
      </div>
      {isCartToggled && 
        <div className={``} >
          <CartSidebar toggleCart={()=>setIsCartToggled(!isCartToggled)}/>
        </div>
      }
    </>
  )
}

export default DesktopNav
