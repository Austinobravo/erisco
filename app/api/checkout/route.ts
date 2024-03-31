import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe =  new Stripe(process.env.STRIPE_API_KEY!, {apiVersion: '2023-10-16', typescript: true})

const corsHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS (){
    return NextResponse.json({}, {headers:corsHeader})
}

export async function POST(req:Request){
    const {productIds, userId} = await req.json()

    if (!productIds || productIds.length === 0) {
        return NextResponse.json({message:"Product ids not found"}, { status: 400 });
    }

    if (productIds.length === 0) {
        return NextResponse.json({message:"No matching products found"}, { status: 400 });
    }


    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    productIds.forEach((product:any)=> {
        line_items.push({
            quantity:1,
            price_data: {
                currency: 'NGN',
                product_data: {
                    name: product.title
                },
                unit_amount: product.currentPrice * 100
            }
        })
    })

    try{
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            billing_address_collection: 'auto',
            phone_number_collection: {
                enabled: false
            },
            success_url: `${process.env.NEXT_PUBLIC_API_URL}/products`,
            cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/`,
            metadata:{
                productIds:JSON.stringify(productIds.map((product:any) => product.id)),
                userId: userId
            },
            client_reference_id: userId
        })
        return NextResponse.json({url:session.url}, {headers:corsHeader})

    }catch(error){
        if(error instanceof Stripe.errors.StripeInvalidRequestError){
            console.error("Error",error)
            return NextResponse.json({message: "An error occured using this gateway."}, { status: 400 })
        } else {
            console.error('Error creating checkout session:', error);
            return NextResponse.json({message:"An error occurred while creating the checkout session."}, { status: 500 });
        }

    }
 
}