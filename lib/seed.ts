import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()
async function main() {
    const hashedPassword = await hash('password',12)
    const newUser = await prisma.user.create({
        data:{
            username: "admin",
            email: 'admin@gmail.com',
            phone: 65942606,
            password: hashedPassword
        }
    })
    console.log("newUser", newUser)

}
main()
.then(async() =>{
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error("error", error)
    await prisma.$disconnect()
    process.exit(1)
})