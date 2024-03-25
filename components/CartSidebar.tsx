import {allProducts} from '@/lib/globals'
import React from 'react'
import { useSession } from 'next-auth/react'
import CartProducts from './cartProducts'
import CartButton from './cartButton'
import { getAllProductsInUserCart } from '@/lib/getDetails'
import Link from 'next/link'
interface Props{
    toggleCart: () => void
}

const CartSidebar = ({toggleCart}: Props) => {
   
    const {data:session} = useSession()
    const userId = session?.user.id
    const storedSelectedProducts = localStorage.getItem('selectedProductsInCart');
    const parsedSelectedProducts = storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];

    const [selectedProductsInCart, setSelectedProductsInCart] = React.useState<any[]>(parsedSelectedProducts);

    const productsInCart = allProducts.filter((product) => selectedProductsInCart.find((cartProduct) => product.id === cartProduct.id))

     const updateProductQuantityInCart = (id:number) => {
        calculateTotalValueInUniqueProduct()
        const isProductInCart = findProductInCart(id)
        return isProductInCart?.quantity
        
    }

    const addProductToCart = (id:number) => {
        const existingProduct = findProductInCart(id)
        
        if(existingProduct === undefined){
            setSelectedProductsInCart([...selectedProductsInCart, {id, quantity: 1} ])
            
        }else{
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.id === id ? {...product, quantity: product.quantity + 1} : product
                )
            );
        }
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        updateProductQuantityInCart(existingProduct.id)
        
    };
    
    const subtractProductToCart = (id:number) => {
        const existingProduct= findProductInCart(id)
        if (existingProduct.quantity === 0){
            return;
        }else{
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.id === id ? {...product, quantity: product.quantity - 1} : product
                )
            );
        }
        
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        updateProductQuantityInCart(existingProduct.id)
        
    
    }
    
     const calculateTotalValueInUniqueProduct = () => {
         const totalValue = productsInCart.map((product) => product.currentPrice).reduce((total, nextNumber) => nextNumber + total, 0)
        return totalValue.toFixed(2)
    }

     const calculateTotalItemsInCart = () => {
        const totalAmount = selectedProductsInCart.map((product) => {
            const {quantity, id} = product
            const uniqueProduct = productsInCart.find((product) => product.id === id)
            return (
                quantity * uniqueProduct?.currentPrice!
            )
        }).reduce((total, nextNumber) => nextNumber + total, 0)

        return totalAmount.toFixed(2) 
    }
    
     const findProductInCart = (id:number) =>{
        return selectedProductsInCart.find((eachProduct) => eachProduct.id === id)
    }
    React.useEffect(()=>{
        const fetchData = async () => {
            const uniqueUserProducts = await getAllProductsInUserCart(userId)
            if(parsedSelectedProducts.length > 0){
                setSelectedProductsInCart(parsedSelectedProducts)   
            }else{
                setSelectedProductsInCart(uniqueUserProducts)
            }
        }
        fetchData()
    },[])

  return (
    <div className='!h-screen fixed top-0 right-0 bg-white border z-50 w-96 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Shopping cart</h2>
            <CartButton toggle={toggleCart}/>
        </div>
        <div className='overflow-y-auto h-full pb-28'>
            <CartProducts toggle={toggleCart} addProductToCart={addProductToCart} subtractProductToCart={subtractProductToCart} updateProductQuantityInCart={updateProductQuantityInCart} productsInCart={productsInCart}/>
           
        </div>
        <div className='absolute z-20 bottom-0 bg-white w-full pr-5 space-y-2'>
            <div className='flex justify-between  items-center'>
                <h3>Subtotal:</h3>
                <p>N{calculateTotalItemsInCart()}</p>
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
