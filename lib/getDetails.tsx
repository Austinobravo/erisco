'use server'
import prisma from '@/lib/prisma'
export const ifUSerhasProductInCart = async (userId:any, productId:number) => {
    
    const isAdded = await prisma.cart.findFirst({
        where: {
            userId,
            productId
        
        }
    })
    console.log('isadded', isAdded)
    return !!isAdded
} 
export const deleteUniqueItemFromCart = async (userId:any, productId:number) => {
    
    await prisma.cart.delete({
        where: {
            userId,
            productId
        
        }
    })
    return 'Removed'
} 