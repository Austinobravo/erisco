import { currentUser } from '@/lib/currentuser'
import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'

const UserLayout = async ({children}: {children: React.ReactNode}) => {
    const user = await currentUser()
    if(user) redirect(`/`)
  return (
    <div>
      {children}
    </div>
  )
}

export default UserLayout
