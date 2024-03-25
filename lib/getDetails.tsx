'use server'
import prisma from '@/lib/prisma'
export const ifUSerhasProductInCart = async (userId:any, productId:number) => {

    const isAdded = await prisma.cart.findUnique({
        where: {
            userId,
            productId
        
        }
    })
    console.log('isadded', isAdded)
    return !!isAdded
} 

export const getAllProductsInUserCart = async (userId:any) => {

    const uniqueUserProducts = await prisma.cart.findMany({
        where: {
            userId,
        
        }
    })
    console.log('isadded', uniqueUserProducts)
    return uniqueUserProducts
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