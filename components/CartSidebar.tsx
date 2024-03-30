import {allProducts} from '@/lib/globals'
import React from 'react'
import { useSession } from 'next-auth/react'
import CartProducts from './cartProducts'
import CartButton from './cartButton'
import { deleteUniqueItemFromCart, getAllProductsInUserCart } from '@/lib/getDetails'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Checkout from './Checkout'
import uniqueCart from '@/hooks/useCart'
interface Props{
    toggleCart: () => void
}

const CartSidebar = ({toggleCart}: Props) => {
   
    const {data:session} = useSession()
    const userId = session?.user.id
    
    
    const cart = uniqueCart()
    const productsInCart = allProducts.filter((product) => cart.cartItems.find((cartProduct) => product.id === cartProduct.item.id))
    const productWithUpdatedPrice = productsInCart.map((product) => {
        const localStorageProducts = cart.cartItems.find((item:any) => item.item.id === product.id)
        if(localStorageProducts){
            return {
                ...product,
                currentPrice: localStorageProducts.quantity * product.currentPrice
            }
        }else{
            return product
        }
    })


  return (
    <div className='!h-screen fixed top-0 right-0 bg-white border z-50 w-96 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Shopping cart</h2>
            <CartButton toggle={toggleCart}/>
        </div>
        <div className='overflow-y-auto h-full pb-28'>
            <CartProducts toggle={toggleCart} addProductToCart={cart.increaseQuantity} subtractProductToCart={cart.decreaseQuantity} updateProductQuantityInCart={cart.getCurrentQuantity} productsInCart={cart.cartItems} deleteItemInCart={cart.removeItem}/>
           
        </div>
        <div className='absolute z-20 bottom-0 bg-white w-full pr-5 space-y-2'>
            <div className='flex justify-between  items-center'>
                <h3>Subtotal:</h3>
                <p>N{(cart.totalAmountOfItemsInCart()).toFixed(2)}</p>
            </div>
            {/* <div className='border-cyan-500 border text-sm  rounded-md py-2 text-center'>
                <Link href={``}>View Cart</Link>
            </div> */}
            <div className='bg-green-500 text-white text-sm py-2 text-center rounded-md'>
                <Checkout productsIds={productWithUpdatedPrice} userId={userId}/>
            </div>
        </div>
      
    </div>
  )
}

export default CartSidebar
