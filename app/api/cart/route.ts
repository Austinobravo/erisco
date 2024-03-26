import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'

// export async function GET(req:NextRequest){
//     try{

//     }catch(){}
// }

export async function POST(req:Request){
    const data = await req.json()
    const {productId, userId, quantity} = data
    if (!userId) return NextResponse.json({message: 'You need to login first'}, {status: 401})
    try{
         const newItem = await prisma.cart.create({
            data:{
                productId,
                userId,
                quantity
            }
         }
            
        )
        return NextResponse.json(newItem,{status: 201})

    }catch(error){
        console.log("error", error)
        return NextResponse.error()

    }
}
export async function DELETE(req:Request){
    const data = await req.json()
    const {productId, userId, quantity} = data
    console.log("data", data)
    if (!userId) return NextResponse.json({message: 'You need to login first'}, {status: 401})
    try{
         await prisma.cart.delete({
            where:{
                productId,
                userId,
                quantity
            }
         }
            
        )
        return NextResponse.json({message: 'Removed'}, {status: 201})

    }catch(error){
        console.log("error", error)
        return NextResponse.error()

    }
}