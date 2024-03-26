import axios from 'axios'
import Link from 'next/link'
import React from 'react'

interface Props{
    productsIds: any[]
    userId: number | undefined
}


const Checkout = ({productsIds, userId}: Props) => {

    const onCheckOut = async () => {
        const response = await axios.post('/api/checkout', {productIds: productsIds, userId: userId})

        window.location = response.data.url
    }
  return (
    <Link href={``} onClick={onCheckOut} >Checkout</Link>
  )
}

export default Checkout
