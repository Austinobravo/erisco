'use server'
import prisma from '@/lib/prisma'
export const ifUSerhasProductInCart = async (userId:any, productId:number) => {

    console.log('id',productId)
    console.log('user',userId)
    const isAdded = await prisma.cart.findUnique({
        where: {
            id:productId,
            userId
        
        }
    })
    console.log('add',isAdded)
    return !!isAdded
} 

export const getAllProductsInUserCart = async (userId:any) => {

    const uniqueUserProducts = await prisma.cart.findMany({
        where: {
            userId,
        
        }
    })
    return uniqueUserProducts
} 
export const deleteUniqueItemFromCart = async (userId:any, productId:number) => {
    
    await prisma.cart.delete({
        where: {
            id:productId,
            userId
        
        }
    })
    return 'Removed'
} 