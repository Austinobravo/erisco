import type { User } from "next-auth";

declare module 'next-auth'{
    interface User{
        id: number
    }
}

declare module 'next-auth'{
    interface Session{
        user:{
            username: string
            email: string
            id: number
        }
    }
}