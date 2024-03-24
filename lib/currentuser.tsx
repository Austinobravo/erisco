import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

export const UserSession = () => {
   return getServerSession(options)
  
}
export const getCurrentUser = async () => {
    const session = await UserSession()
    console.log('session', session)
    return session?.user
}