'use client'
import Button from '@/components/Button'
import uniqueCart from '@/hooks/useCart'
import { deleteUniqueItemFromCart, getAllProductsInUserCart, ifUSerhasProductInCart } from '@/lib/getDetails'
import axios from 'axios'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface CartItem {
    item: ProductType
    quantity: 1
}

interface Props{
    product: CartItem
    addToCartFunction: (data: CartItem) => void
    removeFromCartFunction: (id: number) => void
    isAdded: (id:number) => boolean
}
const AddToCart = ({product, addToCartFunction, removeFromCartFunction, isAdded}: Props) => {
    // const [isAdded, setIsAdded] = React.useState<boolean>(false)
    const productId = 1
    const quantity= 1
    const {data:session} = useSession()
    const userId = session?.user.id
    const router = useRouter()
    const submitItemInCart = async () => {
        try{
            const response = await axios.post('/api/cart', {productId, userId, quantity})
            toast.success(`Added`)
            addUniqueProductToLocalStorage(response.data)
            location.reload()
        }catch(error:any){

            toast.error(`${error.response.data.message}`)
            if(error.response.status === 401) return router.push('/login')
        }
    }
    const deleteItemInCart = async () => {
        try{
            const response = await deleteUniqueItemFromCart(userId, productId)
            toast.success(`${response}`)
            removeUniqueProductFromLocalStorage(productId)
            location.reload()
        }catch(error:any){
            toast.error(`An error occured`)
        }
    }

    const removeUniqueProductFromLocalStorage = (id: number) => {
        const storedSelectedProducts = typeof window !== 'undefined' ? localStorage.getItem('selectedProductsInCart') : null;
        const parsedSelectedProducts = storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];;
        const newData = parsedSelectedProducts.filter((product:any) => product.productId !== id)
        typeof window !== 'undefined' ? localStorage.setItem("selectedProductsInCart", JSON.stringify(newData)) : null;
    } 
    const addUniqueProductToLocalStorage = (newProduct: any) => {
        const storedSelectedProducts = typeof window !== 'undefined' ? localStorage.getItem('selectedProductsInCart') : null;
        const parsedSelectedProducts = storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];;
        parsedSelectedProducts.push(newProduct)
        typeof window !== 'undefined' ? localStorage.setItem("selectedProductsInCart", JSON.stringify(parsedSelectedProducts)) : null;
    } 

    React.useEffect(()=> {
        const fetchData = async () => {
            if(userId){
                await getAllProductsInUserCart(userId)
                .then((userItems) => {
                    if (userItems.length > 0){
                        const gottenItem = userItems.find((item) => item.productId === productId)
                        if(gottenItem){
                            return gottenItem?.id
                        }else{
                            return productId
                        }
                    }      
                })
                .then(async (productId:any)=> {
                    const response = await ifUSerhasProductInCart(userId, productId)
                    // setIsAdded(response)
                })


            }
        }
        fetchData()
    },[userId])
  return (
    <div className='flex gap-x-1'>
        <button disabled={isAdded(product.item.id)} className='disabled:opacity-50 disabled:!cursor-not-allowed'>
            <Button href='' title={isAdded(product.item.id) ? 'Added' : 'Add to cart'} icon={ShoppingBag} onClick={()=>addToCartFunction(product)} />
        </button>
        {isAdded(product.item.id) && 
        <button className='underline text-red-500'>
            <Button href='' title={`Remove`} icon={Trash2} onClick={()=> removeFromCartFunction(product.item.id)} bgColor='bg-red-500'/>
        </button>
        }

    </div>
  )
}

export default AddToCart
