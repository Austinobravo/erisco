import { X } from 'lucide-react'
import React from 'react'
interface Props{
    toggle: () => void
}
const CartButton = ({toggle}:Props) => {
  return (
    <X onClick={toggle} className='bg-red-500 text-white rounded-md cursor-pointer' strokeWidth={2} />

  )
}

export default CartButton
