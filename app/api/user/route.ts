import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"
export async function POST(req:Request) {
    let data = await req.json()

    const existingUser = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    })

    if(existingUser) return NextResponse.json({message: 'This email already exists'}, {status: 400})

    const hashedPassword = await bcrypt.hash(data.password, 12)
     data = {...data, password:hashedPassword, phone: +data.phone}
     console.log("data", data)
    try{
        await prisma.user.create({
            data
        })
        return NextResponse.json({message: "Created. Please Login now"}, {status: 201})

    }catch(error){
        console.log("error", error)
        return NextResponse.json({message: "An error occured"}, {status: 400})
    }
    
}