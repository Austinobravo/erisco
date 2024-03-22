
import { useCart } from '@/lib/cart'
import {  addProductToCart, allProducts, subtractProductToCart, updateProductQuantityInCart ,selectedCartProduct} from '@/lib/globals'
import { ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props{
    toggleCart: () => void
}

const CartSidebar =  ({toggleCart}: Props) => {
    // const {selectedProductsInCart, addProductToCart} = useCart()
    // React.useEffect(() => {
    //     console.log("selectedProductinCArtComponent", selectedProductsInCart)
    // }, [selectedProductsInCart])
    
    const productsInCart = allProducts.filter((product) => selectedCartProduct.find((cartProduct) => product.id === cartProduct.id))
    console.log("allPr", productsInCart)
    // const productsInCart:any = []
    console.log("allPr", productsInCart)
  
  return (
    <div className='!h-screen fixed top-0 right-0 bg-white border z-50 w-96 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Shopping cart</h2>
            <X onClick={toggleCart} className='bg-red-500 text-white rounded-md cursor-pointer' strokeWidth={2} />
        </div>
        <div className='overflow-y-auto h-full pb-28'>
            {productsInCart.length > 0 ?
                productsInCart.map((product:any, index:any) => (
                    <div key={index} className='w-full border rounded-md p-2 my-5 space-y-3'>
                        <div title='Delete' className='ml-auto w-fit cursor-pointer'>
                            <X/>
                        </div>
                        <div className='flex items-center justify-between '>
                            <div className='basis-1/2 pl-3 text-sm space-y-2'>
                                <h2 className='font-semibold'>{product.title}</h2>
                                <span className='text-xs opacity-80'>{updateProductQuantityInCart(product.id)} x N{product.currentPrice.toFixed(2)}</span>
                                <div className=' space-x-2'>
                                    <button className='border rounded-full px-1' onClick={()=>subtractProductToCart(product.id)}>-</button>
                                    <span>{updateProductQuantityInCart(product.id)}</span>
                                    <button className='border rounded-full px-1' onClick={()=>addProductToCart(product.id)}>+</button>
                                </div>
                            </div>
                            <div className='basis-1/2 '>
                                <Image src={product.image} width={100} height={100} alt={product.title} className='w-fit ml-auto rounded-md'/>
                            </div>

                        </div>
                    </div> 

                ))
            :
                <div className='flex flex-col justify-center items-center pt-10 space-y-4'>
                    <ShoppingBag color='#bbb' size={50}/>
                    <p className='text-sm'>Your Shopping Cart is empty</p>
                    <span className='text-xs'>Try Shopping <Link href={`/products`} onClick={toggleCart} className='text-blue-500 font-bold'>now</Link></span>
                </div> 
            }
        </div>
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
