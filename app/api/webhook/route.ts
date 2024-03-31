import Stripe  from 'stripe'
import {headers} from "next/headers"
import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"
const stripe =  new Stripe(process.env.STRIPE_API_KEY!, {apiVersion: '2023-10-16', typescript: true})

export async function POST(req:Request){
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_API!)
    }catch(error:any){
        return new NextResponse(`Webhook Error : ${error.message}`, {status:400})
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed'){
        const paymentIntentSucceded = event.data.object

        const purchasedId = session?.metadata?.productIds
 
        const userId = parseInt(session?.metadata?.userId as string)

        

        if(purchasedId){
            const jsonArray = JSON.parse(purchasedId)
            if(Array.isArray(jsonArray)){
                for (const productId of jsonArray){
                    await prisma.purchased.create({
                        data:{
                            isPaid:true,
                            productId: productId,
                            userId: userId
                        }
                    })
                    await prisma.cart.deleteMany({
                        where: {
                            userId: userId,
                            productId: productId
                        }
                    })
                }
            }
        }
    }

    return  NextResponse.json({message: "Paid"}, {status:200})
}