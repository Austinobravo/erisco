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
interface Props{
    toggleCart: () => void
}

const CartSidebar = ({toggleCart}: Props) => {
   
    const {data:session} = useSession()
    const userId = session?.user.id
    const storedSelectedProducts = localStorage.getItem('selectedProductsInCart');
    const parsedSelectedProducts = storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
    const checkIfUserInLocalStorage = () => {
        const getUser = parsedSelectedProducts.find((user: { userId: number | undefined }) => user.userId === userId)
        if (getUser){
            return parsedSelectedProducts
        }else{
            return []
        }
        
    }
    const [selectedProductsInCart, setSelectedProductsInCart] = React.useState<any[]>(checkIfUserInLocalStorage());

    const productsInCart = allProducts.filter((product) => selectedProductsInCart.find((cartProduct) => product.id === cartProduct.productId))

     const updateProductQuantityInCart = (id:number) => {
        calculateTotalValueInUniqueProduct()
        const isProductInCart = findProductInCart(id)
        return isProductInCart?.quantity
        
    }

    const addProductToCart = (id:number) => {
        const existingProduct = findProductInCart(id)
        
        if(existingProduct === undefined){
            setSelectedProductsInCart(prevSelectedProducts => [...prevSelectedProducts, {id, quantity: 1} ])
            
        }else{
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.productId === id ? {...product, quantity: product.quantity + 1} : product
                )
            );
        }
        
        updateProductQuantityInCart(existingProduct.id)
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        
    };
    
    const subtractProductToCart = (id:number) => {
        const existingProduct= findProductInCart(id)
        if (existingProduct.quantity <= 1){
            deleteItemInCart(id)
        }else{
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.productId === id ? {...product, quantity: product.quantity - 1} : product
                )
            );
        }
        
        updateProductQuantityInCart(existingProduct.id)
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        
    
    }
    
     const calculateTotalValueInUniqueProduct = () => {
         const totalValue = productsInCart.map((product) => product.currentPrice).reduce((total, nextNumber) => nextNumber + total, 0)
        return totalValue.toFixed(2)
    }

     const calculateTotalAmountOfItemsInCart = () => {
        const totalAmount = selectedProductsInCart.map((product) => {
            const {quantity, productId} = product
            const uniqueProduct = productsInCart.find((product) => product.id === productId)
            return (
                quantity * uniqueProduct?.currentPrice!
                )
            }).reduce((total, nextNumber) => total + nextNumber,0)

        return totalAmount.toFixed(2)
    }
    
     const findProductInCart = (id:number) =>{
        return selectedProductsInCart.find((eachProduct) => eachProduct.productId === id)
    }

    const deleteItemInCart = async (id:number) => {
        try{
            const response = await deleteUniqueItemFromCart(userId, id)
            removeUniqueProductFromLocalStorage(id)
            location.reload()

        }catch(error:any){
            toast.error(`An error occured`)
        }
    }

    const removeUniqueProductFromLocalStorage = (id: number) => {
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProductsInCart') as any);
        const newData = storedSelectedProducts.filter((product:any) => product.productId !== id)
        localStorage.setItem("selectedProductsInCart", JSON.stringify(newData))
    } 

    const productWithUpdatedPrice = productsInCart.map((product) => {
        const localStorageProducts = parsedSelectedProducts.find((item:any) => item.productId === product.id)
        if(localStorageProducts){
            return {
                ...product,
                currentPrice: localStorageProducts.quantity * product.currentPrice
            }
        }else{
            return product
        }
    })
    React.useEffect(() => {
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart));
    }, [selectedProductsInCart]);


  return (
    <div className='!h-screen fixed top-0 right-0 bg-white border z-50 w-96 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Shopping cart</h2>
            <CartButton toggle={toggleCart}/>
        </div>
        <div className='overflow-y-auto h-full pb-28'>
            <CartProducts toggle={toggleCart} addProductToCart={addProductToCart} subtractProductToCart={subtractProductToCart} updateProductQuantityInCart={updateProductQuantityInCart} productsInCart={productsInCart} deleteItemInCart={deleteItemInCart}/>
           
        </div>
        <div className='absolute z-20 bottom-0 bg-white w-full pr-5 space-y-2'>
            <div className='flex justify-between  items-center'>
                <h3>Subtotal:</h3>
                <p>N{calculateTotalAmountOfItemsInCart()}</p>
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
