'use client'
import Button from '@/components/Button'
import { deleteUniqueItemFromCart, ifUSerhasProductInCart } from '@/lib/getDetails'
import axios from 'axios'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
interface Props{
    productId: number
    quantity: number
}
const AddToCart = ({productId, quantity}: Props) => {
    const [isAdded, setIsAdded] = React.useState<boolean>(false)
    const {data:session} = useSession()
    const userId = session?.user.id
    const router = useRouter()
    const submitItemInCart = async () => {
        try{
            const response = await axios.post('/api/cart', {productId, userId, quantity})
            toast.success(`${response.data.message}`)
            location.reload()
        }catch(error:any){
            toast.error(`${error.response.data.message}`)
        }
    }
    const deleteItemInCart = async () => {
        try{
            console.log("data", productId, userId)
            const response = await deleteUniqueItemFromCart(userId, productId)
            toast.success(`${response}`)
            location.reload()
        }catch(error:any){
            toast.error(`An error occured`)
        }
    }
    React.useEffect(()=> {
        const fetchData = async () => {
            const response = await ifUSerhasProductInCart(userId, productId)
            setIsAdded(response)
        }
        fetchData()
    },[])
  return (
    <div className='flex gap-x-1'>
        <button disabled={isAdded} className='disabled:opacity-50'>
            <Button href='' title={isAdded ? 'Added' : 'Add to cart'} icon={ShoppingBag} onClick={submitItemInCart} />
        </button>
        {isAdded && 
        <button className='underline text-red-500'>
            <Button href='' title={`Remove`} icon={Trash2} onClick={deleteItemInCart} bgColor='bg-red-500' />
        </button>
        }

    </div>
  )
}

export default AddToCart
