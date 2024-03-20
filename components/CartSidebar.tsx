
import { ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props{
    toggleCart: () => void
}
const CartSidebar = ({toggleCart}: Props) => {
  return (
    <div className='!h-screen fixed top-0 right-0 bg-white border z-50 w-96 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Shopping cart</h2>
            <X onClick={toggleCart} className='bg-red-500 text-white rounded-md cursor-pointer' strokeWidth={2} />
        </div>
        <div className='overflow-y-auto h-full pb-28'>
            <div className='w-full border rounded-md p-2 my-5 space-y-3'>
                <div title='Delete' className='ml-auto w-fit cursor-pointer'>
                    <X/>
                </div>
                <div className='flex items-center justify-between '>
                    <div className='basis-1/2 pl-3 text-sm space-y-2'>
                        <h2 className='font-semibold'>Nagiko Tin Tomato</h2>
                        <span className='text-xs opacity-80'>1 x N200.00</span>
                        <div className=' space-x-2'>
                            <button className='border rounded-full px-1'>-</button>
                            <span>1</span>
                            <button className='border rounded-full px-1'>+</button>
                        </div>
                    </div>
                    <div className='basis-1/2 '>
                        <Image src={`/nagiko.jpg`} width={100} height={100} alt='erisco' className='w-fit ml-auto rounded-md'/>
                    </div>

                </div>
            </div> 
        </div>
        {/* <div>
            <ShoppingBag/>
            <p>Your Shopping Cart is empty</p>
        </div> */}
        <div className='absolute z-20 bottom-0 bg-white w-full pr-5 space-y-2'>
            <div className='flex justify-between  items-center'>
                <h3>Subtotal:</h3>
                <p>N200.00</p>
            </div>
            <div className='border-cyan-500 border text-sm  rounded-md py-2 text-center'>
                <Link href={``}>View Cart</Link>
            </div>
            <div className='bg-green-500 text-white text-sm py-2 text-center rounded-md'>
                <Link href={``}>Checkout</Link>
            </div>
        </div>
      
    </div>
  )
}

export default CartSidebar
