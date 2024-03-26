import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface Props{
    productsIds: any[]
    userId: number | undefined
}


const Checkout = ({productsIds, userId}: Props) => {
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
    const router = useRouter()
    const onCheckOut = async () => {
        try{
            setIsSubmitting(true)
            const response = await axios.post('/api/checkout', {productIds: productsIds, userId: userId})
            window.location = response.data.url

        }catch(error:any){
            toast.error(`${error.response.data.message}`)
        }finally{
            setIsSubmitting(false)
        } 
    }
  return (
    <Link href={``} onClick={onCheckOut} className='flex items-center justify-center' >{isSubmitting ? <Loader2 className='animate-spin'/> : 'Checkout'}</Link>
  )
}

export default Checkout
